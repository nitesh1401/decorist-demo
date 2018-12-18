import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://decorist-dsp.appspot.com'
});

// instance.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('idToken')}`;
instance.defaults.withCredentials = true;

export default instance;
