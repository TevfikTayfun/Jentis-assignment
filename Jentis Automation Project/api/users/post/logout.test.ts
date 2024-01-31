import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Config } from '../../../utils';

describe('Logout - POST', () => {
    const url = `${Config.baseUrl}/users/logout`;
    it('SUCCESS - Logging out successfully', async () => {
        // It seems like we can only check if it's logged out properly. Hence we can only do simple execution.
        const response = await axios.post(url, '', {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
    });
});

