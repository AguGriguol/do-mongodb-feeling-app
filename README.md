## Feeling App

### The Project

Feeling app is a DigitalOcean mongodb hackaton project. It's a CRUD feeling timeline app build in with the DO stack.
A user must enter his "username" (if the user does not exists, the API will create one) in the sing in form, and press "login" button. A feeling panel will be displayed, the user can create, see, update and delete feelings.
- Feeling creation: The user must press "CREATE FEELING" button. A form will be displayed. The fields to complete are:
	1. Title: a title in order to identify your feeling. (required)
	2. Short description: a summary of you feeling. (required)
	3. Type: A emoji in order to represent your feeling.
	4. Feeling description: a detailed explanation about you feeling, places, people, time, etcetera.
	5. Feeling image: an image in order to explain graphically your feeling.
- Feeling list: All of your feeling in a responsive list ordered by created date.
- Feeling deletion: The user could delete a feeling, pressing in the trash icon in the feeling list. After a confirmation, the feeling will be deleted.
- Feeling update: The user can access teh feeling detail pressing the feeling row, the form will be filled with the data. The user could update any data.

(**) The app does not manage the session in local storage, so that if you refresh the page you should enter the same username again.

### Technology stack

This project uses DO products to deploy the platform. I'll explain the app components below:

- Feeling API:
	- Developed in NodeJS.
	- Deployed in Docker using DigitalOceon Container Registry and App Platform as Web Service.
	- Use DO Spaces in order to upload and manage feeling images with a restricted CDN to access to object storages.
- Feeling WEB:
	- Develped in React JS with react toolkit (redux-thunk), material UI and TypeScript.
	- Deployed with App Platform as Static Assets.
- Managed MongoDB database:
	- Standalone node over TLS.

(**) The ENV variables have been removed from the repository.

### Repository organization

- Feeling API is located in /server, inside you can access to a POSTMAN collection to test the API. This collection has all enpoints used into the API.
- Feeling WEB is located in /web, this folder has a quickly readme how to up the reactJS project.

### DigitalOcean review

DigitalOcean is a great deployment and building tool, his products are predictible and easy to use. I choose it because is reliable and fast, I use DO for all our company projects in production and we have had excellent results.
This projects was my first experience with App Platform and Managed MongoDB database, it was awesome. The DO serverless arch is fast and quickly to set up, it's a recommended suite.
I think that DO should improve two main things in order to be usefull:
	- It is not possible to associate the app service (web service) to external services (MongoDB Atlas) without open the whitelist, and that, maybe it's a security problem.
	- Add a VPC.
I've heard that they are working on it, I'm wating those amazing features.

## What's next

- Session storage management.
- Add password access.
- Compression images and thumbnail.
- NodeJS with typescript.