import { useEffect, useState } from "react";
import { useGetPersonalRecipeProceduresMutation } from "../slices/personalRecipeSlice";
import { useParams } from "react-router-dom";
import Ingredient from "../components/displays/Ingredient";
import IngredientForm from "../components/create/IngredientForm";
import IProcedures from "../interfaces/IProcedures";
import EditProcedureTextEditor from "../components/edit/editProceduresTextEditor";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditIngredientsandProceduresForm = () => {
  const { _id } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);

  // const { procedures, setProcedures } = useContext(ProceduresContext);

  const [procedures, setProcedures] = useState<any>([]);
  // const [error, setError] = useState<string | null>(null);

  const [
    getRecipeProceduresAPICall,
    { isLoading },
  ] = useGetPersonalRecipeProceduresMutation();

  const fetchRecipeProcedures = async () => {
    try {
      const res = await getRecipeProceduresAPICall(_id).unwrap();
      setProcedures(res);
      //   console.log(res);
    } catch (err) {
      console.log(err);
      // setError("Something went wrong. Cannot get procedures");
      toast.dark("Something went wrong. Cannot get the procedures");
    }
  };

  useEffect(() => {
    fetchRecipeProcedures();
    document.title = "Edit Ingredients and Procedures";
  }, []);

  return (
    <div>
      <>
        <h1 className="title">Ingredients</h1>
        <Ingredient user={userInfo._id} _id={_id} />
        <IngredientForm recipe_id={_id} />;
      </>{" "}
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1 className="title">Procedures</h1>
            <div className="toolbar">
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
            {procedures &&
              procedures.map((procedure: IProcedures) => (
                // <EditProcedureForm
                //   key={procedure._id}
                //   recipe_id={_id}
                //   procedure={procedure}
                // />
                <EditProcedureTextEditor
                  key={procedure._id}
                  recipe_id={_id}
                  procedure={procedure}
                />
              ))}
            {/* <p className="error">{error}</p> */}
          </>
        )}
      </>
    </div>
  );
};

export default EditIngredientsandProceduresForm;
