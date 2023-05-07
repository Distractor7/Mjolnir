# Event Management App

This web application is designed for managing events. The app allows both managers and artists to log in, but managers have additional privileges to create, read, update, and delete event items.

## Features

- Manager login: Managers can log in to the app using their email and password.
- Artist login: Artists can also log in to the app using their email and password.
- Manager privileges: Managers can create, read, update, and delete event items.
- Artist view: Artists can log in and view the event items created by managers.

## Technologies Used

- ReactJS for front-end development
- Node.js and Express for back-end development
- MongoDB for data storage
- Express for routing and back-end development

## Getting Started

### Installation

1. Clone this repository.
2. Install Node.js and MongoDB on your system.
3. In the project directory, run `npm install` to install the necessary dependencies.

### Running the App

To start the development server, run the following command in the "backEnd" and "frontEnd" directory:

npm start

This will start the back-end server at `http://localhost:8080` and the front-end server at `http://localhost:3000`.

Environment Variables

The following environment variables are used in the app:

- `MONGODB URI`: The URI of the MongoDB database.
- `JWT_SECRET`: The secret key used to sign JSON Web Tokens.
- `process.env.PORT`: The port number for the back-end server.

### Testing

To run the tests for the back-end, run the following command:

```bash
npm run test-backend
```

To run the tests for the front-end, run the following command in the frontEnd directory:

```bash
npm run test-frontend
```

## Usage

1. Log in as a manager or artist (You can see the pre-existing test users accounts in the collections you'll have access to in MongoDB Atlas).
2. If you are a manager, create an event item by filling out the required fields.
3. View the list of event items, which includes the title, date, description and image if you enter the relative path.
4. To update or delete an event item, click on the corresponding button withint the event item.
5. If you are an artist, log in and view the list of upcoming event items.

## Security Measures

To ensure the security of this app, the following measures have been taken:

- Passwords are hashed and stored securely in the database.
- JSON Web Tokens are used for authentication and authorization.
- Environment variables are used to protect sensitive information such as JWT_SECRET.

## Deployment

The app has been deployed on Netifly, the back-end has not been deployed anywhere as I'm not certain of where to deploy back end sites for free.

## Snapshots and Unit Tests

The app has been appropriately tested, with one snapshot test and unit tests for both the front-end and back-end of the application.

## Code Documentation

The code is well documented with appropriate comments.
