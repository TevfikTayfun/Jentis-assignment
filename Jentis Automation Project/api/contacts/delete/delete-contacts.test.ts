import axios, { AxiosError } from 'axios';
import { HttpStatus } from '@nestjs/common';
import { Config, ExampleContact } from '../../../utils';

describe('DELETE Contacts - DELETE', () => {
    const url = `${Config.baseUrl}/contacts`;

    it('SUCCESS - Delete the contact via correct contactId', async () => {
        // Get all the contacts first
        const contactsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });

        // Store contact Id
        if (contactsResponse.data.length > 0) {

            let contactId = contactsResponse.data[0]._id;
            let name = contactId.firstName;
            const contactUrl = `${Config.baseUrl}/contacts/${contactId}`;

            // Use contact Id to update the data that exists
            const response = await axios.delete(contactUrl, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });

            expect(response.status).toBe(HttpStatus.OK);

            // Final control to get contact again with id to control if it's been deleted.
            const contactsLastResponse = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });

            // Controlling that id does not exist anymore.
            expect(contactsLastResponse.data[0]._id).not.toEqual(contactId);
        }
        else{
            throw Error('Please add a new contact in order to delete it');
        }
    });

    it('FAIL - Invalid contactId', async () => {
        const contactUrl = `${Config.baseUrl}/contacts/${Config.dummyData}`;
        // Entering invalid contactId to see if it's resulting in an error
        try {
            const response = await axios.put(contactUrl, '', {
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
