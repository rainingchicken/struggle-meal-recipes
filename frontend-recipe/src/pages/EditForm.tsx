import { useParams } from "react-router-dom";
import EditRecipeForm from "../components/edit/EditRecipeForm";
import { useEffect } from "react";

const EditForm = () => {
  const { _id } = useParams();
  useEffect(() => {
    document.title = "Edit Recipes";
  }, []);
  return (
    <div>
      <EditRecipeForm _id={_id} />
    </div>
  );
};

export default EditForm;
