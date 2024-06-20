import { NextResponse } from "next/server";
import * as XLSX from 'xlsx';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async (req) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const binary = await file.arrayBuffer();

        const workbook = XLSX.read(binary, { type: "array" });

        const results = {};
        workbook.SheetNames.forEach(sheetName => {
            const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (roa.length) {
                results[sheetName] = roa.map((r) =>
                    Object.entries(r).reduce((acc, [key, value]) => {
                        acc[key] = String(value);
                        return acc;
                    }, {})
                );
            }
        });

        return NextResponse.json({ message: "File received", results }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to process file" }, { status: 400 });
    }
}

export const GET = async (req) => {
    return NextResponse.json({ message: "Hello" }, { status: 200 });
}
