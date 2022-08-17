import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
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
import Types "./Types";


shared actor class Dip721NFT(init : Types.Dip721NonFungibleToken) = Self {
  stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  stable var centers = List.nil<Types.Center>();
  stable var name : Text = init.name;
  stable var symbol : Text = init.symbol;
  stable var admin : Principal = init.address;

  // trade NFT 
  var nftPrices = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
   public shared({ caller }) func listing(tokenID: Nat64, price: Nat) : async Types.TxReceipt {
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

  public shared({ caller }) func buyNFT(tokenID: Nat64) : async Types.TxReceipt {
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

          // transfer ICP 
           nftPrices.put(Nat64.toText(tokenID), 0);
           return #Ok(0);
        };
      };
    };
  };


  // @public



  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");
  stable var entries : [(Text, List.List<Principal>)] = [];
  let allowances = HashMap.fromIter<Text, List.List<Principal> >(entries.vals(), 0, Text.equal, Text.hash);

  //Set Privacy Function, this funtion will be called from front-end
  //data: represent the data from database
  // private var databaseNFT = HashMap.HashMap<Text,Types.DataNFT>(1, Text.equal, Text.hash);
  // public shared({ caller }) func setPrivacy(token_id: Types.TokenId, data : Types.DataNFT) {

  //   let isPrivacy : Types.Privacy = isPublic(token_id, caller, data.isPublic);//Return a Result type with <#Ok, #Err>
  //   switch isPrivacy {
  //     //#Err mean
  //     //#Unauthorized;
  //     //#InvalidTokenId;
  //     //#ZeroAddress;
  //     //#Other;
  //     case (#Err(_)) return;

  //     //#Ok when pass all Error case
  //     //privacy = true => Public -> Need to setPrivate
  //     //privacy = false => Private -> Need to setPublic
  //     case (#Ok(privacy)) {
  //       if(privacy) 
  //         setPrivate(token_id) else setPublic(token_id, data: Types.DataNFT);
  //     };
  //   };
  // };

  // //Set Private by delete its data from databaseNFT
  // func setPrivate(token_id: Types.TokenId) {
  //   let data : ?Types.DataNFT = databaseNFT.get(Nat64.toText(token_id));
  //   switch(data) {
  //     case null return;
  //     case (_) {
  //       databaseNFT.delete(Nat64.toText(token_id));
  //     };
  //   };
  // };

  // //Set Public by put its data to databaseNFT
  // func setPublic(token_id: Types.TokenId, dataNFT : Types.DataNFT) {
  //   let data : ?Types.DataNFT = databaseNFT.get(Nat64.toText(token_id));
  //   switch(data) {
  //     case null {
  //       //Pull data from database to here, then push it into the HashMap
  //       databaseNFT.put(Nat64.toText(token_id), dataNFT);
  //       //
  //     };
  //     case (_) {
  //       return ;
  //     };
  //   };
  // };

  // //Check if a NFT data is public or not
  // func isPublic(token_id: Types.TokenId, caller : Principal, status : Bool) : Types.Privacy {
  //   let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
  //   switch (item) {
  //     case null {
  //       return #Err(#InvalidTokenId);
  //     };
  //     case (?token) {
  //       if(caller != token.owner and not List.some(custodians, func(custodian : Principal) : Bool { custodian == caller }))
  //       {
  //         return #Err(#Unauthorized);
  //       } else {
        
  //         if status return #Ok(true)
  //         else return #Ok(false);
  //       };
  //     };
  //   };
  // };

  func isPublic(token_id: Types.TokenId, caller : Principal, status : Bool) : Types.Privacy {
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
    if (caller  != admin) return #Err(#Unauthorized);

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
  };

  system func postupgrade() {
    entries := [];
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
        assert token.owner == caller;
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


  public shared({caller}) func rejectView(token_id: Nat64, user: Principal) {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return;
      };
      case (?token) {
        assert token.owner == caller;
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

  public shared({caller}) func rejectAllView(token_id: Nat64) {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return;
      };
      case (?token) {
        assert token.owner == caller;
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
          not (caller != admin)
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
    if (not List.some(centers, func (center : Types.Center) : Bool { center.address == caller })) {
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

  public query func getAllTokens() : async [Types.FullMetadata] {
    let iter : Iter.Iter<Types.Nft> = List.toIter(nfts);
    var array = Buffer.Buffer<Types.FullMetadata>(Iter.size(iter));
    for(i in iter){
      array.add(i.metadata);
    };
    return array.toArray();
  };

}