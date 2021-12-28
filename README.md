# Edmeda

**Easy remote communication & collaboration for Schools**

 

![Edmeda](https://user-images.githubusercontent.com/126368/147595223-19e3d8a2-502a-41bb-a713-8ad30b91fe5f.png)
 
 



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

Edmeda is geared towards usability, so that all main tasks can be accomplished without leaving the current screen. Teachers have the ability to administer both communities and their users seamlessly right where it's needed, in the communities interface - without the need to dig through big and scary admin areas first, that tend to be apps of their own. The gender of newly registered Users is automatically recognized based on the first name - and User Avatars are assigned randomly based on user type and gender. Teachers can effortlessly create Communities of various types (e.g. Class-, Course- or Custom-Communities) and within those communities Student-, Parent and fellow Teacher-Accounts. By opening a community, they have access to its user groups and chats. Alongside default user groups, that are targeted to communicate with specific user types (e.g. students only, parents only, teachers only), each community can have an infinite number of custom user groups, that can be dedicated to arbitrary school subjects, projects, activities, events etc. - thus enabling the members to communicate and collaborate efficiently as a team.

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

![Edmeda](https://user-images.githubusercontent.com/126368/147595533-fe20e564-26ef-410a-a4c1-57ff640a8a11.png)
*Edmeda - Public Landing Page*

![Edmeda Login](https://user-images.githubusercontent.com/126368/147597851-b24e3f56-3680-4d83-8e70-70e6fbda877a.png)
*Edmeda Login*
 
![Communities View 1](https://user-images.githubusercontent.com/126368/147597847-b5fd4d67-f99f-4427-95c8-6ee7eaadbcf4.png)
*Communities View - lists the current user's communities*

![Communities View_2](https://user-images.githubusercontent.com/126368/147594763-d1903a47-02e7-42ed-be36-073e681bdd92.png)
*User Options Dropdown*

![Communities View_2](https://user-images.githubusercontent.com/126368/147594761-7bab0c70-3fa0-42bf-8d9b-cb55aa340da9.png)
*Communities View - another user's communities & user options dropdown*

![User Profile View 1](https://user-images.githubusercontent.com/126368/147591867-fb4e8cf9-c9d7-409a-bbed-047e1c6020b0.png)
*User Profile View with randomly assigned profile banner pic (Teacher - Portrait)*

![User Profile View 2](https://user-images.githubusercontent.com/126368/147591865-773a5627-64d1-47af-b84d-c5c72056c273.png)
*User Profile View (Teacher - Landscape)*

![User Profile View (Student)](https://user-images.githubusercontent.com/126368/147594323-83451ef2-dfa2-4909-b0e8-65e5c3301e62.png)
*User Profile View (Student)*

![User Profile View (Parent)](https://user-images.githubusercontent.com/126368/147594142-0c2b3d6f-2a6e-4b63-ae39-62b3aac2e6c4.png)
*User Profile View (Parent)*

![Communities View - Community Options Dropdown](https://user-images.githubusercontent.com/126368/147598501-31bbf2a6-f856-4079-a90f-f5fa413c1811.png)
*ommunities View with community options dropdown*

![Community Members View 1](https://user-images.githubusercontent.com/126368/147598500-1391c9b2-a1e2-41c6-b496-84fcae7192b0.png)
*Community Members View*

![Community Members View 2](https://user-images.githubusercontent.com/126368/147598498-ae09ad26-99a3-455c-844a-4caa27ca2b71.png)
*Community Members View*
 
![New Community Member Form](https://user-images.githubusercontent.com/126368/147600246-c90f25a7-972f-4f1f-91bd-629ec2cfffb7.png)
*Community Members View with extended bottom bar, holding a new community member form (Landscape)*

![New Community Member Form](https://user-images.githubusercontent.com/126368/147600172-2576a32c-8bc1-4666-867f-0c11d9c069b3.png)
*Community Members View with extended bottom bar, holding a new community member form (Portrait)*

![Community View_1](https://user-images.githubusercontent.com/126368/147611524-fc6dcc8d-f34a-49a2-a7e6-64e7775ac299.png)
*Community view - with a list of group chats on the left in an collapsed sidebar and the currently opened Group Chat on the right*

![Community View_2](https://user-images.githubusercontent.com/126368/147611561-1ac762f0-fecc-41b3-b59c-00c55ad37034.png)
*Community view - dito - but with extended sidebar*


