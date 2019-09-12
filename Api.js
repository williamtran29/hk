import apisauce from 'apisauce'
const create = (baseURL = 'https://www.hongkongairport.com/flightinfo-rest/rest/') => {
  const apiBuilder = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 20000
  })
  const getFlights = (date) => apiBuilder.get(`flights/past?date=${date}&lang=en&cargo=false&arrival=false`)
  return {
    getFlights,
  }
}
const Api = create()
export default Api
