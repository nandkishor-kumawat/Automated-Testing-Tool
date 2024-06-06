"use client"
import React from 'react'
import { MdCancel } from "react-icons/md";
import { useState } from 'react';


const ServiceCard = ({ data }) => {
    const [showFileInput, setShowFileInput] = useState(false);
    const [file, setFile] = useState('')

    const handleCheckboxChange = () => {
        setShowFileInput(!showFileInput);
    };

    function checkfile(sender) {
        var validExts = [".xlsx", ".xls"];
        var fileExt = sender.value;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        return validExts.indexOf(fileExt) >= 0
    }

    const selectFile = e => {
        const isValidType  = checkfile(e.target);
        if(!isValidType){
            alert("Only excel files are supported\nSelect a different file!");
            return;
        }
        setFile(e.target.files[0])
    }

    const textLabel = file ? file?.name?.length > 13 ? file?.name?.slice(0, 12) + '...' : file?.name : "Add a file";

    return (
        <div className='flex items-center border-gray-700 border px-4 py-2 rounded-md justify-between'>
            <div className='flex h-[32px] items-center  '>
                <input type='checkbox' name={data.id} className='accent-green-600'
                    onChange={handleCheckboxChange}
                />
                <p className='ml-2'>{data.name}</p>
            </div>
            {showFileInput && (
                <div className='flex gap-2'>
                    <label htmlFor={data.id} className='flex gap-2 bg-[#1e1e1e]/60 hover:bg-[#1e1e1e]/100 cursor-pointer px-3 py-1 rounded transition-all duration-150 ease-in-out' title={file?.name}>{textLabel}</label>
                    <input type='file' id={data.id} className='hidden' onChange={selectFile} />
                    {file && (
                        <button className='hover:text-red-700 text-red-600 font-bold' onClick={() => setFile('')}>
                            <MdCancel />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ServiceCard
