import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })
}

const update = (person, id) => {
  const request = axios.put(`${baseUrl}/${id}`, person)
  return request.then(response => {
    return response.data
  })
}

const remove = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`, { person })
  return request.then(response => {
    console.log(`after removing ${person.id} response data returns: ${response}`)
    return response.data
  })

}

export default { getAll, create, update, remove }