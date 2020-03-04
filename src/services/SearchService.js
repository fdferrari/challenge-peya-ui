import * as http from './AxiosFactory';

const SearchService = {
    search: (country, lat, lng) => {
        return http.get('search', {country, lat, lng});
    }
}

export default SearchService;