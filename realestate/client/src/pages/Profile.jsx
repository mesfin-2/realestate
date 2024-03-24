import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log("update");
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className=" text-3xl text-center font-semibold my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center"
          src={currentUser.avatar}
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          value={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={currentUser.email}
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
          {loading ? "Loading" : "Update"}
        </button>
        <button
          disabled={loading}
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading" : "create listing"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <Link to={"/delete"}>
          <span className="text-red-700 cursor-pointer">Delete Account</span>
        </Link>
        <Link to={"/sign-out"}>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
