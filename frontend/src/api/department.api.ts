const BASE_URL = 'http://localhost:8080';


export const getDepartments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/department`, { credentials: 'include' });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const getDepartment = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/department/${id}`, { credentials: 'include' });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
