import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/slices/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);

      const popUpResult = await signInWithPopup(auth, provider);

      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          name: popUpResult.user.displayName,
          email: popUpResult.user.email,
          photo: popUpResult.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("google-data", data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  /*the reason button type is button is to avoid  submit effect
when signin form is being submited.
*/
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 rounded-lg text-white p-3 uppercase"
    >
      Login with google
    </button>
  );
};

export default OAuth;
