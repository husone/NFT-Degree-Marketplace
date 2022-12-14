import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Error "mo:base/Error";
import ICRaw "mo:base/ExperimentalInternetComputer";
import List "mo:base/List";
import Time "mo:base/Time";
import Types "./Types";
import Debug "mo:base/Debug";

shared actor class DAO(dip20 : Principal) = Self {

    stable var daoToken : Types.IDIP20 = actor (Principal.toText(dip20)) : Types.IDIP20;
    stable var accounts = Trie.empty<Principal, Types.Tokens>();
    stable var proposals = Trie.empty<Nat, Types.Proposal>();
    stable var next_proposal_id : Nat = 0;
    stable let transfer_fee : Types.Tokens = {amount_e8s = 0};
    stable let proposal_vote_threshold : Types.Tokens = {amount_e8s = 10_000_000};
    stable let proposal_submission_deposit : Types.Tokens = {amount_e8s = 100};
    stable var system_params : Types.SystemParams = {transfer_fee = transfer_fee; proposal_vote_threshold = proposal_vote_threshold; proposal_submission_deposit = proposal_submission_deposit};

        system func heartbeat() : async () {
        await execute();        // await execute_accepted_proposals();
    };
    func execute() : async() {
        let a = await list_proposals();
        for (p in a.vals()){
            if (p.endTime < Time.now()){
                let newP = {
                            id = p.id;
                              votes_yes = p.votes_yes;                         
                              votes_no = p.votes_no;
                              voters = p.voters;
                              state = #succeeded;
                              endTime = p.endTime;
                              timestamp = p.timestamp;
                              proposer = p.proposer;
                              payload = p.payload;
                };
                proposal_put(p.id,newP);
            };
        };
        
    };


    func account_get(id : Principal) : ?Types.Tokens = Trie.get(accounts, Types.account_key(id), Principal.equal);
    func account_put(id : Principal, tokens : Types.Tokens) {
        accounts := Trie.put(accounts, Types.account_key(id), Principal.equal, tokens).0;
    };
    func proposal_get(id : Nat) : ?Types.Proposal = Trie.get(proposals, Types.proposal_key(id), Nat.equal);
    func proposal_put(id : Nat, proposal : Types.Proposal) {
        proposals := Trie.put(proposals, Types.proposal_key(id), Nat.equal, proposal).0;
    };

    /// Transfer tokens from the caller's account to another account
    // public shared({caller}) func transfer(transfer: Types.TransferArgs) : async Types.Result<(), Text> {
    //     switch (account_get caller) {
    //     case null { #err "Caller needs an account to transfer funds" };
    //     case (?from_tokens) {
    //              let fee = system_params.transfer_fee.amount_e8s;
    //              let amount = transfer.amount.amount_e8s;
    //              if (from_tokens.amount_e8s < amount + fee) {
    //                  #err ("Caller's account has insufficient funds to transfer " # debug_show(amount));
    //              } else {
    //                  let from_amount : Nat = from_tokens.amount_e8s - amount - fee;
    //                  account_put(caller, { amount_e8s = from_amount });
    //                  let to_amount = Option.get(account_get(transfer.to), Types.zeroToken).amount_e8s + amount;
    //                  account_put(transfer.to, { amount_e8s = to_amount });
    //                  #ok;
    //              };
    //     };
    //   };
    // };

        public type TxReceipt = {
        #Ok: Nat;
        #Err: {
            #InsufficientAllowance;
            #InsufficientBalance;
            #ErrorOperationStyle;
            #Unauthorized;
            #LedgerTrap;
            #ErrorTo;
            #Other: Text;
            #BlockUsed;
            #AmountTooSmall;
        };
    };

    public func getAccount(id: Principal) : async ?Types.Tokens {
        return account_get(id);
    }; 

    public shared({caller}) func stake(amount : Nat) : async Types.Result<Types.ProposalState, Text>  {
        let t = await transfer(caller,amount);
        switch (t) {
            case (true) {
                let t1 = account_get(caller);
                switch (t1){
                    case null{
                         account_put(caller,{amount_e8s = amount});
                    };
                    case (?tokens){
                        let new_amount = tokens.amount_e8s + amount;
                         account_put(caller,{amount_e8s = new_amount});
                    };  
                };
                return #ok(#succeeded);

            };
            case (false){
                return #err("Stake failed");
            };
        };
    };

    public shared({caller}) func unstake(amount : Nat) : async Types.Result<Types.ProposalState, Text> {
        let t1 = account_get(caller);
        switch (t1){
            case null{
                return #err("Caller needs an account to unstake funds");
            };
            case (?tokens){
                if (tokens.amount_e8s >= amount){
                    let new_amount = tokens.amount_e8s - amount;
                    account_put(caller,{amount_e8s = new_amount});
                    let t = await daoToken.transfer(caller, amount);
                    return #ok(#succeeded);
                } else {
                    return #err("Caller's account has insufficient funds to unstake");
                    };
                };
            };
        };

    /// Lists all accounts
    // public query func list_accounts() : async [Types.Account] {
    //     Iter.toArray(
    //       Iter.map(Trie.iter(accounts),
    //                func ((owner : Principal, tokens : Types.Tokens)) : Types.Account = { owner; tokens }))
    // };

    /// Submit a proposal
    ///
    /// A proposal contains a canister ID, method name and method args. If enough users
    /// vote "yes" on the proposal, the given method will be called with the given method
    /// args on the given canister.

    public shared({caller}) func transfer(id : Principal, amount : Nat) : async Bool {
        let t1 = (await daoToken.allowance(id, Principal.fromActor(Self)));
        let t2 = (await daoToken.balanceOf(id));
        Debug.print(Nat.toText(t1));
        
        Debug.print(Nat.toText(t2));
        if (t1>= amount and t2>= amount){
            
            let t3 = await daoToken.transferFrom(id,Principal.fromActor(Self), amount);
            return true;
        };
        return false;
    };

    public shared({caller})func callerToText() : async [Principal] {
        return [caller, Principal.fromActor(Self)];
    };

    public shared({caller}) func submit_proposal(payload: Text, second : Int) : async Types.Result<Nat, Text> {
        let t = await transfer(caller, 1000);
        switch (t){
            case (true){
            let proposal_id = next_proposal_id;
            next_proposal_id += 1;

            let proposal : Types.Proposal = {
                id = proposal_id;
                timestamp = Time.now();
                endTime = Time.now() + second * 1000_000_000;
                proposer = caller;
                payload;
                state = #open;
                votes_yes = Types.zeroToken;
                votes_no = Types.zeroToken;
                voters = List.nil();
            };
            proposal_put(proposal_id, proposal);
            #ok(proposal_id)
            };
            case (false){
                return #err("Not enough tokens");
            };
        };
    };

    /// Return the proposal with the given ID, if one exists
    public query func get_proposal(proposal_id: Nat) : async ?Types.Proposal {
        proposal_get(proposal_id)
    };

    /// Return the list of all proposals
    public query func list_proposals() : async [Types.Proposal] {
        Iter.toArray(Iter.map(Trie.iter(proposals), func (kv : (Nat, Types.Proposal)) : Types.Proposal = kv.1))
    };

    // Vote on an open proposal
    public shared({caller}) func vote(args: Types.VoteArgs) : async Types.Result<Types.ProposalState, Text> {
        switch (proposal_get(args.proposal_id)) {
        case null { #err("No proposal with ID " # debug_show(args.proposal_id) # " exists") };
        case (?proposal) {
                 var state = proposal.state;
                 if (state != #open) {
                     return #err("Proposal " # debug_show(args.proposal_id) # " is not open for voting");
                 };
                 switch (account_get(caller)) {
                 case null { return #err("Caller does not have any tokens to vote with") };
                 case (?{ amount_e8s = voting_tokens }) {
                          if (List.some(proposal.voters, func (e : Principal) : Bool = e == caller)) {
                              return #err("Already voted");
                          };
                          
                          var votes_yes = proposal.votes_yes.amount_e8s;
                          var votes_no = proposal.votes_no.amount_e8s;
                          switch (args.vote) {
                          case (#yes) { votes_yes += voting_tokens };
                          case (#no) { votes_no += voting_tokens };
                          };
                          let voters = List.push(caller, proposal.voters);

                          if (votes_yes >= system_params.proposal_vote_threshold.amount_e8s) {
                              // Refund the proposal deposit when the proposal is accepted
                              ignore do ? {
                                  let account = account_get(proposal.proposer)!;
                                  let refunded = account.amount_e8s + system_params.proposal_submission_deposit.amount_e8s;
                                  account_put(proposal.proposer, { amount_e8s = refunded });
                              };
                              state := #accepted;
                          };
                          
                          if (votes_no >= system_params.proposal_vote_threshold.amount_e8s) {
                              state := #rejected;
                          };

                          let updated_proposal = {
                              id = proposal.id;
                              votes_yes = { amount_e8s = votes_yes };                              
                              votes_no = { amount_e8s = votes_no };
                              voters;
                              state;
                              endTime = proposal.endTime;
                              timestamp = proposal.timestamp;
                              proposer = proposal.proposer;
                              payload = proposal.payload;
                          };
                          proposal_put(args.proposal_id, updated_proposal);
                      };
                 };
                 #ok(state)
             };
        };
    };

    /// Get the current system params
    // public query func get_system_params() : async Types.SystemParams { system_params };

    /// Update system params
    ///
    /// Only callable via proposal execution
    // public shared({caller}) func update_system_params(payload: Types.UpdateSystemParamsPayload) : async () {
    //     if (caller != Principal.fromActor(Self)) {
    //         return;
    //     };
    //     system_params := {
    //         transfer_fee = Option.get(payload.transfer_fee, system_params.transfer_fee);
    //         proposal_vote_threshold = Option.get(payload.proposal_vote_threshold, system_params.proposal_vote_threshold);
    //         proposal_submission_deposit = Option.get(payload.proposal_submission_deposit, system_params.proposal_submission_deposit);
    //     };
    // };

    /// Deduct the proposal submission deposit from the caller's account
    // func deduct_proposal_submission_deposit(caller : Principal) : Types.Result<(), Text> {
    //     switch (account_get(caller)) {
    //     case null { #err "Caller needs an account to submit a proposal" };
    //     case (?from_tokens) {
    //              let threshold = system_params.proposal_submission_deposit.amount_e8s;
    //              if (from_tokens.amount_e8s < threshold) {
    //                  #err ("Caller's account must have at least " # debug_show(threshold) # " to submit a proposal")
    //              } else {
    //                  let from_amount : Nat = from_tokens.amount_e8s - threshold;
    //                  account_put(caller, { amount_e8s = from_amount });
    //                  #ok
    //              };
    //          };
    //     };
    // };

    /// Execute all accepted proposals
    // func execute_accepted_proposals() : async () {
    //     let accepted_proposals = Trie.filter(proposals, func (_ : Nat, proposal : Types.Proposal) : Bool = proposal.state == #accepted);
    //     // Update proposal state, so that it won't be picked up by the next heartbeat
    //     for ((id, proposal) in Trie.iter(accepted_proposals)) {
    //         update_proposal_state(proposal, #executing);
    //     };

    //     for ((id, proposal) in Trie.iter(accepted_proposals)) {
    //         switch (await execute_proposal(proposal)) {
    //         case (#ok) { update_proposal_state(proposal, #succeeded); };
    //         case (#err(err)) { update_proposal_state(proposal, #failed(err)); };
    //         };
    //     };
    // };

    /// Execute the given proposal
    // func execute_proposal(proposal: Types.Proposal) : async Types.Result<(), Text> {
    //     try {
    //         let payload = proposal.payload;
    //         ignore await ICRaw.call(payload.canister_id, payload.method, payload.message);
    //         #ok
    //     }
    //     catch (e) { #err(Error.message e) };
    // };

    // func update_proposal_state(proposal: Types.Proposal, state: Types.ProposalState) {
    //     let updated = {
    //         state;
    //         id = proposal.id;
    //         votes_yes = proposal.votes_yes;
    //         votes_no = proposal.votes_no;
    //         voters = proposal.voters;
    //         timestamp = proposal.timestamp;
    //         proposer = proposal.proposer;
    //         payload = proposal.payload;
    //     };
    //     proposal_put(proposal.id, updated);
    // };
};