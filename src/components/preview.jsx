"use Client";

import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from './ui/scroll-area';
import StickyHeadTable from './mui-table';
import { useTableStore } from '@/store';


const Preview = ({
  isVisible,
  fileData,
  keys
}) => {
  const firstSheet = Object.keys(fileData)[0]
  const { selectedTables } = useTableStore();
  const [currentKey, setCurrentKey] = useState('');

  useEffect(() => {
    if (selectedTables.length)
    setCurrentKey(selectedTables[0].id)
  }, [selectedTables]);


  const uploadData = async () => {
    const filteredData = {};
    keys.forEach((key) => {
      if (fileData[key]) filteredData[key] = fileData[key]
    });

    const lengthOfData = Object.keys(filteredData).length;
    if (lengthOfData) {
      console.log(filteredData);
    } else {
      alert("No data to upload")
    }
  }

  if (!isVisible) return null;

  return (
    <Dialog open={isVisible} noCross>
      <DialogContent className="max-w-5xl p-0 border-none" noCros>
        <div className='flex justify-center items-center w-full'>
          <div className='flex flex-row bg-gray-900 h-[90vh] w-full m-auto rounded-md overflow-hidden'>
            <div className='flex flex-col bg-gray-500 px-2 py-4 gap-3 max-w-[300px] h-full w-full justify-between'>
              <ScrollArea className='px-3'>
                {/* <div className='sticky top-0 bg-gray-600 px-2 '>
                  <button className='text-xl font-bold'>Tables</button>
                  <button className='text-xl font-bold'>Tables</button>
                </div> */}
                <div className='divide-y divide-gray-400 h-full flex-1'>
                  {selectedTables.map((t, i) => (
                    <p key={i} className={`px-3 py-2 hover:bg-foreground/30 cursor-pointer ${t.id === currentKey && "bg-foreground/20"}`} onClick={() => setCurrentKey(t.id)}>{t.name}</p>
                  ))}
                </div>
              </ScrollArea>
              <div className="w-full px-3">
                <button className='bg-primary/60 py-2 w-full rounded-md' onClick={uploadData}>Upload Data</button>
              </div>
            </div>
            {/* <ScrollArea className='h-full bg-gray-700 flex-1 w-[10vmin] p-4 ' horizontal >
                            <div className='h-full w-[10vw]'>
                                <TableDemo data={fileData} currentKey={currentKey} />
                            </div>
                        </ScrollArea> */}
            <StickyHeadTable data={fileData} currentKey={currentKey} />
            {/* <div className='w-full h-full'> */}
            {/* </div> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Preview
