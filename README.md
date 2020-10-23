# TD-SCM - Test-driven Smart Contract Modeling with Signavio Process Manager

[![CircleCI](https://circleci.com/gh/signavio/SCM/tree/master.svg?style=svg&circle-token=63cd7782954c7d813d4527a5466c5bdc7493188d)](https://circleci.com/gh/signavio/SCM/tree/master)

:dart: TD-SCM is a tool that provides the user a platform to compile business process models to smart contract that can be deployed to a blockchain network using the test-driven approach.

## Table of Contents:scroll:

1. [Motivation](#motivation)
2. [Prerequisites](#prerequisites)
3. [Modeling Guide](#modelingguide)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Roadmap](#roadmap)
7. [Credits](#credits)
8. [License](#license)

## Motivation:bulb:
The main motivation behind the conception of this tool is to provide an interface to test the correctness and integrity of a business process model before it is compiled and deployed to the blockchain network. This pre-check could potentially avoid the risk of deploying a smart contract with errors. The tool also embraces the [Test driven development](https://en.wikipedia.org/wiki/Test-driven_development) process in the business process modelling.

## Prerequisites:memo:

1. The project uses the latest version of [yarn](https://yarnpkg.com/) and [node](https://nodejs.org/en/) (v14.13.0 or above).
2. Please follow the steps provided in the [modeling guide](##modelingguide) to model the BPMN diagram in the way that this tool expects to so that the compilation to smart contracts is easily carried out.

## Modeling Guide:closed_book:

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
- All the sequence flows should be correctly named as shown in the below ![alt sample model](https://github.com/signavio/Test-Driven-Process-Modeling/blob/master/Images/sample%20model.png).
- For example, in this sample model the script task "Check userID" has the custom attribute "Test function" value as

```javascript
if (userID >= 10) {
  applicantEligible = true
} else {
  applicantEligible = false
}
return applicantEligible
```

- So the emerging sequence flows must both be named as `applicantEligible` because that is the output value emerging out of that script task. This is required because this value is captured during the compilation to smart contracts. Failure to correctly configure this sequence flows may result in compilation errors in smart contracts.

3. #### Configuring documentation for tasks

- All the task elements in the model must contain its own main attribute called "Documentation" whose value must be in the below format. For example in the sample model shown above, we have a task called "Enter userID". The "Documentation" attribute must be configured as

```javascript
(uint _userID) : (uint userID) -> {userID = _userID; }
```

- This documentation could be understood as what that specific task does. This is crucial because when compiling the BPMN models to smart contracts, each task element is seen as a separate function which performs its own action. So the documentation essentially acts as the body of the function.
- The task called "Confirm Acceptance" must be configured with its "Documentation" attribute as

```javascript
(bool _confirmation) : (bool applicantEligible) -> {applicantEligible = _confirmation; }
```

4. #### Configuring global variables

- As we have seen from our example model that we use variables such as `uint userID` and `bool applicantEligible`. These variables have to be declared to be understood by the compiler. The TD-SCM tool provides an interface where these variables must be declared.

## Installation:electric_plug:

- Clone or download this repository to your local system.
- Open your terminal and `cd` into the project folder and run the command `yarn install`. This will install all the required dependencies.
- Run `yarn start` and this starts the application at http://localhost:4000. Now we are good to go :rocket:

## Usage:computer:

- The tool provides exposes an interface for the user to login using their Signavio credentials.
- The user is required to provide the _revision ID_ of the BPMN diagram, _global variables_ and _contract name_.

- The home page is displayed showcasing the content on the SCM engine.

- Click the Engine tab and you are taken to the login page.

- Now login with the Signavio credentials and provide the revision ID of the diagram you want to deploy as smart contract. A sample revision ID is `8dbfdea35e4749f9b786c068bcbfe804`.

- The form also contains a field to provide the global variables. These variables are basically the ones that were specified within the business process model in the script task. The global variables should be in the following format.

```
uint userID; bool applicantEligible = false; bool applicantEligibleAgain = false;
```

- Click _submit_ . The compiled details of the smart contract is then logged in the console(terminal).

## Roadmap:checkered_flag:

- :pushpin:Move the tool to a React + Typescript based Single page application.
- :pushpin:Extend the tool to support BPMN diagrams modeled using other Modeling platforms as it currently only supports models modeled using Signavio Process Manager.

## Credits

## Authors:bust_in_silhouette:

- [TimKam](https://github.com/TimKam/)

- [Matwog](https://github.com/Matwog)
