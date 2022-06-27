import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/auth/'

// Register user
const register = async (userData) => {

    const response = await axios.post(API_URL + 'register', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } else {
        console.log('error') 
    }

    return response.data
}

// Login user
const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data)
    } else {
        console.log('error') 
    }

    return response.data
}

// Logout user 
const logout = () => {
    localStorage.removeItem('user')
}

const updateCommunity = async (userData) => {

    const { userId, programName } = userData

    const response = await axios.patch(`/api/auth/user/${userId}`, {programName : programName})

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    } else {
        console.log('Error, cannot join community')
    }
}

// Add friend
const addFriend = async (ids) => {
    const { myId, friendId } = ids

    const response = await axios.post('/api/auth/friend', {myId, friendId})

    if (response.data) {
        console.log('successful response')
    } else {
        console.log('failure')
    }
}

const authService = {
    register,
    updateCommunity,
    addFriend,
    login,
    logout
}

export default authService;