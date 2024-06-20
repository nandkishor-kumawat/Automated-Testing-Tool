import React, { useState } from 'react';
import CategoryItem from './category_dropdown';
import { dummyData } from './history';


const Categories = ({ handleSelect, filterValues }) => {
  const [startDate, setStartDate] = useState(new Date());


  const categories = ['Status', 'modifiedBy', 'Date']
  const StatusValues = ['success', 'failure', 'mixed']

  return (
    <>
      <CategoryItem label={'Status'} options={StatusValues} value={filterValues.Status} handleSelect={handleSelect}/>
      <CategoryItem label={'ModifiedBy'} options={dummyData.map(item=>item.CreatedBy)} value={filterValues.ModifiedBy} handleSelect={handleSelect} />
      
    </>
  )
};

export default Categories;