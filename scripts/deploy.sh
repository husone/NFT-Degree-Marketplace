dfx deploy ft
dfx deploy nftCanister
dfx deploy dao --argument "(principal \"$(dfx canister id ft)\")"
dfx deploy final_be --argument "(principal \"$(dfx canister id ft)\", principal \"$(dfx canister id nftCanister)\")"
dfx deploy final_fe --argument "(principal \"$(dfx canister id ft)\", principal \"$(dfx canister id nftCanister)\")"