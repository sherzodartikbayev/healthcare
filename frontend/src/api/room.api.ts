const BASE_URL = 'http://localhost:8080'

export async function getRooms() {
  try {
     const response = await fetch(`${BASE_URL}/api/room`, {credentials: 'include'})
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
