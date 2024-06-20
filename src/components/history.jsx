import React, { useMemo, useState } from 'react'
import HistoryItem from './history-item'
import { ScrollArea } from './ui/scroll-area'
import Categories from './Categories'
import Search from './Search'
import DateRangePicker from './DateRangePicker'
export const dummyData = [
    {
        "Type": "add",
        "CreatedBy": "John Doe",
        "Status": "success",
        "Tables": [
            {
                name: 'Role',
                status: 'success'
            },
            {
                name: 'User',
                status: 'success'
            },
            {
                name: 'Banks',
                status: 'success'
            }
        ],
        "CreatedOn": "2024-06-18"
    },
    {
        "Type": "remove",
        "CreatedBy": "Jane Smith",
        "Status": "failure",
        "Tables": [
            {
                name: 'Role',
                status: 'success'
            },
            {
                name: 'Banks',
                status: 'success'
            }
        ],
        "CreatedOn": "2024-06-17"
    },
    {
        "Type": "remove",
        "CreatedBy": "Alice Johnson",
        "Status": "success",
        "Tables": [
            {
                name: 'Role',
                status: 'success'
            },
            {
                name: 'Legal Enitity',
                status: 'success'
            },
            {
                name: 'Banks',
                status: 'success'
            }
        ],
        "CreatedOn": "2024-06-16"
    },
    {
        "Type": "add",
        "CreatedBy": "Bob Williams",
        "Status": "failure",
        "Tables": [
            {
                name: 'Role',
                status: 'success'
            }
        ],
        "CreatedOn": "2024-06-15"
    }
]




const History = () => {
    const [showPicker, setShowPicker] = useState(false);

    const [filterValues, setFilterValues] = useState({
        search: '',
        Status: '',
        ModifiedBy: '',
        startDate: '',
        endDate: ''
    })


    const togglePicker = () => {
        setShowPicker(!showPicker); // Toggle the state
    };

    const handleSelect = (key, value) => {
        console.log(key, value);
        setFilterValues(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleDateSelect = (data) => {
        console.log(data)
        if (data) {
            setFilterValues(prev => ({
                ...prev,
                ...data
            }))
        }
        else
            setFilterValues(prev => ({
                ...prev,
                startDate: '',
                endDate: ''
            }))

        togglePicker()
    }

    const { search, Status, ModifiedBy, startDate, endDate } = filterValues;
    const [filterData, setFilterData] = useState(dummyData)

    const [filterType, setFilterType] = useState(false);


    const applyFilter = () => {
        const filterData = dummyData.filter(item => {
            const matchesSearch = !search || Object.values(item).some(value =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            );
            const matchesStatus = !Status || item.Status === Status;
            const matchesModifiedBy = !ModifiedBy || item.CreatedBy === ModifiedBy;
            const d = new Date(item.CreatedOn).setHours(0, 0, 0, 0);
            const sd = new Date(startDate).setHours(0, 0, 0, 0);
            const ed = new Date(endDate).setHours(0, 0, 0, 0);
            const matchesDateRange = (!startDate || !endDate) || (d >= sd && d <= ed);

            return matchesSearch && matchesStatus && matchesModifiedBy && matchesDateRange;
        });
        setFilterData(filterData)
    }

    const clearFilter=() => {
        setFilterValues({
            search: '',
            Status: '',
            ModifiedBy: '',
            startDate: '',
            endDate: ''
        })
        setFilterData(dummyData)
        setFilterType(false)
    }

    return (
        <div className='w-full h-full px-2 py-3'>
            <ScrollArea className='h-full'>
                <h1 className='font-bold text-2xl text-neutral-500 px-2 my-3'>History</h1>
                <Search handleSearch={handleSelect} onClick={() => setFilterType(!filterType)} />

                {filterType && (
                    <div>
                        <div className='flex items-ceter p-2 gap-2'>
                            <Categories handleSelect={handleSelect} filterValues={filterValues} />
                            <button className='p-2 rounded bg-black border border-gray-700 text-sm' onClick={togglePicker}>
                                {startDate && endDate ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}` : 'Select Date Range'}
                            </button>
                        </div>
                        <div className='flex items-center gap-2 px-2'>
                            <button className='bg-green-400 p-1 rounded px-3' onClick={applyFilter}>Add filter</button>
                            <button className='bg-red-600 p-1 rounded px-3' onClick={clearFilter}> Remove filter</button>
                        </div>
                    </div>
                )}

                {showPicker && (
                    <div className="absolute z-[1000]">
                        <DateRangePicker handleDateSelect={handleDateSelect} dateRange={filterValues} />
                    </div>
                )}



                <div className='mt-3 px-2 space-y-2'>

                    {
                        filterData.map((item, i) => {
                            return (
                                <HistoryItem key={i} item={item} search={search} />
                            )
                        })

                    }
                    {
                        filterData.length === 0 && (
                            <p className='text-neutral-500 text-lg'>No history found</p>
                        )
                    }


                </div>
            </ScrollArea>
        </div>

    )
}

export default History
