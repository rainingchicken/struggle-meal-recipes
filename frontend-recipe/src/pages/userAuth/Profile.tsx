// @desc    view or update profile, including email, passwords, name
// @route   PUT /api/users/profile
// @route   GET /api/users/profile
// @access  Private
import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    document.title = "Profile Page";
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // setError("Passwords do not match");
      toast.dark("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        // alert("Profile updated!");
        toast.dark("Profile updated!");
      } catch (err) {
        // setError("Cannot update profile");
        toast.dark("Something went wrong. Cannot update profile");
      }
    }
  };

  return (
    <>
      <h1 className="title">Profile</h1>
      <form className="RecipeForm" onSubmit={submitHandler}>
        <label htmlFor="profileName">Name: </label>
        <input
          id="profileName"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="profileEmail">Email Address: </label>
        <input
          id="profileEmail"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="profilePassword">Password: </label>
        <input
          id="profilePassword"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="profileConfirmPassword">Confirm Password: </label>
        <input
          id="profileConfirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="btnForm submitbtn"
          disabled={isLoading}
          type="submit"
        >
          Update
        </button>
        {isLoading && <h1>Loading...</h1>}
      </form>
      {/* <p className="error">{error}</p> */}
    </>
  );
};

export default Profile;
