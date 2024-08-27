import { useEffect } from "react";
import SavedRecipeForm from "../components/create/SavedRecipeForm";

const SavedForm = () => {
  useEffect(() => {
    document.title = "Create Recipe";
  }, []);
  return (
    <div>
      <h1>Create Recipe</h1>
      <SavedRecipeForm />
    </div>
  );
};

export default SavedForm;
