import { useContract } from "./useContract";
import FastToken from "../contracts/FastToken.json";
import CounterAddress from "../contracts/CounterAddress.json";

// export interface for smart contract
export const useTokenContract = () =>
  useContract(FastToken.abi, CounterAddress.FastToken);
