import { useParams } from "react-router-dom";
// import DetailedRecipe from "../components/displays/DetailedRecipe";
import { useEffect } from "react";
import PublicDetailedRecipe from "../components/displays/PublicDetailedRecipe";

const PublicRecipe = () => {
  const { _id } = useParams();
  useEffect(() => {
    document.title = "Recipe";
  }, []);

  return (
    <div>
      <PublicDetailedRecipe _id={_id} />
    </div>
  );
};

export default PublicRecipe;
