import axios, { AxiosError } from 'axios';
import { HttpStatus } from '@nestjs/common';
import { Config } from '../../../utils';

describe('Getting a specific contact - GET', () => {
    const url = `${Config.baseUrl}/contacts`;

    it('SUCCESS - Getting the contact via correct contactId', async () => {
        // Get all the contacts first
        const contactsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });

        if (contactsResponse.data.length > 0) {
            // Store contact Id
            let contactId = contactsResponse.data[0]._id;

            const contactUrl = `${Config.baseUrl}/contacts/${contactId}`;

            // Use contact Id to get the data that exists
            const response = await axios.get(contactUrl, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });

            expect(response.status).toBe(HttpStatus.OK);
            console.log(response.data);
        } else {
            console.log('No contacts found, add contacts to control is properly');
        }
    });


    it('FAIL - Invalid contactId', async () => {
        const contactUrl = `${Config.baseUrl}/contacts/${Config.dummyData}`;

        // Entering invalid contactId to see if it's resulting in an error
        try {
            const response = await axios.get(contactUrl, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
            }
        }
    });
});
