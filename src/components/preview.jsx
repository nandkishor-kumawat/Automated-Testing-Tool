"use Client";

import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ScrollArea } from './ui/scroll-area';
import { useTableStore } from '@/store';
import { Button } from './ui/button';
import UploadConfirmationModal from './upload-confirmation';
import ReactVirtualizedTable from './virtualized-table';
import { RxCross2 } from "react-icons/rx";



const Preview = ({
  isVisible,
  handleClose
}) => {
  const { fileData, selectedTables } = useTableStore();
  const [currentKey, setCurrentKey] = useState('');
  const sheetNames = Object.keys(fileData);

  const [obj, setObj] = useState();
  const [result, setResult] = useState([])

  useEffect(() => {
    if (selectedTables.length) {
      setObj(selectedTables[0].id)
      setCurrentKey(selectedTables[0].id)
    }
  }, [selectedTables]);

  useEffect(() => {
    selectedTables.forEach(({ id }) => {
      if (Object.keys(fileData).includes(id.toString())) {
        setResult(prev => [...prev, { id, sheetName: id }])
      }
    });
  }, [fileData, selectedTables])

  const deleteSheet = (sheetName) => {
    setResult(prev => prev.filter(e => e.sheetName !== sheetName))
  }

  const linkup = (sheetName) => {
    const sheet = result.find(e => e.sheetName === sheetName)
    const table = result.find(e => e.id === obj)
    if (table) {
      const data = result.filter(e => e.id !== obj)
      setResult([...data,
      {
        id: obj,
        sheetName
      }])
      return
    }
    if (sheet && obj === sheet.id) {
      setResult(prev => prev.filter(e => e.sheetName !== sheetName))
      return
    }
    if (sheet) {
      return
    }
    setResult(p => [
      ...p, {
        id: obj,
        sheetName
      }])
  }

  if (!isVisible) return null;

  return (
    <Dialog open={isVisible}>
      <DialogContent className="max-w-5xl p-0 border-none">
        <div className='flex justify-center items-center w-full'>
          <div className='flex flex-row bg-gray-900 h-[90vh] w-full m-auto rounded-md overflow-hidden'>
            <div className='flex flex-col bg-gray-500 pl-2 py-4 gap-3 max-w-[600px] h-full w-full justify-between'>

              <div className="flex flex-auto w-full overflow-hidden">
                <ScrollArea className='flex-1 pr-3'>
                  <div className='divide-y divide-gray-400 w-full'>
                    <p className='text-center mb-2 text-slate-200'>Table Name</p>
                    {selectedTables.map(({ id, name }, i) => (
                      <p key={i} title={name} className={`flex gap-2 items-center justify-between px-1 py-2 hover:bg-foreground/10 cursor-pointer transition-all duration-200 ease-in-out ${id === currentKey && "bg-foreground/20"}`}
                        onClick={() => { setObj(id); setCurrentKey(id) }}>
                        <span className='flex-grow'>{name}</span>
                        <span className='text-xs'>{result.find(e => e.id == id)?.sheetName || ''}</span>
                        {/* <span className='text-sm text-blue-300'>{fileData[id]?.length ?? 0}</span> */}
                      </p>
                    ))}
                  </div>
                </ScrollArea>

                <ScrollArea className='flex-1 pr-3'>
                  <div className='divide-y divide-gray-400 w-full'>
                    <p className='text-center mb-2 text-slate-200'>Sheet Name</p>
                    {sheetNames.sort().map((sheetName, i) => {
                      const sheet = result.find(e => e.sheetName === sheetName)
                      return (
                        <div
                          className={`flex gap-2 items-center justify-between w-full text-left ${!sheet && 'hover:bg-foreground/10 cursor-pointer'} transition-all duration-200 ease-in-out ${sheetName === currentKey && "bg-foregrond/20"}`}
                          key={i}
                        >
                          <button
                            disabled={sheet}
                            title={sheetName}
                            className='px-1 py-2 flex-1 text-left flex'
                            onClick={() => { linkup(sheetName); setCurrentKey(sheetName) }}>
                            <span className='flex-grow'>{sheetName}</span>

                            {/* <span className='text-sm text-blue-300'>{fileData[sheetName]?.length ?? 0}</span> */}
                            {/* <span className='text-xs'>{result.find(e => e.sheetName == sheetName)?.id || ''}</span> */}
                          </button>
                          {sheet && <button className='bg-gray-600 rounded-full p-1 cursor-pointer' onClick={() => deleteSheet(sheetName)}>
                            <RxCross2 />
                          </button>}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>

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
