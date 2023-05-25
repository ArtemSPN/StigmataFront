import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import axios from 'axios';

export const $api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});
