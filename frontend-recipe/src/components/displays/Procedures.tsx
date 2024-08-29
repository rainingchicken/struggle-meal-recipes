import { useEffect, useState } from "react";
import { useGetPersonalRecipeProceduresMutation } from "../../slices/personalRecipeSlice";
// import { ProceduresContext } from "../../context/ProceduresContext.tsx";
/////////////////////
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

//////////////////
import IProcedures from "../../interfaces/IProcedures";
import { toast } from "react-toastify";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

interface IParams {
  _id: string | undefined;
}

const Procedures = ({ _id }: IParams) => {
  const [procedures, setProcedures] = useState<any>([]);
  // const { procedures, setProcedures } = useContext(ProceduresContext);

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
  }, []);

  const loaded = () => {
    return (
      <>
        {procedures &&
          procedures.map((procedure: IProcedures) => (
            // <div key={procedure._id}>{procedure.steps}</div>
            <LexicalComposer
              key={procedure._id}
              initialConfig={{
                namespace: "MyEditor",
                theme,
                onError,
                editable: false,
                editorState: procedure.steps,
              }}
            >
              <RichTextPlugin
                contentEditable={<ContentEditable />}
                placeholder={<div></div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
            </LexicalComposer>
          ))}
        {/* <p className="errors">{error}</p> */}
      </>
    );
  };

  return <>{isLoading ? <h1>Loading...</h1> : loaded()}</>;
};

export default Procedures;
