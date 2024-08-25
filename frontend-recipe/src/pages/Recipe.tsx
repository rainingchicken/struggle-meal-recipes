import { useParams } from "react-router-dom";
import DetailedRecipe from "../components/displays/DetailedRecipe";

const Recipe = () => {
  const { _id } = useParams();

  return (
    <div>
      <DetailedRecipe _id={_id} />
    </div>
  );
};

export default Recipe;
