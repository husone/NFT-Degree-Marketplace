import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import TokenId "mo:base/Nat64";
import Type "Types";
import Types "./Types";
import token "token";
import types "types";


shared actor class Dip721NFT(init : Types.Dip721NonFungibleToken) = Self {
  stable var transactionId: Types.TransactionId = 0;
   stable var nfts = List.nil<Types.Nft>();
   stable var centers = List.nil<Types.Center>();
  stable var name : Text = init.name;
  stable var symbol : Text = init.symbol;
  // Test
  stable var ad : Principal = init.address;
  let DBZ : token.Token = token.Token("","DNBOIZ","DBZ",18,1000000000000000,Principal.fromText("2vxsx-fae"),0); 
  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");
  stable var entries : [(Text, List.List<Principal>)] = [];
  let allowances = HashMap.fromIter<Text, List.List<Principal> >(entries.vals(), 0, Text.equal, Text.hash);

  //DIP20

  public shared(msg) func callerToText() : async [Text] {
    return [Principal.toText(msg.caller), Principal.toText(ad)];
  };

  type Operation = types.Operation;
    type TransactionStatus = types.TransactionStatus;
    type TxRecord = types.TxRecord;
    type Metadata = {
        logo : Text;
        name : Text;
        symbol : Text;
        decimals : Nat8;
        totalSupply : Nat;
        owner : Principal;
        fee : Nat;
    };
    // returns tx index or error msg
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
  public shared(msg) func transferDIP20(to: Principal, value: Nat) : async TxReceipt{
    let receipt = await DBZ.transfer(msg.caller, to, value);
    return receipt;
  };

  public shared(msg) func approveDIP20(spender: Principal, value: Nat) : async TxReceipt{
    let receipt = await DBZ.approve(msg.caller, spender, value);
    return receipt;
  };

  public func allowanceDIP20(owner: Principal, spender: Principal) : async Nat{
    let allowance = await DBZ.allowance(owner, spender);
    return allowance;
  };

  public shared(msg) func transferFromDIP20(from: Principal, to: Principal, value: Nat) : async TxReceipt{
    let receipt = await DBZ.transferFrom(msg.caller, from, to, value);
    return receipt;
  };

  public shared(msg) func burnDIP20(value: Nat) : async TxReceipt{
    let receipt = await DBZ.burn(msg.caller, value);
    return receipt;
  };

  public shared(msg) func mintDIP20(to: Principal, value: Nat) : async TxReceipt{
    let receipt = await DBZ.mint(msg.caller, to, value);
    return receipt;
  };

  

  

  public func balanceOfDIP20(owner: Principal) : async Nat{
    let balance = await DBZ.balanceOf(owner);
    return balance;
  };

  public func totalSupplyDIP20() : async Nat{
    let supply = await DBZ.totalSupply();
    return supply;
  };

  public func symbolDIP20() : async Text{
    let symbol = await DBZ.symbol();
    return symbol;
  };

  public func nameDIP20() : async Text{
    let name = await DBZ.name();
    return name;
  };

  public func decimalsDIP20() : async Nat8{
    let decimals = await DBZ.decimals();
    return decimals;
  };


  // add, delete center 
  public shared({ caller }) func addCenter(center : Types.Center)  {
    // assert caller == ad;
    if ( List.some(centers, func (c : Types.Center) : Bool { c == center })) {
      return;
    };
    centers := List.push(center,centers);
  };

public func getNFT(token_id : Types.TokenId) : async ?Types.Nft {
    List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id })
  };

  public func getNFTPublic() : async [Types.Nft] {
    let items =  List.filter(nfts, func(token: Types.Nft) : Bool { token.isPublic});
    // let a = List.nil<Types.Nft>();
    // let r = Random.Finite();
    // let c = 0;
    // while (c<10){
    //   for (nft in nfts){
    //     if (r.coin()== true) {
    //       a := List.add(a, nft);
    //       c := c+1;
    //     };
    //   };
    // };

    // return List.toArray(a);
    return List.toArray(items);
  };
  public shared({ caller }) func deleteCenter(centerPrincipal : Principal)  {
    assert caller == ad;
    var center  = List.find(centers, func (c : Types.Center) : Bool { c.address == centerPrincipal});
    centers := List.filter(centers, func (c : Types.Center) : Bool {
      return (?c != center);
    });
  };


  public shared({ caller }) func getCenters() : async [Types.Center]  {
    // assert caller == ad;
    return List.toArray(centers);
  };

  // trade NFT 
  var nftPrices = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
  stable var prices : [(Text, Nat)] = [];
   public shared({ caller }) func listing(tokenID: Nat64, price: Nat) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == tokenID});
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          1 == 2
        ) {
          return #Err(#Unauthorized);
        } else {
           nftPrices.put(Nat64.toText(tokenID), price);
           return #Ok(0);
        };
      };
    };
  };

  public shared({ caller }) func cancelListing(tokenID: Nat64) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == tokenID});
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller != token.owner
        ) {
          return #Err(#Unauthorized);
        } else {
           nftPrices.put(Nat64.toText(tokenID), 0);
           return #Ok(0);
        };
      };
    };
  };

  //  public shared(msg) func callerPrincipal() : async Principal {
  //       ad := msg.caller;
  //       return msg.caller;
  //   };

  public shared({ caller }) func buyNFT(tokenID: Nat64) : async (Types.TxReceipt, ) {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == tokenID});
    let price = nftPrices.get(Nat64.toText(tokenID));
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller == token.owner or price == ?0 
        ) {
          return #Err(#Unauthorized);
        } else {
          switch (price){
            case null{
              return #Err(#Other);
            };
            case (? _price){
              var t : TxReceipt = await DBZ.transfer(caller,token.owner, _price);
              // if (t!=#Ok(_)) {
              //   return #Err(#Other);
              //  };
               switch (t) {
                case ( #Ok(_)) {

                };
                case (_) {
                  return #Err(#Other);
                }
               };
              nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
                if (item.id == token.id) {
                  let update : Types.Nft = {
                    isPublic = item.isPublic;
                    minter = item.minter;
                    owner = caller;
                    id = item.id;
                    metadata = token.metadata;
                  };
                  return update;
                } else {
                  return item;
                };
              });
              //transfer ICP 
              // 
              //
              

              centers := List.map(centers, func (center : Types.Center) : Types.Center {
                if (center.address == token.minter) {
                  let update : Types.Center = {
                    address = center.address;
                    volume = center.volume + _price;
                  };
                  return update;
                } else {
                  return center;
                };
              });
              nftPrices.put(Nat64.toText(tokenID), 0);
              return #Ok(_price);
            };
          };
        };
      };
    };
  };  

  public shared({ caller }) func getPrice(tokenID: Nat64) : async Nat {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == tokenID});
    let price = nftPrices.get(Nat64.toText(tokenID));
    switch (item) {
      case null {
        return 0;
      };
      case (?token) {
          switch (price){
            case null{
              return 0;
            };
            case (?Price){
              return Price;
          };
        };
      };
    };
  };  


  public func isPublic(token_id: Types.TokenId) : async Types.Privacy {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
          #Ok(token.isPublic);
      };
    };
  };

  public shared({ caller }) func setPublic(token_id: Types.TokenId, metadataToSet: Types.FullMetadata) : async Types.TxReceipt {
    // if (caller  != ad) return #Err(#Unauthorized);

    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (token.isPublic == true) return #Err(#Other);
          nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
            if (item.id == token.id) {
              let update : Types.Nft = {
                isPublic = true;
                minter = item.minter;
                owner = item.owner;
                id = item.id;
                metadata = metadataToSet;
              };
              return update;
            } else {
              return item;
            };
          });
          return #Ok(0);   
      };
    };
  };


  system func preupgrade() {
    entries := Iter.toArray(allowances.entries());
    prices := Iter.toArray(nftPrices.entries());
  };

  system func postupgrade() {
    entries := [];
    prices := [];
  };

  public func getViewers(token_id: Nat64) : async ?List.List<Principal> {
    return allowances.get(Nat64.toText(token_id));
  };


  public shared({caller}) func approveView(token_id: Nat64, user: Principal) {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return;
      };
      case (?token) {
        // assert token.owner == caller;
        var viewers : ?List.List<Principal> = allowances.get(Nat64.toText(token_id));
        switch (viewers) {
          case (null) {
            var new_viewers : List.List<Principal> = List.fromArray([user]);
            allowances.put(Nat64.toText(token_id), new_viewers);
          };
          case (?(viewer)) {
            var test : [var Principal] = List.toVarArray(viewer);
            let buf : Buffer.Buffer<Principal> = Buffer.Buffer(test.size());
            for (value in test.vals()) {
                buf.add(value);
            };
            buf.add(user);
            var new_viewer : List.List<Principal> = List.fromArray(buf.toArray());
            allowances.put(Nat64.toText(token_id), new_viewer);

          }; 
        };

      };
    };
  };


  public shared({caller}) func removeView(token_id: Nat64, user: Principal) {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return;
      };
      case (?token) {
        // assert token.owner == caller;
        var viewers : ?List.List<Principal> = allowances.get(Nat64.toText(token_id));
        switch (viewers) {
          case (null) {
            return;
          };
          case (?(viewer)) {
            var test : [var Principal] = List.toVarArray(viewer);
            let buf : Buffer.Buffer<Principal> = Buffer.Buffer(test.size());
            for (value in test.vals()) {
              if (value != user) {
                buf.add(value);
              }
            };
            var new_viewer : List.List<Principal> = List.fromArray(buf.toArray());
            allowances.put(Nat64.toText(token_id), new_viewer);
          }; 
        };
      };
    };
  };

  public shared({caller}) func removeAllView(token_id: Nat64) {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return;
      };
      case (?token) {
        // assert token.owner == caller;
        allowances.delete(Nat64.toText(token_id));
      };
    };
  };

  

  public query func balanceOfDip721(user: Principal) : async Nat64 {
    return Nat64.fromNat(
      List.size(
        List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user })
      )
    );
  };

  public query func ownerOfDip721(token_id: Types.TokenId) : async Types.OwnerResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.owner);
      };
    };
  };

  public shared({ caller }) func safeTransferFromDip721(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {  
    if (to == null_address) {
      return #Err(#ZeroAddress);
    } else {
      return transferFrom(from, to, token_id, caller);
    };
  };

  public shared({ caller }) func transferFromDip721(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {
    return transferFrom(from, to, token_id, caller);
  };

  func transferFrom(from: Principal, to: Principal, token_id: Types.TokenId, caller: Principal) : Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller != token.owner and
          not (caller != ad)
        ) {
          return #Err(#Unauthorized);
        } else if (Principal.notEqual(from, token.owner)) {
          return #Err(#Other);
        } else {
          nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
            if (item.id == token.id) {
              let update : Types.Nft = {
                isPublic = item.isPublic;
                minter = item.minter;
                owner = to;
                id = item.id;
                metadata = token.metadata;
              };
              return update;
            } else {
              return item;
            };
          });
          transactionId += 1;
          return #Ok(transactionId);   
        };
      };
    };
  };

  public query func supportedInterfacesDip721() : async [Types.InterfaceId] {
    return [#TransferNotification, #Burn, #Mint];
  };

  public query func nameDip721() : async Text {
    return name;
  };

  public query func symbolDip721() : async Text {
    return symbol;
  };

  public query func totalSupplyDip721() : async Nat64 {
    return Nat64.fromNat(
      List.size(nfts)
    );
  };

  public query func getMetadataDip721(token_id: Types.TokenId) : async Types.MetadataResult {
    let item = findNFT(token_id);
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.metadata);
      }
    };
  };

  private func findNFT(token_id : Types.TokenId) : ?Types.Nft {
    List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id })
  };

  public query func getCenter(token_id : Types.TokenId) : async ?Text {
    let item = findNFT(token_id);
    switch (item) {
      case null {
        null
      };
      case (?token) {
        ?token.metadata.center
      }
      };
    
    };

    public query func getName(token_id : Types.TokenId) : async ?Text {
        let item = findNFT(token_id);
      switch (item) {
      case null {
        null
      };
      case (?token) {
        ?token.metadata.name
      }
      };
    };

    public query func getID(token_id : Types.TokenId) : async ?Text {
        let item = findNFT(token_id);
    switch (item) {
      case null {
        null
      };
      case (?token) {
        ?token.metadata.id
      }
      };
    };

    public query func getCid(token_id : Types.TokenId) : async ?Text {
        let item = findNFT(token_id);
    switch (item) {
      case null {
        null
      };
      case (?token) {
        ?token.metadata.cid
      }
      };
    };

  public func resetNFT() :  () {
    nfts := List.nil<Types.Nft>();
  };

  public func resetCenter() :  () {
    centers := List.nil<Types.Center>();
  };
//   public func getMetadataForUserDip721(user: Principal) : async Types.ExtendedMetadataResult {
//     let item = List.find(nfts, func(token: Types.Nft) : Bool { token.owner == user });
//     switch (item) {
//       case null {
//         return #Err(#Other);
//       };
//       case (?token) {
//         return #Ok({
//           metadata_desc = token.metadata;
//           token_id = token.id;
//         });
//       }
//     };
//   };

//   public query func getTokenIdsForUserDip721(user: Principal) : async [Types.TokenId] {
//     let items = List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user });
//     let tokenIds = List.map(items, func (item : Types.Nft) : Types.TokenId { item.id });
//     return List.toArray(tokenIds);
//   };


  public shared({ caller }) func mintDip721(to: Principal, metadata: Types.FullMetadata) : async Types.MintReceipt {
    // if (not List.some(centers, func (center : Types.Center) : Bool { center.address == caller })) {
    //   return #Err(#Unauthorized);
    // };

    let newId = Nat64.fromNat(List.size(nfts));
    let nft : Types.Nft = {
      isPublic = false;
      owner = to;
      id = newId;
      metadata = metadata;
      minter = caller;
    };

    nfts := List.push(nft, nfts);

    transactionId += 1;

    return #Ok({
      token_id = newId;
      id = transactionId;
    });
  };

  public query func getAllTokens() : async [Types.Nft] {
    // let iter : Iter.Iter<Types.Nft> = List.toIter(nfts);
    // var array = Buffer.Buffer<Types.Nft>(Iter.size(iter));
    // for(i in iter){
      // array.add(i);
    // };
    return List.toArray(nfts);
  };


  public type Role = {
    #Admin;
    #Education;
    #User;
  };

  public query func getRole(principal : Principal) : async Role {
    if (principal == ad){
      return #Admin;
    } else if (List.some(centers, func (center : Types.Center) : Bool { center.address == principal })) {
      return #Education;
    } else {
      return #User;
    }
  };


  let centerTest : Types.Center = {
    address = Principal.fromText("ibb2v-rs73g-qsvdc-odxek-reexf-i2z2m-yf3zs-y7yl7-a5v57-bsa27-cae");
    volume = 0;
  };

  public func setad() {
    ad := Principal.fromText("ibb2v-rs73g-qsvdc-odxek-reexf-i2z2m-yf3zs-y7yl7-a5v57-bsa27-cae");
    centers := List.filter(centers, func (center : Types.Center) : Bool { center.address != Principal.fromText("ibb2v-rs73g-qsvdc-odxek-reexf-i2z2m-yf3zs-y7yl7-a5v57-bsa27-cae") });
  };


  public func setCenter(){
    centers := List.push(centerTest, centers);
    ad := Principal.fromText("2vxsx-fae");
  };

  public func setUser() {
    ad := Principal.fromText("2vxsx-fae");
    //delete center Test in centers
    centers := List.filter(centers, func (center : Types.Center) : Bool { center.address != Principal.fromText("ibb2v-rs73g-qsvdc-odxek-reexf-i2z2m-yf3zs-y7yl7-a5v57-bsa27-cae") });
    
  };

  // func to get NFTs owner by a principal 
  public query func getNFTsFromUser(owner: Principal) : async [Types.Nft] {
    let items = List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == owner });
    return List.toArray(items);
  };

  //func to get NFTs which mint by a principal
  public query func getNFTsFromCenter(center: Principal) : async [Types.Nft] {
    let items = List.filter(nfts, func(token: Types.Nft) : Bool { token.minter == center });
    return List.toArray(items);
  };

  // func transfer DIP721 
  public shared({ caller }) func transferDIP721(token_id: Types.TokenId, to: Principal) : async Types.TxReceipt {
    let item = findNFT(token_id);
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        // if (not List.some(nfts, func (nft : Types.Nft) : Bool { nft.owner == caller })) {
        //   return #Err(#Unauthorized);
        // };
        nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
            if (item.id == token.id) {
              let update : Types.Nft = {
                isPublic = item.isPublic;
                minter = item.minter;
                owner = to;
                id = item.id;
                metadata = token.metadata;
              };
              return update;
            } else {
              return item;
            };
          });
          transactionId += 1;
          return #Ok(transactionId);   
      };
    };
  };

  // func check viewer is viewer of NFT or not 
  public shared({ caller }) func isViewer(token_id: Types.TokenId, viewer: Principal) : async Type.TxReceipt {
    let item = findNFT(token_id);
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (token.isPublic) {
          return #Ok(0);
        } else {
          if (token.owner == viewer) {
            return #Ok(0);
          };
          var viewers : ?List.List<Principal> = allowances.get(Nat64.toText(token_id));
          switch (viewers) {
            case (null) {
              return #Err(#Other);
            };
            case (?(viewers)) {
              var v = (List.find(viewers, func (v : Principal) : Bool { return v == viewer }));
              switch (v){
                case (null) {
                  return #Err(#Other);
                };
                case (?v) {
                  return #Ok(0);
                  };
                };
              };
            };
          };
        };
      };
    };



}