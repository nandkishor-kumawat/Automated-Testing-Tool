"use client"
import ServiceCard from '@/components/service-card';
import { excelToJson } from '@/lib/helpers';
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

  const submitForm = async (formData) => {
    for (const [key, value] of formData.entries()) {
      const json = await excelToJson(value);
      console.log(key, ":", json)
    }
  }


  return (
    <div>
      <div className="flex flex-center justify-center items-center mt-4 font-bold">
        <h1>Automated Test Tool</h1>
      </div>




      <div className='max-w-lg m-auto'>
        <form className='space-y-2 my-2' action={submitForm}>
          {data.map((service, i) => <ServiceCard key={i} data={service} />)}
          <button className='bg-green-600 text-white px-4 py-2 rounded-md'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page
