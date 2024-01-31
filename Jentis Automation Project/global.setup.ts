import axios from 'axios';
import { Config } from './utils';


// -- Important Note: If the main user gets deleted heading to jest.config, disabling Global Setup and running addUser
// test will create a new and user can activate GlobalSetup from jest.config again to continue testing --

module.exports = async function () {
    const getAuthToken = async () => {
        const { email, password } = Config;
        // in here we are declaring these variables and get them from config in order to get a permanent global token
        const data = {
            email,
            password,
        };
        const url = `${Config.baseUrl}/users/login`;
        const response = await axios.post(url, data);
        return response.data.token;
    };

    const newToken = await getAuthToken();

    process.env.AUTH_TOKEN = newToken;
};
