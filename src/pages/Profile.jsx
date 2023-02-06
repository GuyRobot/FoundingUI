import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context';
import Campaigns from '../components/Campaigns';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCampaigns()
  }, [address, contract])

  return (
    <Campaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile