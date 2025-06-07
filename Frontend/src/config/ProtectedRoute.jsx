import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

const Protected = () => {
  const selector = useSelector((store) => store.user);
  const context = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(selector).length === 0) {
      navigate("/login");
    }
  }, [selector, navigate]);

  return Object.keys(selector).length === 0 ? null : (
    <Outlet context={context} />
  );
};

export default Protected;
