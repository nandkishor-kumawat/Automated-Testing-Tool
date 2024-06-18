import * as XLSX from 'xlsx';

export const excelToJson = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const results = {};
        workbook.SheetNames.forEach(sheetName => {
            const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (roa.length)
                results[sheetName] = roa.map((r) => Object.entries(r).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {}));
        })
        resolve(results);
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "password": password,
            "rememberMe": true,
            "userName": email
        })
    }).then(res => res.json());
}


export const fetchQuery = async (url, body) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1YjAzOWQyLTkyNmYtNGM1Yi1iMmEwLTkzYzExOGY4YjNlMSIsInVuaXF1ZV9uYW1lIjoiU3VwZXIgQWRtaW4iLCJlbWFpbCI6InN1cGVyYWRtaW5AcHJvcHZpdm8uY29tIiwiZ2l2ZW5fbmFtZSI6IlN1cGVyIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsIkxlZ2FsRW50aXR5SWQiOiJTeXN0ZW0uTGlucS5FbnVtZXJhYmxlK1NlbGVjdExpc3RJdGVyYXRvcmAyW1Byb3BWaXZvX0NvcmUuRW50aXRpZXMuQ29yZS5Vc2VyTGVnYWxFbnRpdHlSb2xlLFN5c3RlbS5TdHJpbmddIiwiTGVnYWxFbnRpdHlVbml0SWQiOiJTeXN0ZW0uTGlucS5FbnVtZXJhYmxlK1NlbGVjdEVudW1lcmFibGVJdGVyYXRvcmAyW1Byb3BWaXZvX0NvcmUuRW50aXRpZXMuQ29yZS5Vc2VyVW5pdFJvbGUsU3lzdGVtLlN0cmluZ10iLCJQcm9wZXJ0eUlkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RFbnVtZXJhYmxlSXRlcmF0b3JgMltQcm9wVml2b19Db3JlLkVudGl0aWVzLkNvcmUuVW5pdFJvbGVQcm9maWxlLFN5c3RlbS5TdHJpbmddIiwibmJmIjoxNzE4NTk3NTMwLCJleHAiOjE3MjExODk1MzAsImlhdCI6MTcxODU5NzUzMH0.tIdwnLIB6G7r7hQiS1YEVeecyf3dR5BkNaaBm0EvQig";
    return fetch(`https://localhost:7092${url}`, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then(res => res.json());
}