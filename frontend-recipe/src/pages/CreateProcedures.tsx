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
      {/* <ProcedureForm recipe_id={_id} /> */}
      <ProcedureTextEditor recipe_id={_id} />
    </>
  );
};

export default CreateProcedures;
