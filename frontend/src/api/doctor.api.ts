const BASE_URL = 'http://localhost:8080';

export async function getDoctors() {
    const response = await fetch(`${BASE_URL}/api/doctor`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function getDoctor(id: string) {
    const response = await fetch(`${BASE_URL}/api/doctor/${id}`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function deleteDoctor(id: string) {
    const response = await fetch(`${BASE_URL}/api/doctor/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}
