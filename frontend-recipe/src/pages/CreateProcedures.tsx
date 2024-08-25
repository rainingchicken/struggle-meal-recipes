import { useEffect } from "react";
import ProcedureForm from "../components/create/ProcedureForm";
import { useParams } from "react-router-dom";

const CreateProcedures = () => {
  const { _id } = useParams();
  useEffect(() => {
    document.title = "Procedures";
  }, []);
  return (
    <>
      <ProcedureForm recipe_id={_id} />
    </>
  );
};

export default CreateProcedures;
