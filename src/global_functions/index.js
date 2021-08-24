import axios from 'axios'

const functions = {
    doRequest: function(baseUrl, endpoint, method = 'get', headers = null, data = null) {
        const options = {
            baseURL: baseUrl,
            url: endpoint,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if( headers ) options.headers = { ...options.headers, ...headers };
        if( data && Object.keys(data).length ) {
            let key = 'params';
            if( method === 'post' ) key = 'data';
            options[key] = { ...data };
        }
        return axios(options);
    }
};

export default functions;