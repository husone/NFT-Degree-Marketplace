dfx deploy ft
dfx deploy nft
dfx deploy dao --argument "(principal \"$(dfx canister id ft)\")"
dfx deploy final_be --argument "(principal \"$(dfx canister id ft)\", principal \"$(dfx canister id nft)\")"