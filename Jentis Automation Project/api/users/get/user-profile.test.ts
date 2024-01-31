import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Config } from '../../../utils';

describe('Getting a user profile - GET', () => {
    const url = `${Config.baseUrl}/users/me`;

    it('SUCCESS - Getting the profile - Executing it', async () => {
        // We simply get our information using axios with simple get usage.
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });

        // expecting it to return the correct status with our id information in it.
        // Data expectation(status data id we can check everything) can be varied if needed.
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.data._id).toBeDefined();
    });
});
