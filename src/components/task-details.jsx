import React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { MdErrorOutline } from 'react-icons/md'
import { ScrollArea } from './ui/scroll-area'

const TaskDetails = ({
    handleClose,
    result,
    title
}) => {

    const Error = () => (
        <div className="text-red-500 flex gap-2 items-center">
            <MdErrorOutline />
            <span>Error</span>
        </div>
    )

    const Success = () => (
        <div className="text-green-500 flex gap-2 items-center">
            <FaRegCircleCheck size={14} />
            <span>Success</span>
        </div>
    )

    return (
        <>
            <div className='bg-gray-600 py-4 px-6 rounded-md flex flex-col max-h-[400px]'>
                <h2 className='text-lg font-bold my-3'>{title}</h2>
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className='h-full'>
                        <table className='w-full h-full'>
                            <thead className="sticky top-0 bg-gray-400">
                                <tr>
                                    <th className='text-left'>Table Name</th>
                                    <th className='text-left'>Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {result.map((t, i) => (
                                    <tr key={i}>
                                        <td>{t.name}</td>
                                        <td>{i & 1 ? <Success /> : <Error />}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ScrollArea>
                </div>
                <div className="flex justify-end mt-3">
                    <button onClick={handleClose} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Close</button>
                </div>
            </div>
        </>
    )
}

export default TaskDetails
