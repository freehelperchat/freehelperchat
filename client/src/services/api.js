import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api';

export default axios.create({
  baseURL,
});
