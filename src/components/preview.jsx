"use Client";

import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ScrollArea } from './ui/scroll-area';
import StickyHeadTable from './mui-table';
import { useTableStore } from '@/store';
import { Button } from './ui/button';
import UploadConfirmationModal from './upload-confirmation';
import ReactVirtualizedTable from './virtualized-table';


const Preview = ({
  isVisible,
  fileData,
  handleClose
}) => {
  const sheetNames = Object.keys(fileData);
  const { selectedTables } = useTableStore();
  const [currentKey, setCurrentKey] = useState('');

  useEffect(() => {
    if (selectedTables.length)
      setCurrentKey(selectedTables[0].id)
  }, [selectedTables]);



  if (!isVisible) return null;

  return (
    <Dialog open={isVisible}>
      <DialogContent className="max-w-5xl p-0 border-none">
        <div className='flex justify-center items-center w-full'>
          <div className='flex flex-row bg-gray-900 h-[90vh] w-full m-auto rounded-md overflow-hidden'>
            <div className='flex flex-col bg-gray-500 px-2 py-4 gap-3 max-w-[300px] h-full w-full justify-between'>
              <ScrollArea className='px-3'>

                <div className='divide-y divide-gray-400 h-full flex-1'>
                  {selectedTables.map((t, i) => (
                    <p key={i} className={`flex gap-2 items-center justify-between px-1 py-2 hover:bg-foreground/10 cursor-pointer transition-all duration-200 ease-in-out ${t.id === currentKey && "bg-foreground/20"}`} onClick={() => setCurrentKey(t.id)}>
                      <span className='flex-grow'>{t.name}</span>
                      <span className='text-sm text-blue-300'>{fileData[t.id]?.length ?? 0}</span>
                    </p>
                  ))}
                  {/* {sheetNames.sort().map((t, i) => (
                    <p key={i} className={`flex gap-2 items-center justify-between px-1 py-2 hover:bg-foreground/10 cursor-pointer transition-all duration-200 ease-in-out ${t === currentKey && "bg-foreground/20"}`} onClick={() => setCurrentKey(t)}>
                      <span className='flex-grow'>{t}</span>
                      <span className='text-sm text-blue-300'>{fileData[t]?.length ?? 0}</span>
                    </p>
                  ))} */}
                </div>
              </ScrollArea>
              <div className="w-full px-3 flex gap-2 flex-wrap">
                <UploadConfirmationModal fileData={fileData} handleClosePreviewModal={handleClose} />
                <Button variant={"destructive"} className='flex-auto' onClick={handleClose}>Close</Button>
              </div>
            </div>

            {/* <StickyHeadTable data={fileData} currentKey={currentKey} /> */}
            <ReactVirtualizedTable data={fileData} currentKey={currentKey} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Preview
