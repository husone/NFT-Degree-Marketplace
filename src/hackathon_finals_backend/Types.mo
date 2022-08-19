import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";

module {

  //---------------------------
  public type ApiError = {
    #Unauthorized;
    #InvalidTokenId;
    #ZeroAddress;
    #Other;
  };

  public type Result<S, E> = {
    #Ok : S;
    #Err : E;
  };
  public type TokenId = Nat64;
  
  public type Privacy = Result<Bool, ApiError>;
  
  public type Nft = {
    isPublic : Bool;
    minter : Principal;
    owner: Principal;
    id: TokenId;
    metadata: FullMetadata;
  };

  public type Center ={
    address : Principal;
    volume : Nat;
  };

  public type FullMetadata = {
    center : Text;
    name : Text;
    id : Text;
    cid: Text;
    cer_owner: Text;
  };

  //---------------------------

  public type Dip721NonFungibleToken = {
    name: Text;
    symbol: Text;
    address: Principal;
  };

  

  

  public type OwnerResult = Result<Principal, ApiError>;
  public type TxReceipt = Result<Nat, ApiError>;
  
  public type TransactionId = Nat;
  
  
  public type InterfaceId = {
    #Approval;
    #TransactionHistory;
    #Mint;
    #Burn;
    #TransferNotification;
  };

  public type LogoResult = {
    logo_type: Text;
    data: Text;
  };

  

  public type ExtendedMetadataResult = Result<{
    metadata_desc: FullMetadata;
    token_id: TokenId;
  }, ApiError>;

  public type MetadataResult = Result<FullMetadata, ApiError>;

  

  public type MetadataPurpose = {
    #Preview;
    #Rendered;
  };
  
  public type MetadataKeyVal = {
    key: Text;
    val: MetadataVal;
  };

  public type MetadataVal = {
    #TextContent : Text;
    #BlobContent : Blob;
    #NatContent : Nat;
    #Nat8Content: Nat8;
    #Nat16Content: Nat16;
    #Nat32Content: Nat32;
    #Nat64Content: Nat64;
  };

  public type MintReceipt = Result<MintReceiptPart, ApiError>;

  public type MintReceiptPart = {
    token_id: TokenId;
    id: Nat;
  };


};
