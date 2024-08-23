// @desc    signup page, creates token, checks user auth
// @route   POST /api/users/signup
// @access  Public
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // console.log("submit");
    try {
      const res = await signup({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Please fill all inputs");
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="signupName">Name: </label>
        <input
          id="signupName"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="signupEmail">Email Address: </label>
        <input
          id="signupEmail"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="signupPassword">Password: </label>
        <input
          id="signupPassword"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="signupConfirmPassword">Confirm Password: </label>
        <input
          id="signupConfirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn submitbtn" disabled={isLoading} type="submit">
          Sign Up
        </button>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
        {isLoading && <h1>Loading...</h1>}
      </form>
      <p className="error">{error}</p>
    </>
  );
};

export default Signup;
