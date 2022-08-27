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
import Types "./Types";
import Random "mo:base/Random";

actor Main {
  stable var init : Types.Dip721NonFungibleToken = { name = "My DIP721";symbol = "DFXB";
              address = Principal.fromText("2vxsx-fae")};
  stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  stable var centers = List.nil<Types.Center>();
  stable var name : Text = init.name;
  stable var symbol : Text = init.symbol;
  // Test
  stable var ad : Principal = init.address; 
  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");
  stable var entries : [(Text, List.List<Principal>)] = [];
  let allowances = HashMap.fromIter<Text, List.List<Principal> >(entries.vals(), 0, Text.equal, Text.hash);

  //DIP20

  public shared(msg) func callerToText() : async [Text] {
    return [Principal.toText(msg.caller), Principal.toText(ad)];
  };


  // add, delete center 
  public shared({ caller }) func addCenter(center : Types.Center)  {
    // assert caller == ad;
    if ( List.some(centers, func (c : Types.Center) : Bool { c == center })) {
      return;
    };
    centers := List.push(center,centers);
  };

  public shared({ caller }) func deleteCenter(centerPrincipal : Principal)  {
    // assert caller == ad;
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
  stable var prices : [(Text, Nat)] = [];
  let nftPrices = HashMap.fromIter<Text, Nat>(prices.vals(), 0, Text.equal, Text.hash);
  
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

  //  public shared(msg) func callerPrincipal() : async Principal {
  //       ad := msg.caller;
  //       return msg.caller;
  //   };

  // public shared({ caller }) func buyNFT(tokenID: Nat64) : async (Types.TxReceipt, ) {
  //   let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == tokenID});
  //   let price = nftPrices.get(Nat64.toText(tokenID));
  //   switch (item) {
  //     case null {
  //       return #Err(#InvalidTokenId);
  //     };
  //     case (?token) {
  //       if (
  //         caller == token.owner or price == ?0 
  //       ) {
  //         return #Err(#Unauthorized);
  //       } else {
  //         switch (price){
  //           case null{
  //             return #Err(#Other);
  //           };
  //           case (? _price){
  //             var t : TxReceipt = await DBZ.transfer(caller,token.owner, _price);
  //             // if (t!=#Ok(_)) {
  //             //   return #Err(#Other);
  //             //  };
  //              switch (t) {
  //               case ( #Ok(_)) {

  //               };
  //               case (_) {
  //                 return #Err(#Other);
  //               }
  //              };
  //             nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
  //               if (item.id == token.id) {
  //                 let update : Types.Nft = {
  //                   isPublic = item.isPublic;
  //                   minter = item.minter;
  //                   owner = caller;
  //                   id = item.id;
  //                   metadata = token.metadata;
  //                 };
  //                 return update;
  //               } else {
  //                 return item;
  //               };
  //             });
  //             //transfer ICP 
  //             // 
  //             //
              

  //             centers := List.map(centers, func (center : Types.Center) : Types.Center {
  //               if (center.address == token.minter) {
  //                 let update : Types.Center = {
  //                   address = center.address;
  //                   volume = center.volume + _price;
  //                 };
  //                 return update;
  //               } else {
  //                 return center;
  //               };
  //             });
  //             nftPrices.put(Nat64.toText(tokenID), 0);
  //             return #Ok(_price);
  //           };
  //         };
  //       };
  //     };
  //   };
  // };  

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


  public shared({caller}) func approveView(token_id: Nat64, user: Principal) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        // assert token.owner == caller;
        var viewers : ?List.List<Principal> = allowances.get(Nat64.toText(token_id));
        switch (viewers) {
          case (null) {
            var new_viewers : List.List<Principal> = List.fromArray([user]);
            allowances.put(Nat64.toText(token_id), new_viewers);
            return #Ok(0);
          };
          case (?(viewer)) {
            var test : [var Principal] = List.toVarArray(viewer);
            let buf : Buffer.Buffer<Principal> = Buffer.Buffer(test.size());
            for (value in test.vals()) {
                if (value == user) {
                  return #Err(#Other);
                };
                buf.add(value);
            };
            buf.add(user);
            var new_viewer : List.List<Principal> = List.fromArray(buf.toArray());
            allowances.put(Nat64.toText(token_id), new_viewer);
            return #Ok(0);
          }; 
        };

      };
    };
  };


  public shared({caller}) func removeView(token_id: Nat64, user: Principal) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        // assert token.owner == caller;
        var viewers : ?List.List<Principal> = allowances.get(Nat64.toText(token_id));
        switch (viewers) {
          case (null) {
            return #Err(#Other);
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
            #Ok(0);
          }; 
        };
      };
    };
  };

  public shared({caller}) func removeAllView(token_id: Nat64) : async Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        // assert token.owner == caller;
        allowances.delete(Nat64.toText(token_id));
        #Ok(0);
      };
    };
  };

  private func findNFT(token_id : Types.TokenId) : ?Types.Nft {
    List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id })
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




  public func setAdmin(adSet : Principal) {
    ad := adSet;
    centers := List.filter(centers, func (center : Types.Center) : Bool { center.address != adSet });
  };


  // func check viewer is viewer of NFT or not 
  public shared({ caller }) func isViewer(token_id: Types.TokenId, viewer: Principal) : async Types.TxReceipt {
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

  public func isOwner(token_id: Types.TokenId, owner: Principal) : async Bool {
    let item = findNFT(token_id);
    switch (item) {
      case null {
        return false;
      };
      case (?token) {
        return token.owner == owner;
      };
    };
  };

  

}
