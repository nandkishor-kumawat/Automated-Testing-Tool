import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';


const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} sx={{
            backgroundColor: 'rgb(55 65 81)',
            borderRadius: '0',
        }} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'collapse', tableLayout: '' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

export default function ReactVirtualizedTable({
    data, currentKey
}) {
    const currentTable = data[currentKey];
    if (!currentTable || currentTable.length === 0) return (
        <div className='flex justify-center items-center w-full'>
            <p className='text-gray-300 text-xl'>No Data</p>
        </div>
    )

    const columns = React.useMemo(() => {
        return currentTable.reduce((maxCol, row) => {
            const cols = Object.keys(row);
            return cols.length > maxCol.length ? cols : maxCol;
        }, []);
    }, [currentTable]);


    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                        key={index}
                        variant="head"
                        sx={{
                            // backgroundColor: 'background.paper',
                            py: 1,
                            backgroundColor: 'rgb(229 231 235)',
                            width: String(column).length * 9,
                        }}
                    >
                        {String(column)}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    function rowContent(_index, row) {
        return (
            <React.Fragment>
                {columns.map((column, index) => (
                    <TableCell
                        key={index}
                        sx={{
                            // color: !row[column] ? "#39ff39" : row[column].includes('Error') ? '#eb6041fc' : '#fff',
                            color: 'white',
                            py: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>{String(row[column])}</TableCell>
                ))}
            </React.Fragment>
        );
    }


    return (
        <Paper style={{ width: '100%' }}>
            <TableVirtuoso
                data={currentTable}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
}
