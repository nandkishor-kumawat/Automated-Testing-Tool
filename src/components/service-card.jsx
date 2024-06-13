"use client"
import React, { useState } from 'react'
import { useTableStore } from '@/store';

const ServiceCard = ({ data }) => {
    const { selectedTables, addTable, removeTable } = useTableStore();
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsSelected(e.target.checked);
        if (e.target.checked) {
            addTable(data.id);
        } else {
            removeTable(data.id);
        }
    };


    return (
        <div
            style={{
                backgroundColor: isSelected ? '#193cff' : 'transparent'
            }}
            className='cursor-pointer flex flex-grow items-center h-12 border-gray-700 border px-2 py-2 rounded-md justify-between'>
            <div className='flex items-center mx-2'>
                <input type='checkbox' className='accent-green-600 h-4 w-4 hidden'
                    onChange={handleCheckboxChange}
                    name={`${data.id}-checkbox`}
                    id={`${data.id}-checkbox`}
                />
                <label htmlFor={`${data.id}-checkbox`} className='ml-2 cursor-pointer'>{data.name}</label>
            </div>
            {/* {showFileInput && (
                <div className='flex gap-2'>
                    <label htmlFor={data.id} className='flex items-center gap-2 bg-[#1e1e1e]/60 hover:bg-[#1e1e1e]/100 cursor-pointer px-3 py-1 rounded transition-all duration-150 ease-in-out' title={file?.name}>{textLabel}{!file && <IoCloudUpload />}</label>
                    <input type='file' id={data.id} name={data.id} className='hidden' onChange={selectFile} ref={fileRef} />
                    {file && (
                        <button className='hover:text-red-700 text-red-600' onClick={deleteFile}>
                            <MdCancel />
                          </button>
                    )}
                </div>
            )} */}
        </div>
    )
}

export default ServiceCard
