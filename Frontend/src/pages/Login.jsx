import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSelector = useSelector((store) => store.user);

  useEffect(() => {
    if (Object.keys(userSelector).length > 0) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        BASE_URL + "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="w-96 h-auto px-8 py-7 bg-transparent border border-white rounded">
        <h1 className="text-center text-2xl font-bold text-white mb-5">
          Login
        </h1>
        <form className="flex flex-col gap-5 ">
          <div className="flex gap-2 w-full items-start flex-col ">
            <label htmlFor="email" className="text-xl">
              Email:
            </label>
            <input
              className="border border-white px-3 py-2 w-full"
              type="email"
              name="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full items-start flex-col ">
            <label htmlFor="password" className="text-xl ">
              Password:
            </label>
            <input
              className="border border-white px-3 py-2 w-full"
              type="password"
              name="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mx-auto">
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-white rounded font-bold text-black px-3 py-2"
            >
              Login
            </button>
          </div>
          <div>
            <p className="text-center text-blue-600">
              <span className="text-white">New User?</span>{" "}
              <Link to={"/signup"}>Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
