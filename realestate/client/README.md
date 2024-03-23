# Steps for the project work

## Frontend - Step-1

1. Start from frontend, install all neccessary packages vite,react-icons,react-router-dom
2. Create pages and components
3. Create a header component
   and create navigation for the pages

---

## Backend - Step2

4. Setup Server
5. Start the backend, sign-in and signup api
6. Integrate with mongodb and the backend authentication api with frontend
7. make user sign-up api, Test it to create a user with username/email/password
8. Integrate the api with the frontend/(REMEMBER cors()) axios post request to submit form

---

## Intgrate api with Frontend - Step3

9. make the SignUp and SignIn pages work with the api, makesure the cookie is saved in the client browser after signin

---

## Redux - Step4

10. create redux store in client side
11. add the Provider in main.js

---

## Testing Redux Sclices

12. Make sure you have Redux DevTools Installed in the Browser

13. use SignIn page to apply redux toolkit
14. The user login information is displayed in the reduxDevTools state, but its not persistent, If you refreash the browser the data lost.

## 15. Steps to make Redux-Persist to work

      - Use/Install package called redux-persist in the client
      -  Make the following configuration in the store.js

```js
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```

- Then, change the reducer part with "persistedReducer"

```js

//reducer: { user: userReducer },
  reducer: persistedReducer,

```

- Finally export

```js
export const persistor = persistStore(store);
```

## 16. Integrate the Redux-persist with main.js

- Update the main.js as follows

```js
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

## 17. Test Redux-persist if its persisting data, by refreshing browser

- Try to login a user with email and password
- Go to chrome Browser > Inspect > Application > LocalStorage > http://localhost:5173/ > persist:tool
- All current user information is Persisted
