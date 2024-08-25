import { useParams } from "react-router-dom";
import DetailedRecipe from "../components/displays/DetailedRecipe";
import { useEffect } from "react";

const Recipe = () => {
  const { _id } = useParams();
  useEffect(() => {
    document.title = "Recipe";
  }, []);

  return (
    <div>
      <DetailedRecipe _id={_id} />
    </div>
  );
};

export default Recipe;
