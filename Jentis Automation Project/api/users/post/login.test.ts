import { HttpStatus } from '@nestjs/common';
import axios, {AxiosError} from 'axios';
import { Config } from '../../../utils';

describe('Login', () => {
    const url = `${Config.baseUrl}/users/login`;
    it('SUCCESS - Logging in with the user created before', async () => {
        const data = {
            email: Config.email,
            password: Config.password
        };
        const response = await axios.post(url, data);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.data.user).toBeDefined();
    });
    it('FAIL - Trying to login with wrong credentials', async() => {
        //since there is no e-mail check here we don't have to do any more tests.
       const wrongData = {
           email: Config.dummyData,
           password: Config.dummyData,
       }
        try{
            const response = await axios.post(url,wrongData);
        }
        catch(error)
        {
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.UNAUTHORIZED);
            }
        }
    });
});

