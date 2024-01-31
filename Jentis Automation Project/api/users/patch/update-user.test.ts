import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Config, ExampleContact } from '../../../utils';

describe('Update user profile - PATCH', () => {
    const url = `${Config.baseUrl}/users/me`;
    it('SUCCESS - Updating the profile with different ', async () => {

        const data = {
            firstName: ExampleContact.firstName,
            lastName: ExampleContact.lastName
        };
        const response = await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.data.firstName).toEqual(ExampleContact.firstName);
        expect(response.data.lastName).toEqual(ExampleContact.lastName);

        //Getting the data for the last time to make sure it's accurate
        const getResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
        expect(getResponse.data.firstName).toEqual(response.data.firstName);
    });
});

