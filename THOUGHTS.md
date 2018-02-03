# Design Philosophies

The main motivation in the system design of this app has been reusability of components.

- Reusable component that can be independently used without any coupling to the context they are used in
- atomic design pattern -> components are classified into *atoms*, *molecules* and *organisms* based on the size and complexity of there functionality
- Single source of truth for any data, no data has two copies defined in the platform and thus changes need to be done at 1 instances for any configuration changes,
same is true for any data we store in redux state, any derivable data is never stored in state and computed on the fly
- proper error handling to keep user updated of any changes in the system, conveyed through system wide accessible pusher notifications

# Directory structure

All source files are placed inside src folder with the following structure

- actions -> maintains redux state and expose methods to make required changes as actionHandlers
- assets -> static assets are kept here
- components -> all view components are kept here
- constants ->  All constants are defined here and used in the source code after imported from this directory
- service -> deals with providing network capabilities to the app, all it exposes are simple methods and return data required by the caller.
 Internal actions are never exposed to the user.
- utils -> all utilities that can be used multiple times in the platform are defined here and used by imports wherever required.

# Known issues
- API is known to mis-behave on filter and upadate actions for employees that are added using this system and not read from the contacts.json
this can also be verified using the network tab of the browser