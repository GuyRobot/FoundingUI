import React, { createContext, useContext } from "react";
import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x4aC43eC5E6C55dA9e377abA10ae169970465deC0')

    const { mutateAsync: createCampaign } = useContractWrite(contract, "create");

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
                0,
                form.image
            ])
            console.log("Succeed create contract", data);
        } catch (error) {
            console.log("Failed to create contract", error);
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign, idx) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: idx
        }));

        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const campaigns = await getCampaigns()
        return campaigns.filter((campaign) => campaign.owner === address)
    }

    const donate = async (pId, amount) => {
        const data = await contract.call("donate", pId, { value: ethers.utils.parseEther(amount) });
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call("getDonators", pid);
        const numberOfDonations = donations[0].length;

        const result = []
        for (let index = 0; index < numberOfDonations; index++) {
            result.push({
                donator: donations[0][index],
                donation: ether.utils.formatEther(donations[1][index]).toString()
            })
        }

        return result;
    }

    return (<StateContext.Provider value={{ address, connect, contract, createCampaign: publishCampaign, getCampaigns, getUserCampaigns, donate, getDonations }}>
        {children}
    </StateContext.Provider>)
}

export const useStateContext = () => useContext(StateContext)