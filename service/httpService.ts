const onRequest = async <T>(
  endPoint: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data: any = '',
  next?: NextFetchRequestConfig,
  cookieHeader?: string,
): Promise<T> => {
  var headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (cookieHeader) headers.set('cookie', cookieHeader)
  const requestOptions: RequestInit = {
    method,
    headers,
    next,
  }

  if (method === 'POST' || method === 'PUT') {
    requestOptions.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${endPoint}`, requestOptions)

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    const responseData: T = await response.json()
    return responseData
  } catch (ex) {
    console.error(ex)
    throw new Error('Error while fetching data: ' + ex)
  }
}

export function http<T>(endPoint: string, next?: NextFetchRequestConfig,cookieHeader?:string) {
  return {
    post: (data: any = '') => onRequest<T>(endPoint, 'POST', data, next,cookieHeader),
    update: (data: any = '') => onRequest<T>(endPoint, 'PUT', data, next,cookieHeader),
    get: () => onRequest<T>(endPoint, 'GET', undefined, next,cookieHeader),
    delete: () => onRequest<T>(endPoint, 'DELETE', undefined, next,cookieHeader),
  }
}
