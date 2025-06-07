import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice.js";

const Profile = () => {
  const userSelector = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const userData = {
    firstName: userSelector.firstName,
    lastName: userSelector.lastName,
    age: userSelector.age,
    gender: userSelector.gender,
    photoUrl: userSelector.photoUrl,
  };

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.updatedUser));
        alert("Details updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container min-h-[calc(100vh-100px) w-2/3 mx-auto ">
      <div className="mx-10 my-8 border border-white px-8 py-6">
        <h1 className="text-white font-bold text-2xl text-center mb-2">
          Edit your profile
        </h1>
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col w-2/3 px-8 py-6 gap-2">
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
              <label htmlFor="firstName" className="text-xl">
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
              <label htmlFor="firstName" className="text-xl">
                Age:
              </label>
              <input
                className="border border-white px-3 py-2 w-full"
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h1 className="text-white text-2xl text-center font-bold mb-3">
              Picture
            </h1>
            <img
              className="w-52 h-52 rounded"
              src={photoUrl}
              alt="Profile picture"
            />
            <div>
              <input
                type="text"
                placeholder="enter image URL"
                className="overflow-visible h-auto border border-white px-3 py-1"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => handleSubmit(e)}
            className=" w-full px-8 py-2 cursor-pointer bg-purple-400 text-black font-bold rounded hover:bg-purple-600 active:scale-90 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
