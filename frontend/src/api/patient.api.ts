import type {CreatePatientType, UpdatePatientInput} from "../types/patient.type.ts";

const BASE_URL = 'http://localhost:8080';

export async function getPatients() {
  const response = await fetch(`${BASE_URL}/api/patient`, {credentials: 'include'});
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

export async function getPatient(id: string) {
  const response = await fetch(`${BASE_URL}/api/patient/${id}`, {credentials: 'include'});
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

export async function createPatient(patient: CreatePatientType) {
  const response = await fetch(`${BASE_URL}/api/patient`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(patient)
  })
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const result = await response.json();
  return result;
}

export async function updatePatient(id: string, data: UpdatePatientInput) {
  const response = await fetch(`${BASE_URL}/api/patient/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const result = await response.json();
  return result;
}

export async function deletePatient(id: string) {
  const response = await fetch(`${BASE_URL}/api/patient/${id}`, {
    method: "DELETE",
    credentials: 'include'
  })
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const result = await response.json();
  return result;
}
