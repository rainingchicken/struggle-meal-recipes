import { useParams } from "react-router-dom";
import EditProcedureForm from "../components/edit/editProceduresForm";
import { useContext, useEffect, useState } from "react";
import { useGetPersonalRecipeProceduresMutation } from "../slices/personalRecipeSlice";
import { ProceduresContext } from "../context/ProceduresContext";
import IProcedures from "../interfaces/IProcedures";
import { TheseProceduresContext } from "../context/TheseProceduresContext";

const EditProcedures = () => {
  const { _id } = useParams();

  const { procedures, setProcedures } = useContext(ProceduresContext);

  const [error, setError] = useState<string | null>(null);

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
      setError("Something went wrong. Cannot get procedures");
    }
  };

  useEffect(() => {
    fetchRecipeProcedures();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {procedures &&
            procedures.map((procedure: IProcedures) => (
              <EditProcedureForm
                key={procedure._id}
                recipe_id={_id}
                procedure={procedure}
              />
            ))}
          <p className="error">{error}</p>
        </>
      )}
    </>
  );
};

export default EditProcedures;
