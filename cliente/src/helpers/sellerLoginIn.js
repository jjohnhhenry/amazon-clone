import { getToken } from './token';

const sellerLoginIn = () => {
    
    const token = getToken();

    if (token) return true;

    if (!token) return false;
}

export default sellerLoginIn;