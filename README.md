# MERN APP TEMPLATE

Easy peasy lemon squeeze starter template for your next MERN-app. The resulting app will consist of an express and an react app living on the same machine. Express will serve both your API requests and the React files...

## Setup for local development

- Just hit the `Use this template`-button above to use this MERN-skeleton-app as base for your new project

- Give you new repo a name etc. and hit the btn `Create repository from template`

- Clone your new repo to your local machine, cd into its root durectors and simply run:

  `npm run iall`

  This should install all the needed node packages for your app both in `/node_mpdules` and in `/client/node_mdules`

- Create an `/.env`-file (or use the existing `.env.template`-file afte rremoving the `template`-appendix) and set a `PORT` and an `MONGO_URI` that specifies your (local or remote) database-uri - e.g.like this:

  ```
  MONGO_URI = mongodb+srv://<User>:<PW>@cluster0.aa5hb.mongodb.net/edmeda?retryWrites=true&w=majority
  PORT = 4000
  ```

- Make sure that your `.env`-file is always added to your `.gitignore`-file!

- run `npm run startboth` to fire up your app on localhost

- Happy coding!

## Deployment via Heroku

- Head to your heroku account and create a new app
- Select **Github** as deployment-method under the **Deploy**-tab and **connect** your freshly created github repo to heroku (hit the appearing **Search** button and select your repo from the appearing dropdown menu)
-

## File structure Server

```
/server
├── app.js // main entry
├── /config // The app configuration (logger, global config, ...)
├── /models // The model data (e.g. Mongoose model)
├── /routes // The route definitions and implementations
├── /services // The standalone services (Database service, Email service, ...)
└── /views // The view rendered by the server to the client (e.g. Jade, EJS, ...)
```

## File structure Client

```
/client
|─── /build
|─── /node_modules
|─── /public
|─── /src
|────── /assets
|────── /components
|────── /contexts
|────── /domain
|────── /hooks
|────── /lib
|────── /pages
|────── /services
|────── /styles
|────── /utils
|─── index.js
|─── package.json
|─── README.md
```
