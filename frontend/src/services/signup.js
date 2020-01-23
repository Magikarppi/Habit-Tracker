const baseUrl = '/api/users'

export const signup = async (data) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  return response.json()
}
