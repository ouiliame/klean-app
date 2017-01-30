// Super lightweight wrapper functions around klean api until we get
// something more solid.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337'
});

export default api;
