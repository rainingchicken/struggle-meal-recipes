// @desc    editmode, update the clicked workout
// @route   GET /api/users/logout
// @access  Public
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall(null).unwrap();
      dispatch(logout());
      //   navigate("/");
      toast.dark("Logout successful!");
    } catch (err) {
      console.log(err);
      toast.dark("Something went wrong. Cannot logout");
    }
  };
  useEffect(() => {
    logoutHandler();
    document.title = "Logout Page";
  }, []);

  return <h1>You are logged out</h1>;
};

export default Logout;
