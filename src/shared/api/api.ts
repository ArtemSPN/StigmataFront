import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { REACT_APP_API_URL } from '@/shared/const/url';
import axios from 'axios';

export const $api = axios.create({
    baseURL: `${REACT_APP_API_URL}`,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});
