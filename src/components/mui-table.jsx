import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StickyHeadTable = ({
    data, currentKey
}) => {
    const currentTable = data[currentKey];
    if (!currentTable || currentTable.length === 0) return (
        <div className='flex justify-center items-center w-full'>
            <p className='text-gray-300 text-xl'>No Data</p>
        </div>
    )

    const cols = React.useMemo(() => {
        return currentTable.reduce((maxCol, row) => {
            const cols = Object.keys(row);
            return cols.length > maxCol.length ? cols : maxCol;
        }, []);
    }, [currentTable]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: "750px", borderRadius: 0 }}>
            <TableContainer sx={{ height: "100%" }} className='bg-gray-700'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {cols.map((column, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        backgroundColor: 'rgb(229 231 235)',
                                        py: 1
                                    }}
                                >
                                    {String(column)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentTable.slice(0, 10).map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {cols.map((col, index) => (
                                    <TableCell key={index} sx={{
                                        color: "#fff",
                                        minWidth: String(row[col]).length * 9,
                                        py: 1,
                                    }}>{String(row[col])}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {currentTable.length > 10 && <p className='text-center text-gray-300 mt-6 mb-3 text-sm'>Data is truncate due to large size</p>}
            </TableContainer>
        </Paper>
    );
}

export default React.memo(StickyHeadTable);