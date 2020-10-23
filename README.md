# TD-SCM - Test-driven Smart Contract Modeling with Signavio Process Manager

[![CircleCI](https://circleci.com/gh/signavio/SCM/tree/master.svg?style=svg&circle-token=63cd7782954c7d813d4527a5466c5bdc7493188d)](https://circleci.com/gh/signavio/SCM/tree/master)

:dart: TD-SCM is a tool that provides the user a platform to compile business process models to smart contract that can be deployed to a blockchain network using the test-driven approach.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Credits](#credits)
5. [License](#license)

## Introduction

The SCM application provides an interface for the user to login using their Signavio credentials.
Also, the user is required to provide the _revision ID_ of the BPMN diagram, _global variables_ and _contract name_.
The application then authenticates the user with the provided credentials against Signavio Process Manager and fetches the diagram revision in BPMN 2.0 XML format.
This diagram is then compiled to smart contract using the _BPMN-Sol_ compiler.

## Installation

Following is the list of all the dependencies required for the execution of this project.

1. ### Project files:

- Make sure to have the latest version (v14.13.0 or above) of Node Package Manager (npm) installed (https://nodejs.org/en/).

- Clone or download this repository to your local system.

- Open your terminal and `cd` into the project folder and run the command `npm install`. This will install all the required Node.js dependencies.

## Usage

- Once the necessary dependencies are installed, the project is ready to be executed.

- Open your terminal and `cd` into the project folder and run the command `nodemon`. This starts the application at http://localhost:4000.

- The home page is displayed showcasing the content on the SCM engine.

* Click the Engine tab and you are taken to the login page.

- Now login with the Signavio credentials and provide the revision ID of the diagram you want to deploy as smart contract. A sample revision ID is `20345a550b07426e890bd45320f7b8c7`.

- The global variables should be in the following format.

```
uint userID; bool applicantEligible = false;
```

- Click _submit_ . The compiled details of the smart contract is then logged in the console(terminal).

## Model with Multiple script tasks:

It is possible to deploy a model with multiple script tasks. A sample revision ID of a model with multiple XOR gateways - `8dbfdea35e4749f9b786c068bcbfe804`
Corresponding global variables:

```
uint userID; bool applicantEligible = false; bool applicantEligibleAgain = false;
```

## Note

The test case in the script task must adhere to the following format.

```javascript
if (userID >= 10) return (applicantEligible = true)
else return (applicantEligible = false)
```

## Credits

### Authors

- [TimKam](https://github.com/TimKam/)

- [Matwog](https://github.com/Matwog)
