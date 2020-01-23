const baseUrl = '/api/habits'

let token = null

export const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export const getAll = async () => {
  const response = await fetch(baseUrl)
  const responseData = await response.json()
  console.log('responseData', responseData)
  return responseData
}
