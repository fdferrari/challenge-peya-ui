import * as http from './AxiosFactory';

const AdminService = {
    changeTTL: (ttl) => {
        return http.put('user', {ttl});
    }
}

export default AdminService;