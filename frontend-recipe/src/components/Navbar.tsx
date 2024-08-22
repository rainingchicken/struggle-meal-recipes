import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div className="navbar">
      <span>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </span>

      {!userInfo ? (
        <span>
          <Link to="/login">Login</Link>{" "}
          <Link to="/signup" className="button">
            Signup
          </Link>
        </span>
      ) : (
        <span>
          <Link to="/dashboard">Dashboard</Link>{" "}
          <Link to="/profile">{userInfo.name}'s Profile</Link>{" "}
          <Link to="/logout">Logout</Link>{" "}
        </span>
      )}
    </div>
  );
}

export default Navbar;
