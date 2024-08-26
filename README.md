# Struggle Meal Recipe

Can't afford to go to the stores to get groceries right now? Look through this struggle meal recipes application to find the perfect recipe for you!

## Features

- user auth
  - login, signin, logout
- view recipes (home page)
- manage your own recipes (dashboard)
  - create and share your recipes
  - delete recipes
  - edit recipes
  - view published recipes

## Capstone Objective

Create a full-stack web application using MongoDB, Express, React, and Node (MERN).

## Requirements

### (20%) Project Structure, Standardization, and Convention

- Project is organized into appropriate files and directories, following best practices.
  - yes
- Project contains an appropriate level of comments.
- sure
- Project is pushed to GitHub, and contains a README file that documents the project, including an overall description of the project.
  - yes
- Standard naming conventions are used throughout the project.
  - yes
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
  - yup
- Level of effort displayed in creativity, presentation, and user experience.
  - sure

### (12%) Core JavaScript

- Demonstrate proper usage of ES6 syntax and tools.
  - yes
- Use functions and classes to adhere to the DRY principle.
  - sure
- Use Promises and async/await, where appropriate.
  - yes
- Use Axios or fetch to retrieve data from an API.
  - using fetch, yes
- Use sound programming logic throughout the application.
  - sure
- Use appropriate exception handling.
  - yes backend error middleware and frontend has a "not found" page

### (9%) Database

- Use MongoDB to create a database for your application.
  - yes
- ~~Apply appropriate indexes to your database collections.~~

- Create reasonable schemas for your data by following data modeling best practices.
  - yes

### (19%) Server

- Create a RESTful API using Node and Express. For the purposes of this project, you may forgo the HATEOAS aspect of REST APIs.
  - yes
- Include API routes for all four CRUD operations.
  - yes
- Utilize the native MongoDB driver or Mongoose to interface with your database.
  - yes?
- Include at least one form of user authentication/authorization within the application.
  - yes

### (35%) Front-End Development

- Use React to create the application’s front-end.
  - yes
- Use CSS to style the application.
  - yes
- Create at least four different views or pages for the application.
  - yes
- Create some form of navigation that is included across the application’s pages, utilizing React Router for page rendering.
  - yes
- Use React Hooks or Redux for application state management.
  - yes, usecontext and redux tool kit
- Interface directly with the server and API that you created.
  - yes

### (5%) Presentation

- Create a short overview of your application.
- Highlight the use cases of your application.
- Highlight the technical functionality of the application, from a high-level perspective.
- Discuss what you have learned through the development of the application.
- Discuss additional features that could be added to the application in the future.

### (5%) Extra Credit

- Adhere to Agile principles and the Scrum framework. Perform stand-up sessions (with an instructor) when possible.
  - no
- Successfully track your project using a software similar to Jira.
  - lol no
- Build your application primarily with TypeScript.
  - 🤡 Yup

### Wireframe

- home with all submitted recipes
- dashboard with only user's recipes
  - favorite section
  - add, edit, delete are on its own page
- profile (private route)
- about
