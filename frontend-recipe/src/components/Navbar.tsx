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
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // const handleSearchChange = (e: FormEvent) => {
  //   setSearchTerm((e.target as HTMLInputElement).value);
  // };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("sort", "desc");
    urlParams.set("vegan", "");
    urlParams.set("categories", "");
    urlParams.set("health", "");
    urlParams.set("desperation", "");
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="navbar">
      <span className="navbarTopLeft">
        <span>
          <Link to="/">Home </Link>
        </span>
        <span>
          {" "}
          <Link to="/search">Recipes </Link>
        </span>{" "}
        <span>
          <Link to="/about">About</Link>
        </span>
      </span>
      <span className="navbarTopRight">
        <form className="searchbar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: FormEvent) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
          />
          <button className="navbarsearchBtn">SEARCH</button>
        </form>
        {!userInfo ? (
          <span>
            <Link to="/login"> Login</Link>{" "}
            <Link to="/signup" className="button">
              Signup
            </Link>
          </span>
        ) : (
          <span>
            {" "}
            <Link to="/dashboard"> Dashboard</Link>{" "}
            <Link to="/profile">{userInfo.name}'s Profile</Link>{" "}
            <Link to="/logout">Logout</Link>{" "}
          </span>
        )}
      </span>
    </div>
  );
}

export default Navbar;
