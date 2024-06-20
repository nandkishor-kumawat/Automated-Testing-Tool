import ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    const formData = await req.formData();
    const file = formData.get("file");
    const workbook = new ExcelJS.Workbook();
    try {

        const binary = await file.arrayBuffer();
        await workbook.xlsx.load(binary);
        const worksheets = workbook.worksheets;

        const results = {};

        worksheets.forEach(worksheet => {
            const jsonData = [];

            let headers = [];
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber === 1) {
                    headers = row.values.slice(1);
                } else {
                    const rowData = {};
                    // row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    //     rowData[headers[colNumber - 1]] = cell.value;
                    // });
                    // jsonData.push(rowData);
                    headers.forEach((header, index) => {
                        const cell = row.getCell(index + 1).value;
                        rowData[header] = cell?.text || cell;
                    });
                    jsonData.push(rowData);
                }
            });

            results[worksheet.name] = jsonData;
        });

        return NextResponse.json({ message: "File received", results }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

}