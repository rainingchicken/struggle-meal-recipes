import { useEffect, useState } from "react";
import { useGetPersonalRecipeProceduresMutation } from "../../slices/personalRecipeSlice";
// import { ProceduresContext } from "../../context/ProceduresContext.tsx";
import IProcedures from "../../interfaces/IProcedures";

interface IParams {
  _id: string | undefined;
}

const Procedures = ({ _id }: IParams) => {
  const [procedures, setProcedures] = useState<any>([]);
  // const { procedures, setProcedures } = useContext(ProceduresContext);

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

  const loaded = () => {
    return (
      <>
        {procedures &&
          procedures.map((procedure: IProcedures) => (
            <div key={procedure._id}>{procedure.steps}</div>
          ))}
        <p className="errors">{error}</p>
      </>
    );
  };

  return <>{isLoading ? <h1>Loading...</h1> : loaded()}</>;
};

export default Procedures;
