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

---

## 18. Add Google OAuth functionality

- Search for firebase google
- Create a project > no google analytics > web > install firebase in client side

- create a file called firebase in client side
- copy the code (initializeApp) to firebase file
- remeber to add export const app = initializeApp...
- create .env file in client side and save the firebase apiKey inside env
- click on continue in firebase > choose to authentication > get started > choose google signin method > enable google > give project name "addis-realestate" > select your gmail account > save

---

## NB-google firebase

- Make sure you have two gmail account for the Popup to work well, If you have only one gmail account, and once you loggied with it, nexttime, the pop up won't come.
- You might see a Cross-Origin Error in the console, that error is not for google, rather its for firebase, and its only chrome issue , if you run it in other browser no issue, so ignore the error

---

## 19. Integrate OAuth in the front end-OAuth component

- Follow the code in OAuth component, inside the handleGoogle OAuth handler
- make a post request, Remember to create endpoint api from the backend side
- Apply useDispatch and signInSuccess action to handle the data got from the backend

---

## 20. Create API for the google Authentication

- Make google api/controller inside auth.controller
- Check If the user is already in database, if not create it and signin
- If user is already/previously signed in with gmail , it generates a JWT (JSON Web Token) for that user and sends it back in a cookie along with the user data (excluding the password) as a JSON response.
- Setting Cookie: `.cookie("access_token", token, { httpOnly: true })`
  This line sets a cookie named access_token with the JWT as its value. The httpOnly: true option restricts access to the cookie to HTTP requests only, improving security.
- Sending Response: ` .status(200).json(rest);`
  This line sets the HTTP status code to 200 (OK) and sends the user data (excluding the password) as a JSON response.
- Update auth.router `router.post("/google", google);`

## 21. Get signin user data

- Update Header.jsx to get user avatar from google
- If user is signin then redirect user to a protected Profile page

## 22. Protect Profile component/Page

- Create a PrivateRoute component

  - Get the current signin user
  - If there is a user signin then show ``<Outlet />, Outlet is an inbuilt component
    that displays other components as a children
  - in this case PrivateRoute has Profile components as a child nested under it inside App.jsx client component

  ```js
  <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
  </Route>
  ```

  - Any component/page can be inserted in Privateroute If it needs to be protected

## 23. Update Profile Page

- Add form inputes to update user profile
- Follow the Profile input form code
- add useRef to reference for the file we want to upload

  ```js
       <input type="file" ref={fileRef} hidden accept="image/*" />
      <img
        onClick={() => fileRef.current.click()}
        className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center"
        src={currentUser.avatar}
      />

  ```

- to hide the file upload/choose file and to specify only images is accepted `hidden accept="image/*`
  - First add image Upload html element
    `js      <input type="file" /> `

## 24. Firebase file storage

- Go back to firebase > Storage > select your geo location/near you
- Before we start working with storage we need to edit the Rules to allow us to upload edit and read files
- Go to Rules tab
- Make the following changes to allow read & write etc.. and then save/publish

```js
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches("image/.*")
    }
  }
}



```

    - The Rules allow everyone to read , and allow write with condition
    -   2megabyte
    - Only images

    ---

## 25. File/Image Upload to the app

- create a useState : ` const [file, setFile] = useState(undefined);`
- update input file inside form

```js
<input
  onChange={(e) => setFile(e.target.files[0])}
  type="file"
  ref={fileRef}
  hidden
  accept="image/*"
/>
```

- If there are many images we choose the first one
- can check what is inside file

  ```
  console.log("file", file);

  ```

  ***

## 26. handle File Upload

- Using useEffect handle the file upload functions and methods from firebase storage
- Since When we upload the picture, we also update formdata and submit form data, we need a useState to handle the form submition

  ```
  const[formData, setFormData] = useState({})

  ```

- handleFileUpload => Follow this function about the uploading feature
- Then Make some logical rendering

```js
The most Important Section
<img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center"
          src={formData.avatar || currentUser.avatar}
        />
        <p className=" text-smf text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image Successfully uploaded</span>
          ) : (
            ""
          )}
        </p>

```

---

## 27. Verifying Token, Why we need to verify token?

- Before we update user info, such as username, email and avatar, we need to verify that user is signin,
- Its remembered that We have saved user token in cookie, during users signin
- so that we extract that token from cookie and verify its validity, Then we update the user
- In other words , when we verify users token, then after we can send the user to a protected page
- Inorder to verify token from cookie, we need package called `cookie parser`
- Then add inside index.js ` app.use(cookieParser());`
