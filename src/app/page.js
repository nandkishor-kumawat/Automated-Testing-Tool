"use client"
import ServiceCard from '@/components/service-card';
import { data } from '@/lib/constants';
import { excelToJson } from '@/lib/helpers';
import React from 'react'



const page = () => {

  const submitForm = async (formData) => {
    for (const [key, value] of formData.entries()) {
      const [type, other] = key.split('-');

      if (!other) {
        const v = data.find(d => d.id === key);
        console.log(v)
        if (value.size) {
          const json = await excelToJson(value);
          console.log(key, json)
        }
      }
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
          <div className='flex justify-end gap-4'>
          <button type='button' className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Delete Selected</button>
          <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Update Selected</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
