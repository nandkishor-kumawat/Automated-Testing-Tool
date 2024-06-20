"use client"
import DateRangePicker from '@/components/DateRangePicker';
import DeleteConfirmationModal from '@/components/delete-confirmation';
import History from '@/components/history';
import Preview from '@/components/preview';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import UploadFileModal from '@/components/upload-file-modal';
import { TableData, data } from '@/lib/constants';
import { jsonToExcel } from '@/lib/json-to-excel';
import { useTableStore } from '@/store';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect, useRef, useState } from 'react'


const page = () => {
  const formRef = useRef();
  const { selectedTables, setSelectedTables } = useTableStore();

  // useLayoutEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     redirect('/login')
  //   }
  // }, [])

  const [isFileModalVisible, setIsFileModalVisible] = useState(false)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)
  const [fileData, setFileData] = useState([]);

  const getFields = () => {
    const formData = new FormData(formRef.current);
    const values = []
    for (const key of formData.keys()) {
      const [type, other] = key.split('-');
      if (other) values.push(type)
    }
    return values;
  }

  const submitForm = async () => {
    // return jsonToExcel(data)
    console.log(selectedTables);
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
      <Preview handleClose={() => setIsPreviewModalVisible(false)} isVisible={isPreviewModalVisible} fileData={fileData} />
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
              disabled={!selectedTables.length}
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
