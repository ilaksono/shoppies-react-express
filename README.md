# Shopify Internship Challenge - Shoppies

## Stack
- React 17.x
- Express 4.x
- node 10.x
- node-sass 4.11.0

## Styles
 - styled with Material UI - JSS, and SASS

## Additional Features
- Autocomplete search with Combobox Popover
- Charts which show top nominations and best movies
  - Types:
    - #Votes vs Time -> for each film
    - #Votes vs film-title -> for Top 5-10
    - Pie/Doughnut Chart - # Nominations per Country
- trailer preview on movie's details page
- various styling features such as nav bars, modals, side bars and icons - Material UI and responsive design
- green and red snack bars for alerts

## Frontend Frameworks and Libraries
 - Material UI
 - Combobox
 - Axios
 - Suspense code splitting
 - react-cookie
 - react-chartjs-2

## Backend Libraries
 - pg node postgres middleware
 - node-fetch
 - cors
 - body-parser
 - dotenv

## Hooks
 - The following custom hooks can be found in `src/hooks`:

 - `useAppState`: controls user data, search results, movie details, and server request error handling
 - `useAnalysisData`: stores data for all the charts, graphs and tables on the dashboard page
 - `useLoadingState`: controls Circular Progress loading circles when launching a title query, or detail search
 - `useLoginModal`: controls open and close of login modal when selected from Navigation Panel, as well as vote attempt when not signed in
 - `usePagination`: controls page results and page query parameter in omdb api request
 - `useSnackBar`: controls open and close of alerts (snack bars)

 ## Deploy
 - [Netlify Link](http://shoppies-il.netlify.app) - may stall for a few seconds due to heroku idling 
 - [Heroku API](http://shoppies-il.herokuapp.com)

## Diagrams

- Entity Relationship Diagram:
  
  !["ERD"](https://github.com/ilaksono/shoppies-react-express/blob/master/docs/shoppies_ERDv1.1.png)

- Analysis Page Concept: 

  !["Analysis Page Concept"](https://github.com/ilaksono/shoppies-react-express/blob/master/docs/AnalysisPage-Concept.png)

## Directory Layout

```
.
├── docs                  # Documentation files 
├── src                   # Source files and app
├── server                # Sever source files and express app
├── public                # Client assets and image sources
└── README.md

 # In src:

src
├── components             # All React component JSX files
├── assets                 # Material UI - JSS styles and image source files
├── helpers                # Some helpers to format numbers 
├── hooks                  # Custom react hooks
├── reducers               # Exports reducers to useReducer hooks
├── styles                 # SCSS styles files
├── views                  # The page layouts for each route/view
├── README.md              # this
├── index.js               # index
├── App.js                 # App
├── routes.js              # Passes path and icon to Sidebar component
└── AppContext.js          # React Context Provider
```
