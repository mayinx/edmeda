- TODO: Change MONGO_URI in development to point to the "edmeda-development"-db [DONE]
- TODO: Change MONGO_URI in production to point to the "edmeda-production"-db
- TODO: Change MONGO_URI in review-apps / edmeda-pipeline to point to the "edmeda-review"-db
- TODO: Implement a staging environment and point the MONGO_URI to the "edmeda-staging"-db
- TODO: Implement a demo environment and point the MONGO_URI to the "edmeda-demo"-db

- TODO: Refine registration dlg - add missing fields to schema and form [EDIT - postpone that - too many fields for 1 form - if time left, we will implement an onbording screen ]
- TODO: Registration process: Success / Error notifictions [DONE]
- TODO: Scope communities to current user
- TODO: Create a default school community on registration (if not already existing)

- TODO: Add Users to communites on community creation - added the same time to the School-community as well
- TODO: Add/Remove Users for a specific community via edit dlg
- TODO: Add/Remove Users from within a community / edit dlg or something
- TODO: Confirmation dlg before deleting communities + show successfulyl deleted notification

- TODO: BrandLogo - bro?! Which funtions as home btn as well - ask Schu if sche can do that?! + Check for default images and icons (Student-, Parent-, Teacher-icons - group- and community-icons)

- TODO: Ask what's teh best approach to handle globally shared literals / data (see client => pages => community => SharedData.js)
- TODO: Ask : How to get rid of that flickering when oepning tehnew and edit form
- TODO: Ask namir / martin: I get heaps of warnings like the below - which I can only resolve by killing the node processes and rerun 'node run startboth' again (or by hitting reload liek a mad man) - what are your two cents on this?:
  "Proxy error: Could not proxy request /api/communities from localhost:3000 to http://localhost:4000.
  See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED)."

- TODO: BUG: [Client] [New/Edit Community Modals] On invalid inputs, selects are not marked up with a red bottom border like reguar inputs do

- TODO: I planned on using a npm package for error- and crud-confirmation related user-notifications (the one is used for my Bello-App was quite nice) - so it's on my list already ...

- TODO: Use afterInsert or something in Mongoose
- TODO: Use propTypes for typesafety of component-props

- TODO: REFAC: Namir: "I see you are selecting always main elemetType.ClassName why don't you just select the .ClassName? That should be enough"- e.g.

  main section.Community {
  main.CommunitiesLayout {

@namirsab namirsab 22 hours ago
Here again main.ClassName. I think you don't need that

- in short: Switch to scss

- TODO: Harmonize / merge relevant parts in utils.css with \_breakpoints.css

- TODO: [SERVER]: Controller-functions: filter by current user
- TODO: [SERVER]: Index controller function: Implement filter
  // deconstructing the query object
  //const { page, name, creator, type, grade } = req.query;

  // if (title) {
  // // regex for substring search (case insensitive)
  // query.title = { $regex: new RegExp(title, "i") };
  // }
  // if (genre) {
  // query.genre = genre.toLowerCase();
  // }
  // if (isRead) {
  // query.isRead = isRead;
  // }
  // if (author) {
  // query.author = author;
  // }
  // TODO: Whitelist permitted filter params with pick
  // \_.pick(req.body, "genre", "isRead")
  // Community.find(req.query)

- TODO: [SERVER]: Index controller function: Implement pagination if needed
  // Community.paginate(query, { page: page, limit: 20 })
  // .limit(10)
  // .sort("-createdAt")
  // .populate("...")

- TODO: Whiltelist params in Controller functions for every relevant crud function
  // TODO: Make whitelisting params work with object arys as well- until then we chicken out here ;-)
  // Community.create(\_.pick(req.body, "name", "type", "creator", "grade"))
  // yhcek out "joi" and "jup"

- React hook form server sidde valdiation messages : https://www.carlrippon.com/react-hook-form-server-validation/

- switch to redux for currentUser currentCommunity, modalState etc-

# Roadmap

- Implememt User Auth etc.
  - see https://www.freecodecamp.org/news/state-management-with-react-hooks/ (ncl. AuthContext etc.)
  - https://levelup.gitconnected.com/authentication-using-jwt-in-mern-1cc5c8ccd03c

# Resources to check:

- https://www.freecodecamp.org/news/state-management-with-react-hooks/
- https://dev.to/armelpingault/how-to-create-a-simple-and-beautiful-chat-with-mongodb-express-react-and-node-js-mern-stack-29l6
