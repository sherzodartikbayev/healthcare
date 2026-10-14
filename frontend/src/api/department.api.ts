const BASE_URL = 'http://localhost:8080';

export const getDepartments = async () => {
    const response = await fetch(`${BASE_URL}/api/department`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export const getDepartment = async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/department/${id}`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}
