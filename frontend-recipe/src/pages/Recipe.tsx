import { useParams } from "react-router-dom";
import DetailedRecipe from "../components/DetailedRecipe";

const Recipe = () => {
  const { _id } = useParams();

  return (
    <div>
      Detailed Recipe
      <DetailedRecipe _id={_id} />
    </div>
  );
};

export default Recipe;
