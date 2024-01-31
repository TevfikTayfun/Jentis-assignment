import axios, { AxiosError } from 'axios';
import { HttpStatus } from '@nestjs/common';
import { Config, ExampleContact, randomMail } from '../../utils';

describe('End to end test', () => {
    // Declare variables for use across test cases
    let token: string;
    const newEmail: string = randomMail();
    let contactId: string;

    it('SUCCESS - Successfully adding the chosen user in order to get the token', async () => {
        const url = `${Config.baseUrl}/users`;
        const data = {
            firstName: Config.firstName,
            lastName: Config.lastName,
            email: newEmail,
            password: Config.password,
        };
        const response = await axios.post(url, data);
        expect(response.status).toBe(HttpStatus.CREATED);
        token = response.data.token;
    });

    it('SUCCESS - Logging in', async () => {
        const url = `${Config.baseUrl}/users/login`;
        const data = {
            email: newEmail,
            password: Config.password,
        };

        const response = await axios.post(url, data);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.data.user).toBeDefined();
    });

    it('SUCCESS - Getting the user profile', async () => {
        const url = `${Config.baseUrl}/users/me`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
    });

    it('SUCCESS - Updating the user profile', async () => {
        const url = `${Config.baseUrl}/users/me`;
        const data = {
            firstName: ExampleContact.firstName,
            lastName: ExampleContact.lastName,
        };

        const response = await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.data.firstName).toEqual(ExampleContact.firstName);
        expect(response.data.lastName).toEqual(ExampleContact.lastName);
    });

    it('SUCCESS - Get Contacts', async () => {
        const url = `${Config.baseUrl}/contacts`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
    });

    it('SUCCESS - Adding contact', async () => {
        const url = `${Config.baseUrl}/contacts`;
        const response = await axios.post(url, ExampleContact, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(HttpStatus.CREATED);
    });

    // since patch and put basically does the same thing but with put is more capable we are using this in our end-to-end
    it('SUCCESS - Getting the contact via correct contactId', async () => {
        const url = `${Config.baseUrl}/contacts`;
        // get all the contacts first
        const contactsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        contactId = contactsResponse.data[0]._id;
        const contactUrl = `${Config.baseUrl}/contacts/${contactId}`;
        const response = await axios.put(contactUrl, ExampleContact, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
        const contactsLastResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(contactsLastResponse.data[0].firstName).toBe(ExampleContact.firstName);
        expect(contactsLastResponse.data[0].lastName).toBe(ExampleContact.lastName);
    });

    it('SUCCESS - Delete the contact', async () => {
        const url = `${Config.baseUrl}/contacts`;
        const contactsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        contactId = contactsResponse.data[0]._id;
        let name = contactsResponse.data[0].firstName;
        const contactUrl = `${Config.baseUrl}/contacts/${contactId}`;
        const response = await axios.delete(contactUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);

        // final control to get contact again with id to control if it's been deleted.
        const contactsLastResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    });

    it('SUCCESS - Final - delete user', async () => {
        const url = `${Config.baseUrl}/users/me`;
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(HttpStatus.OK);
    });

    it('FAIL! - Trying to login after user deletion', async () => {
        const url = `${Config.baseUrl}/users/login`;
        const data = {
            email: newEmail,
            password: Config.password,
        };
        try {
            const response = await axios.post(url, data);
        } catch (error) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(HttpStatus.UNAUTHORIZED);
            }
        }
    });
});
