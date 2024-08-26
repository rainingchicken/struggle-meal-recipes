import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProcedureTextEditor from "../components/create/ProcedureTextEditor";

const CreateProcedures = () => {
  const { _id } = useParams();
  useEffect(() => {
    document.title = "Procedures";
  }, []);
  return (
    <>
      {/* <ProcedureForm recipe_id={_id} /> */}
      <ProcedureTextEditor recipe_id={_id} />
    </>
  );
};

export default CreateProcedures;
