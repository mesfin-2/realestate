import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slices/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user); //inside userSlice the name : is "user"

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true); //Instead of setLoading now we use slice
    dispatch(signInStart());
    //setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData,
        { withCredentials: true } //for the cookies to saved in the browser/check also the cors()
      );
      //setLoading(false);
      dispatch(signInSuccess(response.data));
      //setError(null);
      navigate("/");
      //console.log(response.data);
    } catch (error) {
      //setLoading(false);
      dispatch(signInFailure());
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(signInFailure(error.response.data.message));
        //setError(error.response.data.message);
      } else {
        dispatch(
          signInFailure("An unexpected error occurred. Please try again later.")
        );
        //setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
