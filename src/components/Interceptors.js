import axios from 'axios'

const cocktailFetch = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

// Add a request interceptor
cocktailFetch.interceptors.request.use((request) => {
    request.headers.common['Accept'] = 'application/json'
    // console.log('request sent');
    return request;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
cocktailFetch.interceptors.response.use(function (response) {
    // console.log('get response from api');
    return response;
  }, function (error) {
    console.error(error.response);
    return Promise.reject(error);
  });

export default cocktailFetch;