import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const { userInfo } = useSelector((state: any) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
    }
  }, [location.search]);

  const handleSearchChange = (e: FormEvent) => {
    setSearchTerm((e.target as HTMLInputElement).value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="navbar">
      <span>
        <Link to="/">Home</Link> <Link to="/search">Recipes</Link>{" "}
        <Link to="/about">About</Link>
      </span>
      <form onSubmit={handleSearchSubmit}>
        <input
          value={searchTerm}
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <button>SEARCH</button>
      </form>
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
