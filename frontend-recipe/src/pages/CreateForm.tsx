import { useEffect } from "react";
import RecipeForm from "../components/create/RecipeForm";

const CreateForm = () => {
  useEffect(() => {
    document.title = "Create Recipe";
  }, []);
  return (
    <div>
      <RecipeForm />
    </div>
  );
};

export default CreateForm;
