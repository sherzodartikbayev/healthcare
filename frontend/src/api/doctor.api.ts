import type {CreateDoctorInput, UpdateDoctorInput} from "../types/doctor.type.ts";

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

export async function createDoctor(doctor: CreateDoctorInput) {
    const response = await fetch(`${BASE_URL}/api/doctor`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(doctor),
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function updateDoctor(id: string, doctor: UpdateDoctorInput) {
    const response = await fetch(`${BASE_URL}/api/doctor/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(doctor),
    })
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
