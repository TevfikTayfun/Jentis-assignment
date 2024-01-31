import { ExampleContact, randomMail } from './config';
import { Page, ElementHandle } from 'puppeteer';

const loginPage = async (page: Page, email: string, password: string) => {
    await page.type('#email', email);
    await page.type('#password', password);
    await page.click('#submit');
    await page.waitForNavigation();
};

const signUpPage = async (page: Page, firstName: string, lastName: string, email: string, password: string) => {
    await page.click('#signup');
    await page.waitForTimeout(2000);
    await page.type('#firstName', firstName);
    await page.type('#lastName', lastName);
    await page.type('#email', email);
    await page.type('#password', password);
    await page.click('#submit');
    await page.waitForNavigation();
    await page.click('#logout');
    await page.waitForNavigation();
};

const addContactPage = async (page: Page, firstName: string, lastName: string) => {
    await page.click('#add-contact');
    await page.waitForTimeout(2000);
    await page.type('#firstName', firstName);
    await page.type('#lastName', lastName);
    await page.click('#submit');
    await page.waitForNavigation();
};

const editContactPage = async (page: Page, firstName: string, lastName: string) => {
    await page.waitForTimeout(2000);
    const firstXPath = "//tr[@class='contactTableBodyRow'][1]";
    const firstElements = await page.$x(firstXPath);
    const firstElement = firstElements[0] as ElementHandle;
    await firstElement.click();
    await page.waitForTimeout(2000);
    await page.click('#edit-contact');
    await page.waitForTimeout(2000);
    await clearInputField(page, '#firstName', firstName);
    await page.type('#firstName', ExampleContact.firstName);
    await page.click('#submit');
};

const deleteContactPage = async (page: Page) => {
    await page.waitForTimeout(2000);
    page.on('dialog', async dialog => {
        if(dialog.message().includes('delete this contact')) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    });
    await page.click('#delete');
};

const clearInputField = async (page: Page, selector: string, firstName: string) => {
    await page.focus(selector);
    for (let i = 0; i < firstName.length; i++) {
        await page.keyboard.press('Backspace');
    }
};

export { loginPage, signUpPage, addContactPage, editContactPage, deleteContactPage };
