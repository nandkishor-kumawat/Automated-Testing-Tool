import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "./ui/scroll-area"



export function TableDemo({ data,currentKey }) {

    const currentTable = data[currentKey];
    if(currentTable.length===0) return <p>No Data</p>
    return (
        <ScrollArea className='h-full w-[100vw]'>
            <Table>
                {data.length > 10 && <TableCaption>Data is truncate due to large size</TableCaption>}
                <TableHeader className="sticky top-0 bg-gray-200">
                    <TableRow>
                        {Object.keys(currentTable[0])?.map(key => (
                            <TableHead key={key}>{key}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentTable?.slice(0, 10).map((row, i) => (
                        <TableRow key={i}>
                            {Object.values(row).map((cell, index) => (
                                <TableCell key={index}>{cell.toString()}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}
