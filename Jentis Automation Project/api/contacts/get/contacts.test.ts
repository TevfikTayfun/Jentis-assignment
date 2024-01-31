import axios from 'axios';
import { HttpStatus } from '@nestjs/common';
import { Config } from '../../../utils';

describe('Getting contacts - GET', () => {
    const url = `${Config.baseUrl}/contacts`;

    // Since this endpoint doesn't have any variables, we can just trigger it with our token and see the result and data
    it('SUCCESS - Get Contacts via true token', async () => {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });

        expect(response.status).toBe(HttpStatus.OK);
    });
});
