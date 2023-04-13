# Passenger Transportation CRM
This is a small CRM application for managing passenger transportation. It includes multiple user roles such as passengers, drivers, and dispatchers.

## Technologies
This project is built using:

- React
- TypeScript
- Bootstrap
- Sass
- Firebase

## Installation
To install and run the project locally, follow these steps:

Clone the repository: `git clone https://github.com/svitjojo/CRM-app.git`<br/>
Install dependencies: `npm install`<br/>
Create a Firebase project and Firebase copy configuration in .env file. Example:<br/>
- REACT_APP_API_KEY=apiKey<br/>
- REACT_APP_AUTH_DOMAIN=authDomain<br/>
- REACT_APP_PROJECT_ID=projectId<br/>
- REACT_APP_STORAGE_BUCKET=storageBucket<br/>
- REACT_APP_MESSAGING_SENDER_ID=messagingSenderId<br/>
- REACT_APP_APP_ID=appId<br/>

Run the project: `npm start`<br/>

## Features
This CRM includes the following features:

- Authentication and authorization for passengers, drivers, and dispatchers.
- Passengers can book trips and view their trip history.
- Drivers can view their upcoming trips and mark them as complete.
- Dispatchers can view all trips and assign drivers to trips.
- Real-time updates for trip status and availability.
