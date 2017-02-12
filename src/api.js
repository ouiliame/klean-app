// Super lightweight wrapper functions around klean api until we get
// something more solid.

import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV !== 'production') {
  baseURL = "http://localhost:1337/"; // development API server
} else {
  baseURL = "/"; // production API server (usually hosted on same server)
}

export default axios.create({
  baseURL
});
