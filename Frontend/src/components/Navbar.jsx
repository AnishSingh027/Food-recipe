import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Navbar = ({ filterInput, setFilterInput }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSelector = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm pr-6">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Foody
        </Link>
        <Link to={"/my-recipe"} className="btn btn-ghost text-xl">
          My Recipe
        </Link>
      </div>
      {Object.keys(userSelector).length > 0 && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${
                    Object.keys(userSelector).length > 0
                      ? userSelector.photoUrl
                      : "https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-iron-man.webp"
                  }`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Favorites</a>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
