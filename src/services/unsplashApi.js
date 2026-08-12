import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.unsplash.com',
    params: {
        client_id: 'M-j-RFLmU6ttgo9rdqJleFHFoXb8WxiLOT15xAM4Dss',
    },
})

export const fetchFeed = async (numberPhotos, parametro) => {
    const response = await api.get('/search/photos', {
        params: {
            query: parametro,
            per_page: numberPhotos,
            orientation: 'squarish',
        },
    })

    return response.data.results
}

export const fetchUsuario = async (username) => {
    const response = await api.get(`/users/${username}`)

    return response.data
}

export default api
