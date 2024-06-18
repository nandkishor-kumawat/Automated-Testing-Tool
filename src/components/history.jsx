import React, { useState } from 'react'
import HistoryItem from './history-item'
import { ScrollArea } from './ui/scroll-area'
const dummyData = [
    {
        "Type": "add",
        "CreatedBy": "John Doe",
        "Status": "success",
        "Tables": ["role", "user", "legal entity"],
        "CreatedOn": "2024-06-18"
    },
    {
        "Type": "remove",
        "CreatedBy": "Jane Smith",
        "Status": "failure",
        "Tables": ["role", "legal entity"],
        "CreatedOn": "2024-06-17"
    },
    {
        "Type": "remove",
        "CreatedBy": "Alice Johnson",
        "Status": "success",
        "Tables": ["user", "legal entity"],
        "CreatedOn": "2024-06-16"
    },
    {
        "Type": "add",
        "CreatedBy": "Bob Williams",
        "Status": "failure",
        "Tables": ["role"],
        "CreatedOn": "2024-06-15"
    }
]




const History = () => {



    return (
        <div className='w-full h-full px-2 py-3'>
            <ScrollArea className='h-full'>
                <h1 className='font-bold text-2xl text-neutral-500'>History</h1>

                <div className='mt-4 space-y-2'>

                    {
                        dummyData.map((item, i) => {
                            return (
                                <HistoryItem key={i} item={item} />
                            )
                        })
                    }


                </div>
            </ScrollArea>
        </div>

    )
}

export default History
