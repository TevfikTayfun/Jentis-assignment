import { HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Config, ExampleContact} from '../../../utils';

describe('Adding contacts - POST', () => {
    const url = `${Config.baseUrl}/contacts`;
    it('SUCCESS - Adding contacts with all correct values', async () => {

        const response = await axios.post(url, ExampleContact, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
        expect(response.status).toBe(HttpStatus.CREATED);
    });
    it('FAIL - Mandatory firstName and lastName controls', async () => {
        const noFirstNameData = {
            lastName: ExampleContact.lastName,
            birthdate: ExampleContact.birthdate,
            email: ExampleContact.email
        };
        const noLastNameData = {
            firstName: ExampleContact.firstName,
            birthdate: ExampleContact.birthdate,
            email: ExampleContact.email
        };
        try {
            const firstNameResponse = await axios.post(url, noFirstNameData, {
        headers: {
            Authorization: `Bearer ${Config.authToken}`,
            },
        });
        }
        catch(error)
        {
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.firstName.message).toBeDefined();
            }
        }

        try {
            const lastNameResponse = await axios.post(url, noLastNameData, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });
        }
        catch(error)
        {
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.lastName.message).toBeDefined();
            }
        }
    });

    it('FAIL - Invalid birthdate', async () => {
        const data = {
            lastName: ExampleContact.lastName,
            email: ExampleContact.email,
            birthdate: Config.invalidBirthday,
        };
    try{
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${Config.authToken}`,
            },
        });
    } catch(error){
        if(error instanceof AxiosError){
            expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
            expect(error.response?.data.errors.birthdate.message).toBeDefined();
        }
    }
    });

    it('FAIL - Invalid email', async () => {
        const data = {
            firstName: ExampleContact.firstName,
            lastName: ExampleContact.lastName,
            email: Config.dummyData,
        };
        try{
            const lastNameResponse = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });
        } catch(error){
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.email.message).toBeDefined();
            }
        }
    });
    it('FAIL - Invalid phone number', async () => {
        const data = {
            firstName: ExampleContact.firstName,
            lastName: ExampleContact.lastName,
            phone: Config.dummyData
        };
        try{
            const lastNameResponse = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });
        } catch(error){
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.phone.message).toBeDefined();
            }
        }
    });
    it('FAIL - Invalid postal code', async () => {
        const data = {
            firstName: ExampleContact.firstName,
            lastName: ExampleContact.lastName,
            postalCode: Config.dummyData,
        };
        try{
            const lastNameResponse = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });
        } catch(error){
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.postalCode.message).toBeDefined();
            }
        }
    });

    it('FAIL - Longer than maximum allowed length', async () => {
        const data = {
            firstName: ExampleContact.firstName,
            lastName: ExampleContact.lastName,
            postalCode: Config.dummyData + Config.dummyData + Config.dummyData,
        };
        try{
            const lastNameResponse = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${Config.authToken}`,
                },
            });
        } catch(error){
            if(error instanceof AxiosError){
                expect(error.response?.status).toBe(HttpStatus.BAD_REQUEST);
                expect(error.response?.data.errors.postalCode.message).toBeDefined();
            }
        }
    });
});
