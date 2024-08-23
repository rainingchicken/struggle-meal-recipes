import { useParams } from "react-router-dom";
import EditRecipeForm from "../components/forms/EditRecipeForm";

const EditForm = () => {
  const { _id } = useParams();

  return (
    <div>
      <EditRecipeForm _id={_id} />
    </div>
  );
};

export default EditForm;
