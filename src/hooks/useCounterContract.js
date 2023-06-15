import { useContract } from "./useContract";
import Counter from "../contracts/Counter.json";
import FastDomain from "../contracts/FastDomain.json";
import CounterAddress from "../contracts/CounterAddress.json";

// export interface for smart contract
export const useCounterContract = () =>
  useContract(FastDomain.abi, CounterAddress.FastDomain);

export const useTokenContract = () =>
  useContract(FastDomain.abi, CounterAddress.FastDomain);
