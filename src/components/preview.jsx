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
import { TableDemo } from './table-data';
import { ScrollArea } from './ui/scroll-area';


const Preview = ({
    isVisible,
    fileData,
    keys
}) => {
    const firstSheet = Object.keys(fileData)[0]
    const [currentKey, setCurrentKey] = useState('');
    
    useEffect(() => {
        setCurrentKey(firstSheet)
    }, [firstSheet])


    const uploadData = async () => {
        console.log(fileData)
    }

    return (

        <Dialog open={isVisible} noCross>
            <DialogContent className="max-w-5xl p-0 border-none" noCros>
                <div className='flex justify-center items-center w-full'>
                    <div className='flex flex-row bg-gray-900 h-[90vh] w-full m-auto rounded-md overflow-hidden'>
                        <div className='flex flex-col bg-gray-500 px-2 py-4 gap-3 max-w-[300px] h-full w-full justify-between'>
                            <ScrollArea className='px-3'>
                                <div className='divide-y h-full flex-1'>
                                    {Object.keys(fileData)?.map((key, i) => (
                                        <p key={i} className={`px-3 py-2 hover:bg-foreground/30 cursor-pointer ${key === currentKey && "bg-foreground/20"}`} onClick={() => setCurrentKey(key)}>{key}</p>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="w-full px-3">
                                <button className='bg-purple-600 py-2 w-full rounded-md' onClick={uploadData}>Upload Data</button>
                            </div>
                        </div>
                        <ScrollArea className='h-full bg-gray-700 flex-1 w-[10vmin] p-4 ' horizontal >
                            <div className='h-full w-[10vw]'>
                                <TableDemo data={fileData} currentKey={currentKey} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Preview
