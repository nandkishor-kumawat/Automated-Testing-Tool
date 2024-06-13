"use client"
import { AlertBox } from '@/components/alert-box';
import DeleteConfirmationModal from '@/components/delete-confirmation';
import Preview from '@/components/preview';
import ServiceCard from '@/components/service-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import UploadFileModal from '@/components/upload-file-modal';
import { data } from '@/lib/constants';
import { useTableStore } from '@/store';
import { redirect } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'



const page = () => {
  const formRef = useRef();
  const { setSelectedTables } = useTableStore();

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
    const values = getFields();
    console.log(values);
    if (values.length) {
      setSelectedTables(values);
      setKeys(values)
      setIsFileModalVisible(true);
    }
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false)
  const deletebtn = async (e) => {
    e.preventDefault();
    const values = getFields();
    console.log(values);
    if (values.length) {
      setSelectedTables(values);
      setDeleteLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
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
      <Preview isVisible={isPreviewModalVisible} fileData={fileData} keys={keys} />
      <div className='h-full w-full flex flex-col gap-3 max-w-xl m-auto'>
        <div className="mt-4 mb-2 px-2">
          <h1 className='text-3xl font-bold text-balance text-center'>Automated Data Tool</h1>
        </div>
        <ScrollArea>
          <div className='flex-1 px-3'>
            <form className='space-y-2' ref={formRef}>
              <div className='flex flex-wrap gap-2'>
                {data.map((service, i) => <ServiceCard key={i} data={service} />)}
              </div>
            </form>
          </div>
        </ScrollArea>
        <div className='flex justify-end gap-4 px-2 pb-3'>
          <DeleteConfirmationModal />
          <button
            onClick={submitForm}
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Next</button>
        </div>
      </div>
    </>
  )
}

export default page
