import axios from 'axios'


const instance = axios.create({
    baseURL : 'https://my-app-ec6b3-default-rtdb.firebaseio.com/'
})


export default instance