import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker as DateRangePickerC } from 'react-date-range';

const DateRangePicker = ({ handleDateSelect, dateRange }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: dateRange.startDate || new Date(),
    endDate: dateRange.endDate || new Date(),
    key: 'selection',
  })

  const handleSelect = (range) => {
    setSelectionRange(range.selection)
  }


  return (
    <div>
      <DateRangePickerC
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
      <div className='w-[333px] bg-gray-900 flex'>
        <button className='bg-red-500 flex-1 py-2'onClick={() => handleDateSelect()}>Close</button>
        <button  className='bg-green-500 flex-1 py-2'onClick={() => handleDateSelect(selectionRange)}>Apply filter</button>

      </div>

    </div>
  )
}

export default DateRangePicker

