const baseUrl = '/api/users'

export const signup = async (data) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log('response', response)
    return response.json()  
  } catch (error) {
    console.log(error)
  }
}
