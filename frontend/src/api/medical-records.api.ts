const BASE_URL = 'http://localhost:8080/api';

export async function getMedicalRecord(patientId: string) {
  const response = await fetch(`${BASE_URL}/medical/patient/${patientId}`, {credentials: 'include'});
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

export async function deleteMedicalRecord(recordId: string) {
  const response = await fetch(`${BASE_URL}/medical/record/${recordId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}
