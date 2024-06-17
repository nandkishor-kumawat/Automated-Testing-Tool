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

    const type = 0;

    if (type) return (
        <div className='flex items-center h-12 border-gray-700 border px-2 py-2 rounded-md justify-between'>
            <div className='flex items-center mx-2 gap-3'>
                <input type='checkbox' className='accent-green-600 h-4 w-4'
                    onChange={handleCheckboxChange}
                    name={`${data.id}-checkbox`}
                    id={`${data.id}-checkbox`}
                />
                <label htmlFor={`${data.id}-checkbox`} className='text-neutral-500'>{data.name}</label>
            </div>
        </div>
    )

    return (
        <div className='flex-grow'>
            <input type='checkbox' className='accent-green-600 hidden'
                onChange={handleCheckboxChange}
                name={`${data.id}-checkbox`}
                id={`${data.id}-checkbox`}
            />
            <label
                style={{ backgroundColor: isSelected ? '#193cff' : 'transparent' }}
                htmlFor={`${data.id}-checkbox`}
                className='cursor-pointer flex justify-center text-center text-balance px-4 py-2 border-gray-700 border rounded-md'
            >
                {data.name}
            </label>
        </div>
    )
}

export default ServiceCard
