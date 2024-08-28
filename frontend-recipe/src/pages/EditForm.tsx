import { useParams } from "react-router-dom";
import { useEffect } from "react";
import EditRecipeForm from "../components/edit/EditRecipeForm";

const EditForm = () => {
  const { _id } = useParams();
  useEffect(() => {
    document.title = "Edit Recipes";
  }, []);
  return (
    <div>
      <h1>Edit Recipe</h1>
      <EditRecipeForm _id={_id} />
    </div>
  );
};

export default EditForm;
