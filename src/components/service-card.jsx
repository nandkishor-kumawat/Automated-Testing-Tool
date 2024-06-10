"use client"
import React, { useRef } from 'react'
import { MdCancel } from "react-icons/md";
import { useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";

const ServiceCard = ({ data }) => {
    const [showFileInput, setShowFileInput] = useState(false);
    const [file, setFile] = useState('');
    const fileRef = useRef(null);

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

    const deleteFile = () => { 
        setFile('')
        fileRef.current.value = '';
    }

    const textLabel = file ? file?.name?.length > 13 ? file?.name?.slice(0, 12) + '...' : file?.name : "Upload file";

    return (
        <div className='flex items-center h-12 border-gray-700 border px-2 py-2 rounded-md justify-between'>
            <div className='flex items-center mx-2'>
                <input type='checkbox' className='accent-green-600'
                    onChange={handleCheckboxChange}
                    name={`${data.id}-checkbox`}
                    id={`${data.id}-checkbox`}
                />
                <label htmlFor={`${data.id}-checkbox`} className='ml-2'>{data.name}</label>
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
