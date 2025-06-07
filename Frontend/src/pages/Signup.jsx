import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(15);
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/auth/signup", {
        firstName,
        lastName,
        age,
        gender,
        email,
        password,
      });
      if (res.data.status === 200) {
        alert("User created");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="w-96 h-auto px-8 py-7 bg-transparent border border-white rounded">
        <h1 className="text-center text-2xl font-bold text-white mb-5">
          Signup
        </h1>
        <form className="flex flex-col gap-5 ">
          <div className="flex gap-2 w-full items-start flex-col ">
            <label htmlFor="firstName" className="text-xl">
              Firstname:
            </label>
            <input
              className="border border-white px-3 py-2 w-full"
              type="text"
              name="firstName"
              placeholder="enter your firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full items-start flex-col ">
            <label htmlFor="lastName" className="text-xl">
              Lastname:
            </label>
            <input
              className="border border-white px-3 py-2 w-full"
              type="text"
              name="lastName"
              placeholder="enter your lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full items-start flex-col ">
            <label htmlFor="age" className="text-xl">
              Age
            </label>
            <input
              className="border border-white px-3 py-2 w-full"
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full items-start flex-col ">
            <label htmlFor="gender" className="text-xl">
              Gender:
            </label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option className="text-black" value="male">
                Male
              </option>
              <option className="text-black" value="female">
                Female
              </option>
            </select>
          </div>
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
              Signup
            </button>
          </div>
          <div>
            <p className="text-center text-blue-600">
              <span className="text-white">Already a User?</span>{" "}
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
