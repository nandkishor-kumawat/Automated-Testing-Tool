import { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

const HistoryItem = ({ item, search }) => {
    const { Type, CreatedBy, Status, Tables, CreatedOn } = item;

    // Function to highlight matched text
    const highlightText = (text) => {
        if (!search) return text;

        const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, (match) => `<mark>${match}</mark>`);
    };

    const TableBox = ({ text }) => {
        return (
            <span className='border border-white p-0.5 rounded hover:bg-gray-700 mr-1.5 cursor-pointer px-1 text-xs'
                dangerouslySetInnerHTML={{ __html: highlightText(text) }} />
        );
    };

    const tableRef = useRef();
    const [maxHeight, setMaxHeight] = useState(0);

    const toggleDown = () => {
        if (tableRef.current) {
            if (maxHeight === 0) {
                setMaxHeight(tableRef.current.scrollHeight);
            } else {
                setMaxHeight(0);
            }
        }
    };

    return (
        <div className="bg-gray-600 p-4 rounded-md text-sm text-[silver]">
            <div className='flex flex-col' >


                <p>Type: <span dangerouslySetInnerHTML={{ __html: highlightText(Type) }} /></p>

                <p>CreatedBy: <span dangerouslySetInnerHTML={{ __html: highlightText(CreatedBy) }} /></p>
                <p>CreatedOn: {CreatedOn}</p>

                <p>Status: <span className={Status === 'success' ? "text-green-600" : "text-red-700"}>
                    <span dangerouslySetInnerHTML={{ __html: highlightText(Status) }} />
                </span></p>

                <button onClick={toggleDown} className="w-fit flex items-center">View Table Details
                    {maxHeight ? <MdKeyboardArrowDown size={20} /> : <MdOutlineKeyboardArrowRight size={20} />}</button>
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
                        {Tables.map((table, index) => (
                            <tr key={index}>
                                <td className=" " dangerouslySetInnerHTML={{ __html: highlightText(table.name) }} />
                                <td className=" ">{table.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryItem;
