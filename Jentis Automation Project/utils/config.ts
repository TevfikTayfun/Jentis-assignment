// Storing all the information we might need it in the future here to get it organized
// if needed, all of these configs can be automated with random values
const Config = {
    dummyStartDate: '2022.05.05',
    dummyEndDate: '2023.10.05',
    dummyData: 'asfosdjıfsdfs',
    dummyPassword: 'password123!',
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    firstName: 'TesterFirstName',
    lastName: 'TesterLastName',
    // before the test, the tester needs to edit this e-mail since we can't create more users with the same e-mail
    email: 'testtest@example.com',
    password: 'test2PassworddD',
    authToken: process.env.AUTH_TOKEN,
    invalidBirthday: '21432324',
};

const ExampleContact = {
    firstName: 'Amy',
    lastName: 'Miller',
    birthdate: '1992-02-02',
    email: 'amiller@fake.com',
    phone: '8005554242',
    street1: '13 School St.',
    street2: 'Apt. 5',
    city: 'Washington',
    stateProvince: 'QC',
    postalCode: 'A1A1A1',
    country: 'Canada',
};

function randomMail(): string {
    const randomString = Math.random().toString(10).substring(2, 10);
    const email = `${randomString}@example.com`;
    return email;
}

export { Config, ExampleContact, randomMail };
