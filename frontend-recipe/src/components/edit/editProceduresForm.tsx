import { FormEvent, useState } from "react";
import { useUpdatePersonalRecipeProceduresMutation } from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";
import IProcedures from "../../interfaces/IProcedures";

interface IParams {
  recipe_id: string | undefined;
  procedure: IProcedures;
}

const EditProcedureForm = ({ recipe_id, procedure }: IParams) => {
  const [editProcedures, setEditProcedures] = useState({
    steps: procedure.steps,
    _id: procedure._id,
    recipe_id: procedure.recipe_id,
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [updateProceduresAPICall] = useUpdatePersonalRecipeProceduresMutation();

  const handleChange = (e: FormEvent) => {
    setEditProcedures((state) => ({
      ...state,
      steps: (e.target as HTMLInputElement).value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newProcedures = {
      steps: editProcedures.steps,
      recipe_id: recipe_id,
      procedures_id: editProcedures._id,
    };

    try {
      const res = await updateProceduresAPICall({
        _id: recipe_id,
        procedures_id: procedure._id,
        data: newProcedures,
      }).unwrap();

      setEditProcedures(res);
      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <>
      {!editProcedures.steps ? (
        <h1>Loading...</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="steps">Procedures</label>
          <textarea
            onChange={handleChange}
            name="steps"
            id="steps"
            value={editProcedures.steps}
          />
          <button>UPDATE RECIPE</button>
          <p className="error">{error}</p>
        </form>
      )}
    </>
  );
};

export default EditProcedureForm;
