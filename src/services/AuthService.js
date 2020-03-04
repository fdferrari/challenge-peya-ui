import * as http from './AxiosFactory';

const TOKEN_KEY = 'x-access-token';

const AuthService = {
    checkSession: () => {
        return http.get('user');
    },
    login: (username, password) => {
        const data = {
            username, password
        }
        return http.post('login', data);
    },
    logout : () => {
            return http.get('logout');
    },
    addAuthorizationToken: (token) =>{
        http.addHeader(TOKEN_KEY, token);
    }
}

export default AuthService;

