import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Ingredient from "../components/displays/Ingredient";
import IngredientForm from "../components/create/IngredientForm";
import ProcedureTextEditor from "../components/create/ProcedureTextEditor";

const CreateIngredientsandProceduresForm = () => {
  useEffect(() => {
    document.title = "Create Ingredients and Procedures";
  }, []);
  const { _id } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <>
      <div>
        <h1>Ingredients</h1>
        <Ingredient user={userInfo._id} _id={_id} />
        <IngredientForm recipe_id={_id} />
      </div>
      <div>
        <h1>Procedures</h1>
        <div>
          <ul>
            <li>
              <b>Bold</b>: ctrl + b
            </li>
            <li>
              <em>Italics</em>: ctrl + i
            </li>
            <li>Undo: ctrl + z</li>
            <li>Redo: ctrl + y</li>
            <li>🍉 Emojis: window + .</li>
          </ul>
        </div>
        <ProcedureTextEditor recipe_id={_id} />
      </div>
    </>
  );
};

export default CreateIngredientsandProceduresForm;
