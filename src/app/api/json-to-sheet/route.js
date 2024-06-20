import { NextResponse } from "next/server";
import * as XLSX from 'xlsx';

export const POST = async (req) => {
    const body = await req.json();
    const { data } = body;

    const workbook = XLSX.utils.book_new();

    Object.entries(data).forEach(([key, value]) => {
        const worksheet = XLSX.utils.json_to_sheet(value);
        XLSX.utils.book_append_sheet(workbook, worksheet, key);
    })

    return NextResponse.json({ workbook: workbook });
}