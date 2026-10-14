import type {CreateDepartmentInput, UpdateDepartmentInput} from "../types/department.type.ts";

const BASE_URL = 'http://localhost:8080';

export async function getDepartments() {
    const response = await fetch(`${BASE_URL}/api/department`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function getDepartment(id: string) {
    const response = await fetch(`${BASE_URL}/api/department/${id}`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function createDepartment(department: CreateDepartmentInput) {
    const response = await fetch(`${BASE_URL}/api/department`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(department)
    })
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function updateDepartment(id: string, department: UpdateDepartmentInput) {
    const response = await fetch(`${BASE_URL}/api/department/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(department)
    })
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export async function deleteDepartment(id: string) {
    const response = await fetch(`${BASE_URL}/api/department/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}