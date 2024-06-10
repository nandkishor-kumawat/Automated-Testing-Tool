import * as XLSX from 'xlsx';

export const excelToJson = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        resolve(json);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
});

export const loginUser = async (email, password) => {
    if (!email || !password) return null
    return fetch("https://propvivo-nonprod-auth-api.azurewebsites.net/api/v1/login", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "rememberMe": true,
            "userName": email
        })
    }).then(res => res.json());
}