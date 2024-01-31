import axios, { AxiosError } from 'axios';
import { HttpStatus } from '@nestjs/common';
import { Config, ExampleContact } from '../../../utils';

describe('Update Contacts - PATCH', () => {
    const url = `${Config.baseUrl}/contacts`;


    it('SUCCESS - Getting the contact via correct contactId and Updating them', async () => {
        // Get all the contacts first
        const contactsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });

        // Check if contacts array is not empty
        if (contactsResponse.data.length > 0) {
            // Store contact id
            let contactId = contactsResponse.data[0]._id;
            const contactUrl = `${Config.baseUrl}/contacts/${contactId}`;

            const patchData = {
                // firstname can be updated and controlled too if needed.
                // firstName: Config.firstName,
                lastName: Config.lastName,
            };

            // Use contact id to update the data that exists
            const response = await axios.patch(contactUrl, patchData, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });

            expect(response.status).toBe(HttpStatus.OK);

            // Final control to get contact again with id to control if it's been updated.
            const contactsLastResponse = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });

            expect(contactsLastResponse.data[0].lastName).toBe(patchData.lastName);
        } else {
            throw new Error('No contacts found, add contacts to control is properly');
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
