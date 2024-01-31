import puppeteer from 'puppeteer';
import { Config, randomMail, loginPage, signUpPage, addContactPage, editContactPage, deleteContactPage } from '../utils';

describe('Frontend Regression', () => {
    // @ts-ignore
    // I have left console logs in order to make tracking easier. Can be deleted if needed.
    it('Regression test', async () => {
        const mail = randomMail();
        const browser = await puppeteer.launch({
            args: ['--start-maximized'],
            headless: false,
        });
        const page = await browser.newPage();
        const password = Config.dummyPassword;
        await page.goto('https://thinking-tester-contact-list.herokuapp.com');

        await signUpPage(page, Config.firstName, Config.lastName, mail, password);
        await loginPage(page, mail, password);

        for (let i = 0; i < 2; i++) {
            await addContactPage(page, Config.firstName, Config.lastName);
        }

        await editContactPage(page, Config.firstName, Config.dummyData);
        await deleteContactPage(page);
        await browser.close();
    });
});
