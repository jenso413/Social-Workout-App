const API_URL = '/api/posts/'

const createPost = async (postData, token) => {

    const apiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({content: postData})
    })
    
    const response = await apiResponse.json()

    if (!response) {
        console.log('error')
    }

    return response
}

export const postService = {
    createPost,
}