import axios from 'axios'

const URL = ''

export const createPost = async (post) => {
    try {
        return await axios.post(`${URL}/create`, post)
    } catch(error) {
        console.log('error while calling the createPost api: ', error)
    }
}
export const getAllPosts = async (params) => {
    try {
        let response = await axios.get(`${URL}/posts${params}`)
        return response.data
    } catch(error) {
        console.log('Error while getting all the posts: ', error)
    }
}
export const getPostDetail = async (id) => {
    try {
        let response = await axios.get(`${URL}/detail/${id}`)
        return response.data
    } catch(error) {
        console.log('Error while getting post detail: ', error)
    }
}
export const updatePost = async (id, post) => {
    try {
        return await axios.post(`${URL}/update/${id}`, post)
    } catch(error) {
        console.log('Error while calling the updatePost api: ', error)
    }
}
export const deletePost = async (id) => {
    try {
        return await axios.post(`${URL}/delete/${id}`)
    } catch(error) {
        console.log('Error while calling the delete api ', error)
    }
}
export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${URL}/file/upload`, data)
        return response
    } catch(error) {
        console.log('Error while uploading the error ', error)
    }
}

export const newComment = async (data) => {
    try {
        return await axios.post(`${URL}/comments/new`, data)
    } catch(error) {
        console.log('Error while posting a new Comment ', error)
    }
}

export const getComments = async (id) => {
    try {
        let response = await axios.get(`${URL}/comments/${id}`)
        return response.data
    } catch(error) {
        console.log('Error while getting all comments ', error)
    }
}

export const deleteComment = async (id) => {
    try {
        return await axios.post(`${URL}/comments/delete/${id}`)
    } catch(error) {
        console.log('Error while deleting the comment ', error)
    }
}

export const newUser = async (post) => {
    console.log(post)
    try {
        return await axios.post(`${URL}/user/signup`, post)
    } catch(error) {
        console.log('error while calling the signup api: ', error)
    }
}

export const getUser = async (post) => {
    console.log(post)
    try {
        return await axios.post(`${URL}/user/signin`, post)
    } catch(error) {
        console.log('Error while logging in ', error)
    }
}