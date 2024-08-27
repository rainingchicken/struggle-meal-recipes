import { FormEvent, useState } from "react";
import { useCreatePersonalRecipeProceduresMutation } from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import ProcedureTextEditor from "./ProcedureTextEditor";
import { setProcedures } from "../../slices/proceduresSlice";
interface IParams {
  recipe_id: string | undefined;
}

const ProcedureForm = ({ recipe_id }: IParams) => {
  // const [procedures, setProcedures] = useState({
  //   steps: "",
  // });
  const dispatch = useDispatch();
  const procedures = useSelector((state: any) => state.procedures.state);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [createProceduresAPICall] = useCreatePersonalRecipeProceduresMutation();

  // const handleChange = (e: FormEvent) => {
  //   setProcedures({
  //     steps: (e.target as HTMLInputElement).value,
  //   });
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newProcedures = {
      steps: procedures.steps,
      recipe_id: recipe_id,
    };

    try {
      const res = await createProceduresAPICall({
        _id: recipe_id,
        data: newProcedures,
      }).unwrap();

      dispatch(setProcedures(res));
      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="steps">Procedures</label>
      {/* <textarea onChange={handleChange} name="steps" id="steps" required /> */}
      {/* <ProcedureTextEditor
        
      /> */}
      <button>SHARE RECIPE</button>
      <p className="error">{error}</p>
    </form>
  );
};

export default ProcedureForm;
