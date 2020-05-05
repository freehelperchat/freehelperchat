import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.10:3001/api'
    : '/api';

export default axios.create({
  baseURL,
});
