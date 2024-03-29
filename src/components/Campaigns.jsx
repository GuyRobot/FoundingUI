import React from 'react'
import { useNavigate } from 'react-router-dom'
import FundCard from './FundCard';
import Loader from './Loader';

function Campaigns({ title, isLoading, campaigns }) {
    const navigate = useNavigate();
    const handleNavigate = (campaign) => {
        navigate(`campaigns/${campaign.title}`, { state: campaign })
    }
    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">

                {isLoading && (<Loader />)}

                {!isLoading && campaigns.length === 0 && (<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                    You have not created any campigns yet
                </p>)}

                {!isLoading && campaigns.length > 0 && (campaigns.map((campaign) => <FundCard
                    key={campaign.pId}
                    {...campaign}
                    onClick={() => handleNavigate(campaign)}
                />))}

            </div>
        </div>
    )
}

export default Campaigns