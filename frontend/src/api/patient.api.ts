import type {UpdatePatientInput} from "../types/patient.type.ts";

const BASE_URL = 'http://localhost:8080';

export async function getPatients() {
  try {
    const response = await fetch(`${BASE_URL}/api/patient`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePatient(id: string, data: UpdatePatientInput) {
  try {
    const response = await fetch(`${BASE_URL}/api/patient/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePatient(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/patient/${id}`, {
      method: "DELETE",
      credentials: 'include'
    })
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const result = await response.json();
    return result;
  }catch (error) {
    console.log(error);
  }
}
