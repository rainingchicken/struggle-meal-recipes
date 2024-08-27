import { useEffect } from "react";
import RecipeForm from "../components/create/RecipeForm";

const CreateForm = () => {
  useEffect(() => {
    document.title = "Create Recipe";
  }, []);
  return (
    <div>
      <h1>Create Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default CreateForm;
