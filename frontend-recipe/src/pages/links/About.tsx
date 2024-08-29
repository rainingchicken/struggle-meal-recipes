import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);
  return (
    <div>
      <h1 className="title">About</h1>
      <article style={{ margin: " 0 10%" }}>
        Can't afford to go to the store or a restaurant right now for whatever
        reason? Use this app to look for a maybe edible meal option for you!
        Maybe you'd find some treasure. Maybe...not.{" "}
      </article>
      <Link to={"/search"} className="title">
        <h2>Go take a look</h2>
      </Link>
    </div>
  );
};

export default About;
