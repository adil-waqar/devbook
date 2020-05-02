import Axios from 'axios';

export default (token) => {
  Axios.defaults.headers.common['x-auth-token'] = token;
};
