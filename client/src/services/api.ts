import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/' : '/';

export default axios.create({
  baseURL: baseURL + 'api',
});
