import axios from 'axios';

export const ApiClient = {
  login: (email, password) => axios.post('/user', {email, password}),
  register: (email, password) => axios.post('/user', {email, password}),
  homeProducts: () => axios.get('/products/home'),
  productsAll: () => axios.get('/products/all'),
  addImage: ({url, caption, date, userId}) => axios.post('/image',{url, caption, date, userId}),
  getImage: (() => axios.get('/image/:id')),
  deleteImage: (()=> axios.delete('/image/:id')),
  updateImage: ({url, caption, userId}) => axios.put('/image/:id', {url, caption}),
  search: (item) => {
    console.log('apiclient: ', item);
    return axios.post('/products/search', {search: item})
  }
}
