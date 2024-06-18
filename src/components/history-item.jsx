import { useRef, useState } from "react"


const HistoryItem = ({
    item
}) => {


    const { Type, CreatedBy, Status, Tables, CreatedOn } = item
    const TableBox = ({ text }) => {
        return <span className='border border-white p-0.5 rounded hover:bg-gray-700 mr-1.5 cursor-pointer px-1 text-xs'>{text}</span>
    }

    const tableRef = useRef();
    const [maxHeight, setMaxHeight] = useState(0)

    const toggleDown = () => {
        if (tableRef.current) {
            if (maxHeight === 0) {
                setMaxHeight(tableRef.current.scrollHeight);
            } else {
                setMaxHeight(0);
            }
        }
    }

    return (
        <div className="bg-gray-600 p-4 rounded-md text-sm text-[silver]">
            <div className='flex flex-col' onClick={toggleDown}>

                <p>Type: {Type}</p>
                <div className='flex justify-between'>
                    <p>CreatedBy: {CreatedBy}</p>
                    <p>CreatedOn: {CreatedOn}</p>
                </div>
                <p>Status: <span className={Status == 'success' ? "text-green-600" : "text-red-700"}>{Status}</span> </p>

                <p>Tables: {Tables.map(text => <TableBox key={text} text={text} />)}</p>
            </div>
            <div ref={tableRef} className="overflow-hidden duration-300 transition-all ease-in-out" style={{
                maxHeight: maxHeight
            }}>
                <table className="w-full mt-3 border-t border-t-[silver]">
                    <thead>
                        <tr>
                            <th className="text-left">Table</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Tables.map((table, index) => <tr key={index}>
                            <td className=" ">{table}</td>
                            <td className=" ">{(index%2 ==0)?"Success":"Failure"}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryItem