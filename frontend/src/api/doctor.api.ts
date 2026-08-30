const BASE_URL = 'http://localhost:8080';

export async function getDoctors() {
  try {
    const response = await fetch(`${BASE_URL}/api/doctor`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
