# Employee Directory

Visit me at http://shivam-emp-dir.herokuapp.com/

Employee Directory is a client-side rendered React based webapp.

# Important Note!
This webapp and API service are hosted on free servers and thus idle out after 30 minutes of inactivity. If page shows application error on first load, please refresh after around 20 seconds, everything should be fine.

# Known Issues!

- As the api server idles out and reads data from *contacts.json* every time it restarts, all data updated or added in previous session might get lost.
- The api sometimes outputs incorrect filter results for employees added through the platform, same can be verified in the network calls.

# Features!
The WebApp complies to following features. These are as follows -

- View all employees and filter them based on contact details
- update details of individual employees
- Add employee to the platform
- Real time notification that hold for 3 sec to notify any network failure or some action success. These notifications hide on click, and their timer is paused on hovering over them.

# Stack used!

- React coupled with Redux
- NodeJS runtime environment
- Sass as CSS extension language
- Bootstrap for styles
- Webpack for bundling
- Served using Express server
> Jest needs to be integrated

# Getting started!

To install and run this app on your local server you must have node v8.9 and npm v5.5 installed. You can get the app running with just 3 simple steps.

    Goto git directory and run
    $ npm install
    $ npm run deploy
Your app will now be running on http://localhost:5000.

# Design Decisions!

> There is no alternate view for user details other than cards due to insufficient data of an individual to implement a rich UX.

> Simple and elegant UI that shows the motive of the platform along with technical stack used to develop the same.
