const apiUrl = 'http://192.168.43.77:3000/api'

const checkResponseError = response =>
    (response.status >= 200 && response.status < 300) ?
        Promise.resolve(response) :
        Promise.reject(new Error(response.statusText || response.status))

export const fetchData = (time = 2, unit = 'seconds') =>
    fetch(`${apiUrl}/sensor/ambient/last/${time}/${unit}`)
        .then(checkResponseError)
        .then(response => response.json())
        .then(data => data.forEach(data => data.time = new Date(data.time)) || data)

export const fetchUserData = () =>
    fetch(`${apiUrl}/users`)
        .then(checkResponseError)
        .then(response => response.json())