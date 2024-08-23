import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Login from "./pages/userAuth/Login.tsx";
import Logout from "./pages/userAuth/Logout.tsx";
import Signup from "./pages/userAuth/Signup.tsx";
import Profile from "./pages/userAuth/Profile.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";
import Recipe from "./pages/Recipe.tsx";
import CreateForm from "./pages/CreateForm.tsx";
import EditForm from "./pages/EditForm.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/recipes/:_id" element={<Recipe />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/dashboard/edit/:_id" element={<EditForm />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
