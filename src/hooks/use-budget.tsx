import { API } from "@/services/api"
import { FinancialAdvice } from "@/types";
import { useState } from "react";
import * as XLSX from 'xlsx';

export const useBudget = () => {
    const [advice, setAdvice] = useState<FinancialAdvice | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string>('');
    const [data, setData] = useState([]);

    const api = new API();

    const getBudgetAdvice = async (message: string) => {
        try {
            const response = await api.getBudgetAdvice(message);
            setAdvice(response);
        } catch (error) {
            throw error;
        }
    }
    const downloadBudgetSpreadsheet = async (message: string) => {
        try {
            const blob = await api.getBudgetSpreadsheetData(message);
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            // Convert Blob to ArrayBuffer for XLSX parsing
            const arrayBuffer = await blob.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            // Assume the data is in the first worksheet
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];

            // Convert worksheet to an array of arrays (header: 1 returns a 2D array)
            const jsonData = XLSX.utils.sheet_to_json<Array<any>>(worksheet, { header: 1 });

            // Map the plain data to the format expected by react-spreadsheet.
            // react-spreadsheet expects a 2D array of objects, e.g., { value: "cell value" }
            const spreadsheetData = jsonData.map(row => 
                row.map(cell => ({ value: cell }))
            );
            setData(spreadsheetData);
        } catch (error) {
            throw error;
        }
    }

    return {
        getBudgetAdvice,
        advice,
        setAdvice,
        downloadBudgetSpreadsheet,
        downloadUrl,
        sheetData: data,
        setSheetData: setData,
        setDownloadUrl
    }
}