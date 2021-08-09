# React App Template Folder Structure (Work in Prgress)

- Sources used to come up with this structrue:
  - [Opinionated React: Folder Structure & File Naming](https://dev.to/farazamiruddin/an-opinionated-guide-to-react-folder-structure-file-naming-1l7i)
  - [React Folder Structure in 5 Steps [2021]](https://www.robinwieruch.de/react-folder-structure)
  - [Optimal file structure for React applications](https://charles-stover.medium.com/optimal-file-structure-for-react-applications-f3e35ad0a145)
  - [How I structure my React apps](https://blog.usejournal.com/how-i-structure-my-react-apps-86e897054593)

## Folder Structure

```
/react-app
  /build
  /node_modules
  /public
  /src
    /assets
    /components
    /contexts
    /domain
    /hooks
    /lib
    /pages
    /services
    /styles
    /utils
    AppRoutes.tsx
    index.js
  package.json
  README.md
```

## Pardon?

- `/assets` - images, logos, icons, fonts.
- `/components` - reusable ui components not tight to a domain ject => components that are shared between multiple pages. / only for reusable components (e.g. UI components). Every other component should move to a domain specific folder. (see `domain`)
- `/contexts` - I keep all of the context components in a separate folder, to not confuse them with plain old react components. A common context I like to implement is UserAuthContext.tsx.
- `/domain` - components, which are coupled to a business domain object - e.g. UserProfile, UserAvatar etc.
- `/lib` - When using a 3rd party library, let's say like Firebase for example, I like to put all of the initialization in a folder called lib. I'll then export the instance of that initialized library.
- `/pages` - Pages are also react components, but they represent a page or screen of an app. These map 1:1 with a route in the AppRoutes.tsx file.
- `/services` - All of my api methods are put in a folder called services. I like to do this so that I don't put the business logic of an API call directly into a component, and so that any component can easily reference a service that it needs.
- `/styles` - I very rarely write custom css, instead opting to use a framework like tailwindcss. This styles folder is where my generated styles and any custom css goes.
- `/utils` - ...
- `AppRoutes.tsx` - This file contains all the routes of my application. I've been using react-router for a while, and I like to have one file that contains all my routes so that I can see it all at a glance.

## Example

```
- src/
--- components/
----- App/
------- App.js
------- App.styles.js
------- App.css
------- App.test.js
------- hooks
--------- useThis.js
--------- useThat.js
----- List/
------- List.js
------- List.styles.js
------- List.css
------- List.test.js
----- Input/
------- Input.js
------- Input.styles.js
------- Input.css
------- Input.test.js
----- Button/
------- Button.js
------- Button.styles.js
------- Button.css
------- Button.test.js
----- Checkbox/
------- Checkbox.js
------- Checkbox.styles.js
------- Checkbox.css
------- Checkbox.test.js
--- domain/
----- User/
------- Profile/
------- Avatar/
----- Message/
------- MessageItem/
------- MessageList/
----- Payment/
------- PaymentForm/
------- PaymentWizard/
------- services/
--------- Currency/
----------- index.js
----------- test.js
----- Error/
------- ErrorMessage/
------- ErrorBoundary/
------- services/
--------- ErrorTracking/
----------- index.js
----------- test.js
--- hooks/
--- context/
----- MyContext.js
--- services/
----- Format/
------- Date/
--------- index.js
--------- test.js
--- utils/
```
