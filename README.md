## Feeling App

### The Project

Feeling app is a DigitalOcean MongoDB hackathon project. It's a CRUD feeling timeline app built with the DO stack.
A user must enter his "username" (if the user does not exist, the API will create one) in the login form, and press the "login" button. A feeling panel will be displayed, in which the user can create, see, update and delete feelings.
- Feeling creation: The user must press "CREATE FEELING" button. A form will be displayed. The fields to complete are:
	1. Title: a title in order to identify your feeling. (required)
	2. Short description: a summary of you feeling. (required)
	3. Type: an emoji in order to represent your feeling.
	4. Feeling description: a detailed explanation about you feeling, places, people, time, etc.
	5. Feeling image: an image in order to graphically explain your feeling.
- Feeling list: All of your feelings in a responsive list ordered by its creation date.
- Feeling deletion: The user can delete a feeling, clicking on the trash icon in the feeling list. After a confirmation, the feeling will be deleted.
- Feeling update: The user can see the feeling details clicking on a row. The user can update any data.

(*) The app does not manage the session in local storage, so if you refresh the page you should enter the same username again.

(*) If you want to use an existing user with some created feelings, you could use "usertest" username.

### Technological stack

This project uses DO products to deploy the platform. I'll explain the app components below:

- Feeling API:
	- Developed in NodeJS.
	- Deployed in Docker using DigitalOcean Container Registry and App Platform as Web Service.
	- Use DO Spaces in order to upload and manage feeling images with a restricted CDN to access to object storage.
- Feeling WEB:
	- Developed in React JS with Redux Toolkit, Material UI and TypeScript.
	- Deployed with App Platform as Static Assets.
- Managed MongoDB database:
	- Standalone node over TLS.

(*) The ENV variables have been removed from the repository.

### Repository organization

- Feeling API is located in /server. Inside, you can access to a POSTMAN collection to test the API. This collection has all the enpoints used in the API.
- Feeling WEB is located in /web. This folder has a quick readme on how to set up the ReactJS project.

### DigitalOcean review

DigitalOcean is a great deployment and building tool, its products are predictable and easy to use. I’ve chosen it due to its reliability and speed, which have led our company projects in production to an excellent outcome.
This projects was my first experience with App Platform and Managed MongoDB database, it was certainly awesome. The DO serverless arch is fast and quickly to set up.
I think that DO should improve these two things to make it a more complete product:
	- It is not possible to associate the app service (web service) to external services (MongoDB Atlas) without opening the whitelist, and that may be a security issue.
	- Add a VPC.
I've heard that they are working on it, I'm waiting those amazing features.

## What's next

- Session storage management.
- Add password access.
- Compression images and thumbnail.
- NodeJS with TypeScript.