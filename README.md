# Venmo Coding Challenge
## _Brendon Verissimo_

## Setup

Prerequisites:
1. Node.js
2. npm
3. MongoDB

## Initialization 

1. `npm install`

## Usage

1. Start DB `mongod`

2. For stdin: `./index.js enter`
- Enter commands
- To exit: `ctrl-D`

3. `./index.js file [file]`

## Testing

- Make sure mongod process has been started 
1. `make test`

### Design Decisions 

Overarching design principles:
- Modular: the code is broken into functionality 
- DRY: the code is as terse as possible
- Promises: The q promise library is used to handle asynchronous DB actions
- MongoDB: Document-based storage, flexible and scalable 

### Language Choice
_ One language to rule them all_
I chose JavaScript because it is the language of the web and increasingly becoming used outside of
the browser. Node.js is a fantastic server-side platform that utilizes the V8 engine and can be used to write CLI applications. JavaScript has a great number of libraries and frameworks (shout out to famo.us) that keeps growing, so using a single language means I can use a lot of the same tools to build different applications.