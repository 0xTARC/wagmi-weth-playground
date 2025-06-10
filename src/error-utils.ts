import {BaseError, ContractFunctionRevertedError} from "viem"

export const parseCustomError = (e: Error): BaseError | ContractFunctionRevertedError | Error => {
  if (e instanceof BaseError) {
    // If caught error is a revert with a solidity custom error, parse it with `walk`
    const revertError = e.walk((e) => e instanceof ContractFunctionRevertedError)
    if (revertError instanceof ContractFunctionRevertedError) {
      return revertError
    }
    // If no revert error found, return the Viem BaseError
    return e
  }

  // If error is not a Viem BaseError, return the original error object that was passed in.
  return e
}
