export async function getDashboardData() {
  try {
    const response = await fetch('http://localhost:8080/api/admin/dashboard');
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
