import { HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Config, randomMail } from '../../../utils';

describe('Adding a new User', () => {
    const url = `${Config.baseUrl}/users`;

    it('SUCCESS - Successfully adding the chosen user in order to get the token', async () => {
        const data = {
            firstName: Config.firstName,
            lastName: Config.lastName,
            // email needs to be updated in order to test this addUser method.
            // For now, it's only for testing functionality.
            // If needed, the user needs to just change the mail and test with new data.
            // That's why the e-mail is hard coded.
            //email: Config.email,
            email: randomMail(), //- Use this to create random users every time
            password: Config.password
        };
        const response = await axios.post(url, data);
        expect(response.status).toBe(HttpStatus.CREATED);
    });

    it('FAIL - Trying to add a user by making the password data too short', async () => {
        const data = {
            firstName: Config.firstName,
            lastName: Config.lastName,
            email: Config.email,
            password: 12
        };
        try {
            const response = await axios.post(url, data);
        } catch (error) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.password.name).toBe('ValidatorError');
            }
        }
    });

    it('FAIL - Wrong e-mail structure', async () => {
        const data = {
            firstName: Config.firstName,
            lastName: Config.lastName,
            email: Config.dummyData,
            password: Config.password
        };
        try {
            const response = await axios.post(url, data);
        } catch (error) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.email.message).toBe('Email is invalid');
            }
        }
    });

    it('FAIL - Trying to add an existing user', async () => {
        const data = {
            firstName: Config.firstName,
            lastName: Config.lastName,
            email: 'jentis11@example.com',
            password: Config.password
        };
        try {
            const response = await axios.post(url, data);
        } catch (error) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.message).toBe('Email address is already in use');
            }
        }
    });
});
