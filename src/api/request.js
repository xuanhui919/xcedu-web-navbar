import { getToken } from '@/utils/token'

// create an axios instance
const instance = axios.create({
  /**
     * `baseURL` will be prepended to `url` unless `url` is absolute. It can be convenient to set `baseURL` for an instance of axios pass relative URLs to methods of that instance.
     */
  baseURL: process.env.WEB_REQUEST_BASE_URL,

  /**
     *
     */
  headers: {
    'Content-Type': 'application/json'
  },

  /**
     * `transformRequest` allows changes to the request data before it is sent to the server This is only applicable for request methods 'PUT', 'POST', and 'PATCH' The last function in the array must return a string or an instance of Buffer, ArrayBuffer, FormData or Stream
     */
  transformRequest: [function transformRequest (data) {
    // Do whatever you want to transform the data
    // return JSON.stringify(data)
    return JSON.stringify(data)
  }],

  /**
     * `transformResponse` allows changes to the response data to be made before it is passed to then/catch
     */
  transformResponse: [function transformResponse (data) {
    // Do whatever you want to transform the data
    return data
  }],

  /**
     * `responseType` indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
     */
  responseType: 'json'
})

instance.interceptors.request.use(config => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default instance
