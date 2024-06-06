import ServiceCard from '@/components/service-card';
import React from 'react'

const data = [
  { name: "Legal Entity Type", id: "LegalEntityType" },
  { name: "Legal Entity Type Detail", id: "LegalEntityTypeDetail" },
  { name: "Role", id: "Role" },
  { name: "Feature", id: "Feature" },
  { name: "Subscription", id: "Subscription" },
  { name: "Subscription Configuration", id: "SubscriptionConfiguration" },
  { name: "Feature Role Permission", id: "FeatureRolePermission" },
  { name: "Department", id: "Department" },
  { name: "Legal Entity", id: "LegalEntity" },
  { name: "Legal Entity Address Mapping", id: "LegalEntityAddressMapping" },
  { name: "User", id: "User" }
]


const page = () => {



  return (
    <div>
      <div className="flex flex-center justify-center items-center mt-4 font-bold">
        <h1>Automated Test Tool</h1>
      </div>




      <div className='max-w-lg m-auto'>
        <div className='space-y-2 my-2'>
        {data.map((service, i) => <ServiceCard key={i} data={service} />)}
        </div>
      </div>
    </div>
  )
}

export default page
