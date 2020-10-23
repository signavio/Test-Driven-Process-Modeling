# TD-SCM - Test-driven Smart Contract Modeling with Signavio Process Manager

[![CircleCI](https://circleci.com/gh/signavio/SCM/tree/master.svg?style=svg&circle-token=63cd7782954c7d813d4527a5466c5bdc7493188d)](https://circleci.com/gh/signavio/SCM/tree/master)

:dart: TD-SCM is a tool that provides the user a platform to compile business process models to smart contract that can be deployed to a blockchain network using the test-driven approach.

## Table of Contents

1. [Motivation](#motivation)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Credits](#credits)
6. [License](#license)

## Motivation

:bulb: The main motivation behind the conception of this tool is to provide an interface to test the correctness and integrity of a business process model before it is compiled and deployed to the blockchain network. This pre-check could potentially avoid the risk of deploying a smart contract with errors. The tool also embraces the [Test driven development](https://en.wikipedia.org/wiki/Test-driven_development) process in the business process modelling.

## Prerequisites

1. The project uses the latest version of [yarn](https://yarnpkg.com/) and [node](https://nodejs.org/en/) (v14.13.0 or above).
2. Please follow the steps provided in the [modeling guide](##modelingguide) to model the BPMN diagram in the way that this tool expects to so that the compilation to smart contracts is easily carried out.

## Modeling Guide

### Using Signavio Process Manager

If you are modeling the diagram using the signavio process manager then kindly follow the steps as follows.

- The business process model must be modeled according to the modeling specification.

1. #### Configuring Script task

- The Task types must be properly specified. The tool specifically expects the script tasks to be correctly defined.
- The script task by definition has an attribute called "Script". This attribute must contain the script value in the below format.

```javascript
if (userID >= 10) applicantEligible = true
else applicantEligible = false
```

- Create a custom attributes on BPMN task called "Test values" of type "Table" with columns "inputs" and "outputs" as shown in this image ![alt Test values custom attribute](https://github.com/signavio/Test-Driven-Process-Modeling/blob/master/Images/Test%20Values%20attribute.png).
- On your script task, provide the input and output values using this "Test values" custom attribute. For example input could be `userID = 5` and output could be `applicantEligible = false`.
- So in summary, your corresponding input and expected output values should go inside this table, i.e, the custom attribute "Test values".
- Create another custom attribute on BPMN task called "Test function" of type "Multi-line text" for the BPMN task.
- This should contain the script value as defined in the attribute "Script" with an added return value as shown below.

```javascript
if (userID >= 10) {
  applicantEligible = true
} else {
  applicantEligible = false
}
return applicantEligible
```

- To sum it up your script task must contain the attribute "Script" with the script value, custom attribute "Test values" with the input and output values, custom attribute "Test function" which takes the same value as defined for the attribute "Script" with an additional return value.
- This [documentation](https://documentation.signavio.com/suite/en-us/Content/process-manager/userguide/workspace-admin/configure-notations-and-attributes.htm) should come in handy to create custom attributes within the Process Manager.

2. #### Configuring Gateways and Sequence flows

- All the gateways used in the model should be uniquely named.
- All the sequence flows should be correctly named as shown in the below ![alt sample model](https://github.com/signavio/Test-Driven-Process-Modeling/blob/master/Images/sample%20model.png)

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
