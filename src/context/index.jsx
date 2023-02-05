import { createContext } from "react";
import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xd29347913jksnf83nrn3223n2l3k232')

    const { mutuaAsync: createCampaign } = useContractWrite(contract, "createCampaign");

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])
            console.log("Succeed create contract", data);
        } catch (error) {
            console.log("Failed to create contract");
        }
    }

    return (<StateContext.Provider value={{ address, connect, contract, createCampaign: publishCampaign }}>
        {children}
    </StateContext.Provider>)
}

export const useStateContext = () => useContract(StateContext)