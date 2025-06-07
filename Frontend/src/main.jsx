import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./config/Routes";
import { Provider } from "react-redux";
import store from "./utils/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
