import React, { useMemo } from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { MdErrorOutline } from 'react-icons/md'
import { ScrollArea } from './ui/scroll-area'
import { useTableStore } from '@/store'
import ReactVirtualizedTable from './virtualized-table'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const TaskDetails = ({
	handleClose,
	result = {},
	title,
	affectedTables
}) => {
	const { selectedTables } = useTableStore();
	const Error = () => (
		<div className="text-red-500 flex gap-2 items-center">
			<MdErrorOutline />
			<span>Error</span>
		</div>
	)

	const Success = () => (
		<div className="text-green-500 flex gap-2 items-center">
			<FaRegCircleCheck size={14} />
			<span>Success</span>
		</div>
	)


	const DataWithError = useMemo(() => {
		if (!result || !affectedTables) return {};
		return Object.entries(affectedTables).reduce((acc, [key, value]) => {
			acc[key] = value.map((v, i) => (result[key]?.[i]?.statusCode) ? { statusMessage: result[key][i].statusMessage, ...v, } : v)
			return acc;
		}, {})
	}, [affectedTables, result])

	const [currentKey, setCurrentKey] = React.useState(selectedTables[0]?.id ?? '');

	return (
		<>
			<div className='bg-gray-600  rounded-md flex flex-col overflow-hidden'>
				<h2 className='text-lg font-bold my-3 mx-2'>{title}</h2>
				<div className='flex justify-center items-center w-full'>
					<div className='flex bg-gray-700 h-screen max-h-[90vh] w-full m-auto overflow-hidden'>
						<div className='flex flex-col bg-gray-500 px-2 py-4 gap-3 max-w-[300px] h-full w-full justify-between'>
							<ScrollArea className='px-3'>

								<div className='divide-y divide-gray-400 h-full flex-1'>
									{selectedTables.map((t, i) => (
										<p key={i} className={`flex gap-2 items-center justify-between px-1 py-2 hover:bg-foreground/10 cursor-pointer transition-all duration-200 ease-in-out ${t.id === currentKey && "bg-foreground/20"}`} onClick={() => setCurrentKey(t.id)}>
											<span className='flex-grow'>{t.name}</span>
											<span className='text-sm text-blue-300'>{DataWithError[t.id]?.length ?? 0}</span>
										</p>
									))}
								</div>
							</ScrollArea>
							<div className="w-full px-3 flex gap-2 flex-wrap">
								<button onClick={handleClose} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Close</button>
							</div>
						</div>

						{affectedTables && <ReactVirtualizedTable data={DataWithError} currentKey={currentKey} />}
						{!affectedTables && (
							<TableContainer>
								<Table sx={{
									'& th, & td': {
										color: "#fff",
										py: 1
									},
								}}>
									<TableHead>
										<TableRow>
											<TableCell>Table Name</TableCell>
											<TableCell>Status</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{selectedTables.map((table, i) => (
											<TableRow key={i}>
												<TableCell>{table.name}</TableCell>
												<TableCell>{result?.[table.id]?.find(a => a.statusCode === 400) ? <Error /> : <Success />}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default TaskDetails
