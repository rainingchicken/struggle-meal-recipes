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
import Home from "./pages/links/Home.tsx";
import Dashboard from "./pages/links/Dashboard.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Login from "./pages/userAuth/Login.tsx";
import Logout from "./pages/userAuth/Logout.tsx";
import Signup from "./pages/userAuth/Signup.tsx";
import Profile from "./pages/userAuth/Profile.tsx";
import About from "./pages/links/About.tsx";
import NotFound from "./pages/NotFound.tsx";
import Recipe from "./pages/Recipe.tsx";
import CreateForm from "./pages/CreateForm.tsx";
import EditForm from "./pages/EditForm.tsx";
import EditIngredientForm from "./pages/EditIngredientForm.tsx";
import CreateIngredientsForm from "./pages/CreateIngredientsForm.tsx";
import CreateProcedures from "./pages/CreateProcedures.tsx";
import EditProcedures from "./pages/EditProcedures.tsx";
import SavedForm from "./pages/SavedForm.tsx";
import Search from "./pages/Search.tsx";
import CreateIngredientsandProceduresForm from "./pages/CreateIngredientsandProceduresForm.tsx";
import EditIngredientsandProceduresForm from "./pages/EditIngredientsandProceduresForm.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/search" element={<Search />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes/:_id" element={<Recipe />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/create/:_id" element={<SavedForm />} />
        {/* <Route
          path="/create/:_id/ingredients"
          element={<CreateIngredientsForm />}
        />
        <Route path="/create/:_id/procedures" element={<CreateProcedures />} /> */}
        <Route
          path="/create/:_id/ingredients-and-procedures"
          element={<CreateIngredientsandProceduresForm />}
        />
        <Route path="/dashboard/edit/:_id" element={<EditForm />} />
        {/* <Route
          path="/dashboard/edit/:_id/ingredients"
          element={<EditIngredientForm />}
        />
        <Route
          path="/dashboard/edit/:_id/procedures"
          element={<EditProcedures />}
        /> */}
        <Route
          path="/dashboard/edit/:_id/ingredients-and-procedures"
          element={<EditIngredientsandProceduresForm />}
        />
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
