import axios from 'axios';
import environment from '../environment/environment';

const httpOptions = () => ({
  headers: {
    'x-access-token': localStorage.getItem('token') || 'x-access-token',
    'Content-Type': 'application/json',
  },
});
const apiUrl = `${environment.apiUrl}${environment.prefix}`;

const httpServices = {
  post: async (url, body) => axios.post(`${apiUrl}${url}`, body, httpOptions()),
  get: async (url) => axios.get(`${apiUrl}${url}`, httpOptions()),
  delete: async (url) => axios.delete(`${apiUrl}${url}`, httpOptions()),
  put: async (url, body) => axios.put(`${apiUrl}${url}`, body, httpOptions()),
};

export default httpServices;
