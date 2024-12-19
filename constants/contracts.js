import { useCall, useReadContract } from "@starknet-react/core";
import contractABI from "./crowdpassABI.json"



export const getContractCall = (functionName, functionArgs) =>{

    const { data } = useCall({
        contractABI,
        function: functionName,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        args: functionArgs
    })
    console.log(data)
    return data
}

export const getContractRead = (functionName, functionArgs) =>{

    const { data } = useReadContract({
        contractABI,
        function: functionName,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        args: functionArgs
    })
    console.log(data)
    return data
}
