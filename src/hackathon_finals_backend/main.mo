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

shared({caller}) actor class NFTMarketplace(dip20 : Principal, dip721: Principal) = Self {

  private var token20 : Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
  private var token721 : Types.IDIP721 = actor(Principal.toText(dip721)) : Types.IDIP721;
  stable var ad = Principal.fromText("dazko-eyre7-hrc4k-riign-wus2a-shzd2-nvyfm-b73sb-zaqzf-eiyyh-rae");
  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");
  stable var entries : [(Text, List.List<Principal>)] = [];
  let allowances = HashMap.fromIter<Text, List.List<Principal> >(entries.vals(), 0, Text.equal, Text.hash);

  //DIP20

  public shared(msg) func callerToText() : async [Text] {
    return [Principal.toText(msg.caller), Principal.toText(ad)];
  };


  

  // trade NFT 
  stable var prices : [(Text, Nat)] = [];
  let nftPrices = HashMap.fromIter<Text, Nat>(prices.vals(), 0, Text.equal, Text.hash);
  
   public shared({ caller }) func listing(tokenID: Nat64, price: Nat) : async Types.TxReceipt {
    let item = await token721.getNFT(tokenID);
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          // caller != token.owner
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
    let item = await token721.getNFT(tokenID);
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
    let item = await token721.getNFT(tokenID);
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
              var m = await token20.allowance(caller, Principal.fromActor(Self));
              if (m < _price) {
                return #Err(#Other);
              } else {
                var t = await token20.transferFrom(caller, token.owner, _price);
               switch (t) {
                case ( #Ok(_)) {

                };
                case (_) {
                  return #Err(#Other);
                };
               };
               var a = await token721.transferFromDip721(caller, Principal.fromActor(Self), tokenID);
              //transfer ICP 
              // 
              //
              var centers = List.fromArray(await token721.getCenters()); 
              var new_centers = List.map(centers, func (center : Types.Center) : Types.Center {
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
              
              // centers := 
              nftPrices.put(Nat64.toText(tokenID), 0);
              return #Ok(_price);
              };
            };
          };
        };
      };
    };
  };  

  public shared({ caller }) func getPrice(tokenID: Nat64) : async Nat {
    let item = await token721.getNFT(tokenID);
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
    let item = await token721.getNFT(token_id);
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
    return await token721.setPublic(token_id, metadataToSet);
  };

  system func preupgrade() {
    entries := Iter.toArray(allowances.entries());
    prices := Iter.toArray(nftPrices.entries());
  };

  system func postupgrade() {
    entries := [];
    prices := [];
  };

  public func getViewers(token_id: Nat64) : async [Principal] {
    var viewers : ?List.List<Principal> = allowances.get(Nat64.toText(token_id));
    switch (viewers) {
      case (null) {
        return [];
      };
      case (?viewer) {
        return List.toArray(viewer);
      }
    };
  };


  public shared({caller}) func approveView(token_id: Nat64, user: Principal) : async Types.TxReceipt {
    let item = await token721.getNFT(token_id);
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
    let item = await token721.getNFT(token_id);
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
    let item = await token721.getNFT(token_id);
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

  public type Role = {
    #Admin;
    #Education;
    #User;
  };

  public func getRole(principal : Principal) : async Role {
    var centers = List.fromArray(await token721.getCenters()); 
    var stmt = List.some(centers, func (center : Types.Center) : Bool { center.address == principal });
    if (principal == ad){
      return #Admin;
    } else if (stmt
      ) {
      return #Education;
    } else {
      return #User;
    }
  };




  public func setAdmin(adSet : Principal) {

    ad := adSet;

  };


  // func check viewer is viewer of NFT or not 
  public shared({ caller }) func isViewer(token_id: Types.TokenId, viewer: Principal) : async Types.TxReceipt {
    let item = await token721.getNFT(token_id);
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
    let item = await token721.getNFT(token_id);
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