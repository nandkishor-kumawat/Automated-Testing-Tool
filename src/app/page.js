"use client"
import ServiceCard from '@/components/service-card';
import { data } from '@/lib/constants';
import { excelToJson } from '@/lib/helpers';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'



const page = () => {
  const formRef = useRef();

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      redirect('/login')
    }
  }, [])


  const getToken = async () => {
    const res = await fetch("https://propvivo-nonprod-auth-api.azurewebsites.net/api/v1/login", {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": "",
        "rememberMe": true,
        "userName": ""
      })
    })
    const data = await res.json();
    return data.authResult.token;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const token = await getToken()
    const res = await fetch("http://localhost:7092/api/v1/Banks", {
      method: 'POST',
      headers: {
        // accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        "countryId": "afaf4b7e-be8f-49d5-9afa-8bae64ed3030",
        "bankName": "Bank of Msexico",
        "displayName": "BOM sBank",
        "routingNumber": "0433009197",
        "bankPhoneNumber": "001812-803-4198",
        "bankCode": "BOM",
        "primaryContactNumber": "007852-803-9159",
        "email": "support@BOMBank_help.com",
        "bankWebsite": "https://www.bombank.com",
        "stateId": "4016ce22-4e9c-4681-96f6-4f15afbe8803",
        "cityId": "1e2a76a5-58b6-42ac-aade-5291e0a95a2f",
        "zipCodeId": "c0454fc7-08f6-4341-a935-fb8570532331",
        "address1": "The Twin Tower at galaxy Plaza 412 Fifth Avenue Seaatle, WA 153624",
        "address2": "string",
        "startDate": "2024-02-01T10:57:36.455Z",
        "endDate": null
      })
    })

    const d = await res.json()
    console.log(d)
    return
    const formData = new FormData(e.currentTarget)
    for (const [key, value] of formData.entries()) {
      const [type, other] = key.split('-');

      if (!other && value.size) {
        const v = data.find(d => d.id === key);
        console.log(v)
        const json = await excelToJson(value);
        const a = {
          "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "stateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "cityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "zipCodeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "startDate": "2024-06-07T09:38:04.374Z",
          "endDate": "2024-06-07T09:38:04.374Z"
        }


      }
    }
  }

  const deletebtn = () => {
    const formData = new FormData(formRef.current)
    for (const [key, value] of formData.entries()) {
      const [type, other] = key.split('-');

      if (other) {
        console.log(key)
      }
    }
  }




  return (
    <div>
      <div className="flex flex-center justify-center items-center mt-4 font-bold">
        <h1>Automated Test Tool</h1>
      </div>

      <div className='max-w-lg m-auto'>
        <form className='space-y-2 my-2' ref={formRef} onSubmit={submitForm}>
          {data.map((service, i) => <ServiceCard key={i} data={service} />)}
          <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="file" runat="server" />
          <div className='flex justify-end gap-4'>
            <button type='button' className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out' onClick={deletebtn}>Delete Selected</button>
            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Add Selected</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
