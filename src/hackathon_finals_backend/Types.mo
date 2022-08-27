import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import P "mo:base/Prelude";

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

  public type Metadata = {
        logo : Text;
        name : Text;
        symbol : Text;
        decimals : Nat8;
        totalSupply : Nat;
        owner : Principal;
        fee : Nat;
    };

  public type TokenInfo = {
        metadata: Metadata;
        feeTo: Principal;
        // status info
        historySize: Nat;
        deployTime: Time.Time;
        holderNumber: Nat;
        cycles: Nat;
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

  public type IDIP20 = actor {
       allowance: (Principal, Principal) -> async (Nat) ;
    approve: (Principal, Nat) -> async (TxReceipt);
   balanceOf: (Principal) -> async (Nat) ;
   burn: (Nat) -> async (TxReceipt);
   decimals: () -> async (Nat8) ;
   getAllowanceSize: () -> async (Nat) ;
   getMetadata: () -> async (Metadata) ;
   getTokenFee: () -> async (Nat) ;
   getTokenInfo: () -> async (TokenInfo) ;
   getUserApprovals: (Principal) -> async ([(Principal, Nat)]) ;
   historySize: () -> async (Nat) ;
   logo: () -> async (Text) ;
   mint: (Principal, Nat) -> async (TxReceipt);
   name: () -> async (Text) ;
   setFee: (Nat) -> async () ;
   setFeeTo: (Principal) -> async () ;
   setLogo: (Text) -> async () ;
   setName: (Text) -> async () ;
   setOwner: (Principal) -> async () ;
   symbol: () -> async (Text) ;
   totalSupply: () -> async (Nat) ;
   transfer: (Principal, Nat) -> async (TxReceipt);
   transferFrom: (Principal, Principal, Nat) -> async (TxReceipt);
    };

    public type IDIP721 = actor {
      balanceOfDip721: (Principal) -> async (Nat64) ;
   callerToText: () -> async ([Text]);
   getAllTokens: () -> async ([Nft]) ;
   getCid: (TokenId) -> async (? Text) ;
   getID: (TokenId) -> async (? Text) ;
   getMetadataDip721: (TokenId) -> async (MetadataResult) ;
   getNFT: (TokenId) -> async (? Nft);
   getNFTPublic: () -> async ( [Nft]);
   getNFTsFromCenter: (Principal) -> async ([Nft]) ;
   getNFTsFromUser: (Principal) -> async ([Nft]) ;
   getName: (TokenId) -> async (? Text) ;
   getOwner: (TokenId) -> async (? Principal);
   isPublic: (TokenId) -> async (Privacy);
   addCenter: (Center) -> async (Bool);
   mintDip721: (Principal, FullMetadata) -> async (MintReceipt);
   nameDip721: () -> async (Text) ;
   ownerOfDip721: (TokenId) -> async (OwnerResult) ;
   resetCenters: () -> async () ;
   resetNFTs: () -> async () ;
   safeTransferFromDip721: (Principal, Principal, TokenId) -> async (TxReceipt);
   setCenter: (Principal) -> async () ;
   setPublic: (TokenId, FullMetadata) -> async (TxReceipt);
   supportedInterfacesDip721: () -> async ([InterfaceId]) ;
   symbolDip721: () -> async (Text) ;
   totalSupplyDip721: () -> async (Nat64) ;
   transferDIP721: (TokenId, Principal) -> async (TxReceipt);
   transferFromDip721: (Principal, Principal, TokenId) -> async (TxReceipt);
    };
};

