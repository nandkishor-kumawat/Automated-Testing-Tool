"use client"
import DeleteConfirmationModal from '@/components/delete-confirmation';
import History from '@/components/history';
import Preview from '@/components/preview';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import UploadFileModal from '@/components/upload-file-modal';
import { TableData, data } from '@/lib/constants';
import { generateDummyBankData } from '@/lib/dummy';
import { useTableStore } from '@/store';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useRef, useState } from 'react'

const page = () => {
  const formRef = useRef();
  const { selectedTables, setSelectedTables, fileData, setFileData } = useTableStore();

  // useLayoutEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     redirect('/login')
  //   }
  // }, [])


  const [isFileModalVisible, setIsFileModalVisible] = useState(false)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)

  const submitForm = async () => {
    // const BankMst = generateDummyBankData(5)
    // console.log(JSON.stringify(BankMst, null, 2))

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1YjAzOWQyLTkyNmYtNGM1Yi1iMmEwLTkzYzExOGY4YjNlMSIsInVuaXF1ZV9uYW1lIjoiU3VwZXIgQWRtaW4iLCJlbWFpbCI6InN1cGVyYWRtaW5AcHJvcHZpdm8uY29tIiwiZ2l2ZW5fbmFtZSI6IlN1cGVyIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsIkxlZ2FsRW50aXR5SWQiOiJTeXN0ZW0uTGlucS5FbnVtZXJhYmxlK1NlbGVjdExpc3RJdGVyYXRvcmAyW1Byb3BWaXZvX0NvcmUuRW50aXRpZXMuQ29yZS5Vc2VyTGVnYWxFbnRpdHlSb2xlLFN5c3RlbS5TdHJpbmddIiwiTGVnYWxFbnRpdHlVbml0SWQiOiJTeXN0ZW0uTGlucS5FbnVtZXJhYmxlK1NlbGVjdEVudW1lcmFibGVJdGVyYXRvcmAyW1Byb3BWaXZvX0NvcmUuRW50aXRpZXMuQ29yZS5Vc2VyVW5pdFJvbGUsU3lzdGVtLlN0cmluZ10iLCJQcm9wZXJ0eUlkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RFbnVtZXJhYmxlSXRlcmF0b3JgMltQcm9wVml2b19Db3JlLkVudGl0aWVzLkNvcmUuVW5pdFJvbGVQcm9maWxlLFN5c3RlbS5TdHJpbmddIiwibmJmIjoxNzE4NTk3NTMwLCJleHAiOjE3MjExODk1MzAsImlhdCI6MTcxODU5NzUzMH0.tIdwnLIB6G7r7hQiS1YEVeecyf3dR5BkNaaBm0EvQig";

    // const a = {
    //   "bankName": "Kent,df Graves adkjfnd Pendfnington",
    //   "displayName": "Kednt GP",
    //   "routingNumber": "952424820",
    //   "bankPhoneNumber": "84633734201",
    //   "bankCode": "KGP",
    //   "primaryContactNumber": "8121334124",
    //   "email": "lstephens@ramsey-barnes.info",
    //   "bankWebsite": "https://davis.info/",
    //   "state": "4016ce22-4e9c-4681-96f6-4f15afbe8803",
    //   "countryId": "afaf4b7e-be8f-49d5-9afa-8bae64ed3030",
    // "cityId": "1e2a76a5-58b6-42ac-aade-5291e0a95a2f",
    // "zipCodeId": "c0454fc7-08f6-4341-a935-fb8570532331",
    //   "address1": "5999 John Junction Apt. 371, West Regina, MO 69773",
    //   "address2": "string",
    //   "startDate": "2024-02-01T10:57:36.455Z"
    // }

    // console.time('started')
    // const data = await fetch('https://localhost:7092/api/v1/Banks/bulk', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify([a, ...BankMst])
    // }).then(res => res.json())
    // console.timeEnd('started')
    // console.log(JSON.stringify(data, null, 2))

    // return
    if (selectedTables.length) {
      setIsFileModalVisible(true);
    }
  }


  const handleSetData = (data) => {
    setFileData(data);
    setIsFileModalVisible(false);
    setIsPreviewModalVisible(true);
  }


  return (
    <>
      <UploadFileModal isVisible={isFileModalVisible} handleSetData={handleSetData} handleClose={() => setIsFileModalVisible(false)} />
      <Preview handleClose={() => setIsPreviewModalVisible(false)} isVisible={isPreviewModalVisible} />
      <div className='w-full h-full flex divide-x'>
        <div className='h-full w-full flex flex-col gap-3 max-w-xl m-auto'>
          <div className="mt-4 mb-2 px-2 space-y-3">
            <h1 className='text-3xl font-bold text-balance text-center'>Automated Data Tool</h1>
            <h3 className='text-xl'>Select tables</h3>
          </div>
          <ScrollArea className='h-full'>
            <div className='flex-1 px-3'>
              <form className='space-y-2' ref={formRef}>
                <div className='flex flex-wrap gap-2'>
                  {TableData.map((service, i) => <ServiceCard key={i} data={service} />)}
                </div>
              </form>
            </div>
          </ScrollArea>
          <div className='flex justify-end gap-4 pb-3 px-3'>
            <DeleteConfirmationModal />
            <Button
              // disabled={!selectedTables.length}
              onClick={submitForm}
              className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Next</Button>
          </div>
        </div>

        <div className='w-full max-w-md'>
          <History />
        </div>
      </div>
    </>
  )
}

export default page
