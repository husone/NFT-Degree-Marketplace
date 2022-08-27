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
import Types "type";
import Random "mo:base/Random";

shared actor class Dip721NFT() = Self {
  stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  stable var centers = List.nil<Types.Center>();
  stable var name : Text = "DnBoiZNFT";
  stable var symbol : Text = "DNFT";
  // Test
  stable var ad : Principal = Principal.fromText("dazko-eyre7-hrc4k-riign-wus2a-shzd2-nvyfm-b73sb-zaqzf-eiyyh-rae");
  stable var nftMain : Principal = Principal.fromText("dazko-eyre7-hrc4k-riign-wus2a-shzd2-nvyfm-b73sb-zaqzf-eiyyh-rae");


  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");
  stable var entries : [(Text, List.List<Principal>)] = [];

  //DIP20
    public shared({caller}) func setnftMain(p : Principal) {
    if (caller != ad) return;
    nftMain := p;
  };

  public shared(msg) func callerToText() : async [Text] {
    return [Principal.toText(msg.caller), Principal.toText(ad)];
  };
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
    if (caller  != ad) return #Err(#Unauthorized);

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
          not(caller == token.owner or
           (caller == ad) or (caller == nftMain) )
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

  public func getNFT(token_id : Types.TokenId) : async ?Types.Nft {
    List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id })
  };

  public func getOwner(token_id : Types.TokenId) : async ?Principal {
    let t = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (t) {
      case (null) {
        return null;
      };
      case (?token) {
        return ?token.owner;
        };
      };
   };

  public func getNFTPublic() : async [Types.Nft] {
    let items =  List.filter(nfts, func(token: Types.Nft) : Bool { token.isPublic});
    return List.toArray(items);
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
    if ((not List.some(centers, func (center : Types.Center) : Bool { center.address == caller })) or caller == ad or caller == nftMain) {
      return #Err(#Unauthorized);
    };

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

  public shared({caller}) func addCenter(center: Types.Center) : async Bool {
    if (!(caller ==ad or caller == nftMain)) {
      return false;
    };
    centers := List.push(center, centers);
    return true;
  };

  public query func getAllTokens() : async [Types.Nft] {
    // let iter : Iter.Iter<Types.Nft> = List.toIter(nfts);
    // var array = Buffer.Buffer<Types.Nft>(Iter.size(iter));
    // for(i in iter){
      // array.add(i);
    // };
    return List.toArray(nfts);
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
        if (not List.some(nfts, func (nft : Types.Nft) : Bool { nft.owner == caller })) {
          return #Err(#Unauthorized);
        };
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

  





  public func resetNFTs() : () {
    nfts := List.nil<Types.Nft>();
  };
  
  public func resetCenters() : (){
    centers := List.nil<Types.Center>();
  };

}
