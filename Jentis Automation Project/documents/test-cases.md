------TEST CASES FOR CONTACTS------

* Successful Test Case - Add Contact - Creating a contact:
* Precondition: Should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the credentials given.
{
"firstName": "John",
"lastName": "Doe",
"birthdate": "1970-01-01",
"email": "jdoe@fake.com",
"phone": "8005555555",
"street1": "1 Main St.",
"street2": "Apartment A",
"city": "Anytown",
"stateProvince": "KS",
"postalCode": "12345",
"country": "USA"
}
* -- Note: User should manipulate e-mail if the account already exists --
* Step 3. Execute the endpoint.

Expected Result: New contact should be created with 201 status code.

* Fail Test Case - Add Contact - Mandatory firstName field controls:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the credentials but delete the firstName.
* -- Note: User should manipulate e-mail if the account already exists --
* Step 3. Execute the endpoint.

Expected Result: New contact shouldn't be created and user should receive 400 Bad Request error code.
Error: "name": "ValidatorError",
"message": "Path `firstName` is required.",


* Fail Test Case - Add Contact - Mandatory lastName field controls:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the credentials but delete the lastName.
* -- Note: User should manipulate e-mail if the account already exists --
* Step 3. Execute the endpoint.

Expected Result: Contact shouldn't be created. 400 Bad Request.
Error:
"name": "ValidatorError",
"message": "Path `lastName` is required.",

* Fail Test Case - Add Contact - Invalid birthdate:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2.1. Enter the necessary credentials and to birthdate field enter random numbers.
* Step 2.2. Enter the necessary credentials and to birthdate field enter random letters.
* Step 3. Execute the endpoint.

Expected Result: In both cases contact shouldn't be created. 400 Bad Request.
Error should be seen like this
"name": "ValidatorError",
"message": "Birthdate is invalid",


* Fail Test Case - Add Contact - Invalid email:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2.1. Enter the necessary credentials and to email field enter random numbers.
* Step 2.2. Enter the necessary credentials and to email field enter random letters.
* Step 3. Execute the endpoint.

Expected Result: In both cases contact shouldn't be created. 400 Bad Request.
Error should be seen like this
"name": "ValidatorError",
"message": "email is invalid",


* Fail Test Case - Add Contact - Invalid phone number:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the necessary credentials and to email field enter random numbers.
* Step 3. Execute the endpoint.

Expected Result: In both cases contact shouldn't be created. 400 Bad Request.
Error should be seen like this
"name": "ValidatorError",
"message": "phone number is invalid",


* Fail Test Case - Add Contact - Invalid postalcode:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the necessary credentials and to email field enter random letters.
* Step 3. Execute the endpoint.

Expected Result: In both cases contact shouldn't be created. 400 Bad Request.
Error should be seen like this
"name": "ValidatorError",
"message": "postal code is invalid",


* Fail Test Case - Add Contact - Exceeding maximum amount of data:
* Precondition: User should have already logged in with a true token.
* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the necessary credentials and enter more than 20 characters to random field
* Step 3. Execute the endpoint.

Expected Result: In both cases contact shouldn't be created. 400 Bad Request.
Error should be seen like this
"name": "ValidatorError",
"message": "Path `...` (`...`) is longer than the maximum allowed length (20)."


* Success Test Case - Delete Contact - Delete contact: User should have already logged in with a true token.

* Precondition: Should have already logged in with a true token.

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the contact you want to delete
* Step 3. Execute the endpoint.

Expected Result: Contact should be deleted. 200 OK.

* Fail Test Case - Delete Contact - Delete contact: Invalid contactId.

* Precondition: Should have already logged in with a true token.

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter a random contactId that doesnt exist
* Step 3. Execute the endpoint.

Expected Result: Contact shouldn’t be deleted. 400 Bad Request.

* Success Test Case - Get Contacts - Get Contacts

* Precondition: Should have already logged in with a true token.

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Execute the endpoint.

Expected Result: Contacts should appear. 200 OK.


* Success Test Case - Get Contact by contactId - Delete contact: User should have already logged in with a true token.

* Precondition: Should have already logged in with a true token.

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter the contact you want to get
* Step 3. Execute the endpoint.

Expected Result: Contact should be deleted. 200 OK.* Success Test Case - Get Contact 


* FAIL Test Case - Get Contact by contactId - Invalid contactId
* Precondition: Should have already logged in with a true token

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Enter a non-existing contactId

* Step 3. Execute the endpoint
Expected Result: Contact shouldn’t be deleted. 400 Bad Request.

* Success Test Case - Update Contacts PATCH - Patch contact

* Precondition: Should have already logged in with a true token.

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Change the contact information you want to update
* Step 3. Execute the endpoint.

Expected Result: Contact information should be changed. 200 OK.
Can be seen in the response

* Success Test Case - Update Contacts PUT - Put contact
* --Note: Put can only update 1 field --
* Precondition: Should have already logged in with a true token.

* Step 1. Open the endpoint - https://thinking-tester-contact-list.herokuapp.com/contacts
* Step 2. Change the contact information you want to update
* Step 3. Execute the endpoint.

Expected Result: Contact information should be changed. 200 OK.
Can be seen in the response.

------USERS-------

* Successful Test Case - Create user:
* Step 1. Open the login endpoint. https://thinking-tester-contact-list.herokuapp.com/users/
* Step 2. Enter the necessary credentials.
Necessary credentials,
firstName: 'TesterFirstName',
lastName: 'TesterLastName',
email: 'testtest1@example.com',
password: 'test2Password',
* Step 3. Execute

Expected Result: 201 Status code - User Created

* Successful Test Case - Login with the correct credentials:
* Precondition: An account needed to be created before this action
* Step 1. Open the endpoint.  https://thinking-tester-contact-list.herokuapp.com/users/login
* Step 2. Enter the necessary credentials (Credentials should be given)
* --Note: User can use the user created before for credentials too--
* Step 3. Execute.

Expected Result: User should successfully login and enter to the main page. 200 status

* Fail Test Case - Login with random mail and password:
* Step 1. Open the endpoint.https://thinking-tester-contact-list.herokuapp.com/users/login
* Step 2. Enter the necessary credentials (Credentials given)
* Step 3. Execute

Expected Result: User should successfully login and enter to the main page. 200 status

* Successful Test Case - Logout with the correct credentials:
* Precondition: An account needed to be created before this action
* Step 1. Open the endpoint. https://thinking-tester-contact-list.herokuapp.com/users/logout
* Step 2. Enter the necessary credentials (Credentials should be given)
* --Note: User can use the user created before for credentials too--
* Step 3. Execute
* Step 4. Enter necessary information and logout

Expected Result: User should successfully logout and enter to the main page. 200 status

* Successful Test Case - Update User - Update user
* Precondition: An account needed to be created before this action
* Step 1. Open the endpoint. https://thinking-tester-contact-list.herokuapp.com/users/me
* Step 2. Enter the information you want to update
* --Note: User can use the user created before for credentials too--
* Step 3. Execute
* Step 4. Enter necessary information and logout

Expected Result: User should be successfully updated. 200 status

* Successful Test Case - GET User - Get user information
* Precondition: An account needed to be created before this action
* Step 1. Open the endpoint. https://thinking-tester-contact-list.herokuapp.com/users/me
* Step 2. Execute

Expected Result: User should successfully logout and enter to the main page. 200 status

* Successful Test Case - DELETE User - Delete the user
* Precondition: An account needed to be created before this action
* Step 1. Open the endpoint. https://thinking-tester-contact-list.herokuapp.com/users/me
* Step 2. Execute
* Step 3. Login

Expected Result: User should be deleted with 200 status after that, logging in should fail.



------FRONTEND------

** Important note: Since we are checking every single thing in the backend cases (Should be seen in the codes as well). We don't need to check everything in the frontend side. If necessary cases can be expanded and backend cases can be implemented to frontend as well.

* Successful Test Case - Sign-up
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly
* Step 4. Submit
Expected Result: User should instantly be on the contactList page.

* Successful Test Case - Logout
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly
* Step 4. Submit
* Step 5. Click Logout.
Expected Result: User should be logged out successfully. User should be on login page afterwards.

* Successful Test Case - Login
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly
* Step 4. Submit
* Step 5. Click Logout.
* Step 6. Enter the same information and click on Login
Expected Result: User should be logged in.

* Fail Test Case - Sign-up - Invalid e-mail
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly except the e-mail
* Step 4. Submit
Expected Result: Page should display an error and shouldn't let you sign in -  User validation failed: email: Email is invalid

* Successful Test Case - Add New Contact
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly
* Step 4. Submit
* Step 5. Click on Add New Contact
* Step 6. Fill every information correctly
* Step 7. Submit
Expected Result: New contact information should be displayed on the table.

* Successful Test Case - Add New Contact
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly
* Step 4. Submit
* Step 5. Click on Add New Contact
* Step 6. Fill every information correctly
* Step 7. Submit
* Step 8. Click on Edit Contact
* Step 9. Edit information.
* Step 10. Submit.
Expected Result: Updated contact information should be displayed on the table.

* Successful Test Case - Delete Contact
* Step 1. Open the page. https://thinking-tester-contact-list.herokuapp.com
* Step 2. Click on Sign-up
* Step 3. Fill the information correctly
* Step 4. Submit
* Step 5. Click on Add New Contact
* Step 6. Fill every information correctly
* Step 7. Submit
* Step 8. Click on Delete Contact
* Step 9. Click OK to pop up.
Expected Result: Updated contact information should be displayed on the table.

----------------- REGRESSION CASES -----------------

For regressions cases I have created two main scenarios that checks the happy paths for both frontend and backend.
Frontend test name:  frontend.test.ts
Backend test name: end-to-end-flow.test.ts

In my opinion almost every case related to the authentication and login are needed. Every single user case I have written should be in the regression suite.

To sum them up regression cases are;
* Create user
* Login user
* Get user profile
* Update user profile
* Add Contacts
* Get Contacts
* Delete contact
* Delete user
* Logout user
* Login user

All of these can be found in end-to-end-flow and frontend as I mentioned before.

