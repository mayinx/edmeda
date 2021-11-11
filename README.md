# Edmeda

**Easy remote communication & collaboration for Schools!**

![Edmeda](https://user-images.githubusercontent.com/126368/141141252-f9a82e20-f22e-4ead-9b61-08e82b3bec2e.png)

## Edmeda Demo-Login

You can check out a [Demo of Edmeda](https://edmeda.herokuapp.com/) deployed on a free Heroku-Dyno, using the following credentials to login:

- E-Mail: **chuck@nerdherd.com**
- Password: **Chuck99**

FYI: Since it's a free Heroku-Dyno, you might need to endure the usual initial loading delay - that thing has to wake up first ;-)  

## Motivation

Web-based remote communication & collaboration is an increasingly important subject, not only for companies but also for schools, especially in times of Covid-19. In addition to ensuring subject-related communication during lockdowns, working with Social Web applications enables Schools to teach important skill sets like teamwork and digital literacies by actively practicing digital mediated social communication.  

With that in mind, Edmeda was created.

## What is Edmeda?

Edmeda is a password protected MERN-Stack Web Application which enables Schools to communicate & collaborate easily and effectively via multiple Communities. To achieve that, Teachers, Students and Parents alike are equipped with real-time Group Chats to share information instantaneously and effortlessly. Using Edmeda, Teachers can create limitless Communities - and inside those communities a limitless number of user groups. Those Communities and their User Groups can be centered around any target audience or subject, thus enabling users to achieve a targeted communication and information exchange, even in times of Corona.

Edmeda is geared towards usability, so that all main tasks can be accomplished without leaving the current screen. Teachers have the ability to administer both communities and their users seamlessly right where it's needed, in the communities interface - without the need to dig through big and scary admin areas first, that tend to be apps of their own. The gender of newly registered Users is automatically recognized based on the first name - and User Avatars are assigned randomly based on user type and gender. Teachers can effortlessly create Communities of various types (e.g. Class-, Course- or Custom-Communities) and within those communities Student-, Parent and fellow Teacher-Accounts. By opening a community, they have access to its user groups and chats. Alongside default user groups, that are targeted to communicate with specific user types (e.g. students only, parents only, teachers only), each community can have an infinite number of custom user groups, that can be dedicated to arbitrary school subjects, projects, activities, events etc. - thus enabling the members to communicate and collaborate efficiently as a team!

## Awesome! I wanna use it for my School!

If you are interested in utilizing Edmeda for your School, just drop me an [E-Mail](mailto:christian.daum@protonmail.com?subject=[Edmeda]) detailing your needs - I'm happy to set Edmeda up for your School as a chance to test Edmeda "in the wild".

## Technology Key Facts

- Password-proteced MERN-Stack Web Application, deployed on Heroku (https://edmeda.herokuapp.com/)
- React-frontend & Express/Node.js-Backend, both encapsulated inside the same project
- DB-layer based on MongoDB (managed via MongoDB Atlas), ODM with Mongoose
- User Registration & User Authentication with JWT/Bycryptjs
- Realtime Group-Chats via WebSockets/Socket.io
- Package Management with npm
- React-packages: React Hook Form, React-Responsive, Axios, React-Toastify, React Icons, Gender Detection, etc. ...

## Peek inside 

![Communities View_1](https://user-images.githubusercontent.com/126368/141141255-71854e50-0f54-4416-be34-b9e17e497fe9.png)
*Communities View - lists the current user's communities*

![Communities View_2](https://user-images.githubusercontent.com/126368/141147317-d40d6519-c597-4442-9903-0ea87b219724.png)
*Communities View - another user's communities*

![Community_Members_View_1](https://user-images.githubusercontent.com/126368/141141260-d4d03854-f7de-4ca5-a4bb-90a87fc06611.png)
*Community Members View*

![Community_Members_View_2](https://user-images.githubusercontent.com/126368/141141262-a652b0f2-cda7-4d9e-94e3-0019ef9f195c.png)
*Community Members View*

![Community View_1](https://user-images.githubusercontent.com/126368/141141263-27abf2b4-e192-48fa-a842-ffc6f0032230.png)
*Community view - with a list of group chats on the left in an collapsed sidebar and the currently opened Group Chat on the right*

![Community View_2](https://user-images.githubusercontent.com/126368/141141265-77490be3-a8ca-4592-bb84-4f74ef147a8d.png)
*Community view - dito - but with extended sidebar*
