Welcome to Jentis Automation Test Project

This project contains automated tests for the assignment I have received from Jentis

## Table of Contents
- [API Tests](#api)
    - [TEST - Contacts](#contacts)
    - [TEST - End-to-End](#end-to-end)
    - [TEST - Users](#users)
- [Frontend Test](#frontend)
- [Utils](#utils)

## Introduction

This is an automation project for the QA Case assignment given by Jentis 

## Getting Started

To get started with this automation test project, follow these steps:
1. Clone the repository.
2. Download dependencies
3. Run the end-to-end test inside the api->contacts->end-to-end
4. Run the frontend test inside the frontend
5. For further control every single test should be running as intended.

## Important Note

 In order to start testing tester needs to create a new user. Since our
global.setup.ts runs all the time we can easily disable it by going to jest.config.ts and disable globalSetup: './global.setup.ts',
go to api->users-post. execute addUser.test.ts.
After that enabling global.setup.ts and you should be ready to test all of the endpoints
Random comments are left in the code to help you navigate and understand.


## Installation

To install the required dependencies, use the following commands:

```bash
npm install axios
npm install jest --save-dev
npm install jest-puppeteer --save-dev
npm install @nestjs/common
