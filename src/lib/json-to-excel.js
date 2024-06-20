import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

export const jsonToExcel = (data) => {
    const workbook = XLSX.utils.book_new();

    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'history') return;

        const sheetData = [];
        const merges = [];

        let currentRow = 0;

        sheetData.push([
            `Type`,
            `CreatedBy`,
            `CreatedOn`,
            `Status`,
            'Table Name',
            'Table Status'
        ]);

        value.forEach(entry => {

            const tableNames = entry.Tables.map(a => a.name);
            const tableStatus = entry.Tables.map(a => a.status);



            // merges.push(
            //     { s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 0 } },
            // );

            currentRow++;

            sheetData.push([
                `${entry.Type}`,
                `${entry.CreatedBy}`,
                `${entry.CreatedOn}`,
                `${entry.Status}`,
                tableNames[0],
                tableStatus[0]
            ]);

            // merges.push(
            //     { s: { r: currentRow, c: 0, }, e: { r: currentRow, c: 0 } },
            // );

            // currentRow++;

            entry.Tables.slice(1).forEach(table => {
                sheetData.push([
                    '', '', '', '',
                    `${table.name}`,
                    `${table.status}`
                ]);
                // merges.push(
                //     { s: { r: currentRow, c: 4 }, e: { r: currentRow, c: 4 } },
                // );
                // currentRow++;
            });

            // sheetData.push(['', '', '', '', 'Status', ...tableStatus]);
            // merges.push(
            //     { s: { r: currentRow, c: 4 }, e: { r: currentRow, c: 4 } },
            // );


            currentRow += 2;
            sheetData.push(...[[], []]);
            currentRow++;
        });

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.format_cell(worksheet['A1'], { bold: true });
        // worksheet['!merges'] = merges;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'History');
    });

    const fileName = `data-${dayjs().format("DDMMYYYY-HHmmss")}.xlsx`;
    console.log(fileName);

    XLSX.writeFile(workbook, fileName);
}

export const jsonToExcel2 = (data) => {
    const workbook = XLSX.utils.book_new();

    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'history') return;

        const sheetData = [];
        const merges = [];

        let currentRow = 0;


        value.forEach(entry => {

            const tableNames = entry.Tables.map(a => a.name);
            const tableStatus = entry.Tables.map(a => a.status);


            sheetData.push([
                `Type`,
                `CreatedBy`,
                `CreatedOn`,
                `Status`,
                'Tables',
            ]);

            merges.push(
                { s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 0 } },
                { s: { r: currentRow, c: 1 }, e: { r: currentRow, c: 1 } },
                { s: { r: currentRow, c: 2 }, e: { r: currentRow, c: 2 } },
                { s: { r: currentRow, c: 3 }, e: { r: currentRow, c: 3 } },
                { s: { r: currentRow, c: 4 }, e: { r: currentRow, c: 4 + tableNames.length } }
            );

            currentRow++;

            sheetData.push([
                `${entry.Type}`,
                `${entry.CreatedBy}`,
                `${entry.CreatedOn}`,
                `${entry.Status}`,
                "Table Name",
                ...tableNames
            ]);

            merges.push(
                { s: { r: currentRow, c: 0, }, e: { r: currentRow + 1, c: 0 } },
                { s: { r: currentRow, c: 1 }, e: { r: currentRow + 1, c: 1 } },
                { s: { r: currentRow, c: 2 }, e: { r: currentRow + 1, c: 2 } },
                { s: { r: currentRow, c: 3 }, e: { r: currentRow + 1, c: 3 } },
            );

            currentRow++;

            sheetData.push(['', '', '', '', 'Status', ...tableStatus]);
            merges.push(
                { s: { r: currentRow, c: 4 }, e: { r: currentRow, c: 4 } },
            );


            currentRow += 2;
            sheetData.push(...[[], []]);
            currentRow++;
        });

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.format_cell(worksheet['A1'], { bold: true });
        worksheet['!merges'] = merges;

        XLSX.utils.book_append_sheet(workbook, worksheet, 'History');
    });

    const fileName = `data-${dayjs().format("DDMMYYYY-HHmmss")}.xlsx`;
    console.log(fileName);

    XLSX.writeFile(workbook, fileName);
}
