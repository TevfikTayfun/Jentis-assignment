import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Config, randomMail } from '../../../utils';

describe('Deleting a user profile - DELETE', () => {
    const url = `${Config.baseUrl}/users/me`;

    it('SUCCESS - Deleting the profile - Executing it', async () => {
        // We simply get our information using axios with simple get usage.
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);

        // adding the user again in order to continue testing
        const data = {
            firstName: Config.firstName,
            lastName: Config.lastName,
            email: Config.email,
            password: Config.password,
        };
        const addUrl = `${Config.baseUrl}/users`;
        const addResponse = await axios.post(addUrl, data);

        expect(addResponse.status).toBe(HttpStatus.CREATED);
    });
});
