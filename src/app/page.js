"use client"
import Preview from '@/components/preview';
import ServiceCard from '@/components/service-card';
import UploadFileModal from '@/components/upload-file-modal';
import { data } from '@/lib/constants';
import { redirect } from 'next/navigation';
import React, {  useLayoutEffect, useRef, useState } from 'react'



const page = () => {
  const formRef = useRef();

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      redirect('/login')
    }
  }, [])

  const [isFileModalVisible, setIsFileModalVisible] = useState(false)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)
  const [fileData, setFileData] = useState([]);
  const [keys, setKeys] = useState([])


  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const values = []
    for (const key of formData.keys()) {
      const [type, other] = key.split('-');
      if (other) values.push(type)
    }

    console.log(values);
    if(values.length){
      setKeys(values)
      setIsFileModalVisible(true);
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

  const handleSetData = (data) =>{
    setFileData(data);
    setIsFileModalVisible(false);
    setIsPreviewModalVisible(true);
  }

  return (
    <div>
      <div className="flex flex-center justify-center items-center mt-4 font-bold">
        <h1>Automated Data Tool</h1>
      </div>
        <UploadFileModal isVisible={isFileModalVisible} handleSetData={handleSetData} />
        <Preview isVisible={isPreviewModalVisible} fileData={fileData} keys={keys} />
      <div className='max-w-lg m-auto'>
        <form className='space-y-2 my-2' ref={formRef} onSubmit={submitForm}>
          {data.map((service, i) => <ServiceCard key={i} data={service} />)}
          <div className='flex justify-end gap-4'>
            <button type='button' className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out' onClick={deletebtn}>Delete Selected</button>
            <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Next</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
