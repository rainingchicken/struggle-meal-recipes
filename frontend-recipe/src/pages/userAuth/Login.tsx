// @desc    login page, creates token, checks user auth
// @route   POST /api/users/login
// @access  Public
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
    document.title = "Login Page";
  }, [navigate, userInfo]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // console.log("submit");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      // setError("Incorrect email or password");
      toast.dark("Incorrect email or password");
    }
  };

  return (
    <>
      <h1 className="title">Login</h1>
      <form className="RecipeForm" onSubmit={submitHandler}>
        <label htmlFor="loginEmail">Email Address: </label>
        <input
          required
          id="loginEmail"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="loginPassword">Password: </label>
        <input
          required
          id="loginPassword"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btnForm submitbtn"
          disabled={isLoading}
          type="submit"
        >
          Log In
        </button>
        <p>
          New user? <Link to="/signup">Sign up</Link>
        </p>
        {isLoading && <h1>Loading...</h1>}
      </form>
      {/* <p className="error">{error}</p> */}
    </>
  );
};

export default Login;
