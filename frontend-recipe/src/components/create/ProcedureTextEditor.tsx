import { FormEvent, useEffect, useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  useCreatePersonalRecipeProceduresMutation,
  useDeletePersonalRecipeMutation,
} from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const theme = {};

function onError(error: Error) {
  console.error(error);
}
const initialConfig = { namespace: "MyEditor", theme, onError };

const placeholder = "Step 1: Mix...";

interface IonChangeParams {
  onChange: Function;
}
function MyOnChangePlugin({ onChange }: IonChangeParams) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

interface IEditorParams {
  recipe_id: string | undefined;
}
function ProcedureTextEditor({ recipe_id }: IEditorParams) {
  const [editorState, setEditorState] = useState<any>();
  //   const [procedures, setProcedures] = useState({
  //     steps: "",
  //   });
  // const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [createProceduresAPICall] = useCreatePersonalRecipeProceduresMutation();
  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProcedures = {
      steps: editorState,
      recipe_id: recipe_id,
    };

    try {
      const res = await createProceduresAPICall({
        _id: recipe_id,
        data: newProcedures,
      }).unwrap();

      setEditorState(res);
      navigate("/dashboard");
    } catch (error) {
      // setError("Something went wrong. Cannot submit");
      toast.dark("Something went wrong. Cannot create the procedures");
      console.log(error);
    }
  };

  function onChange(editorState: string | any) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  // const handleBackButton = () => {
  //   // //all of this is to prevent the editor from being empty
  //   // e.preventDefault();
  //   // const placeholder =
  //   //   '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Step 1...","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';
  //   // const newProcedures = {
  //   //   steps: placeholder,
  //   //   recipe_id: recipe_id,
  //   // };
  //   // try {
  //   //   const res = await createProceduresAPICall({
  //   //     _id: recipe_id,
  //   //     data: newProcedures,
  //   //   }).unwrap();
  //   //   setEditorState(res);
  //   //   navigate(`/create/${recipe_id}/ingredients`);
  //   // } catch (error) {
  //   //   setError("Something went wrong. Cannot set placeholder");
  //   //   console.log(error);
  //   // }
  //   navigate(`/create/${recipe_id}`);
  // };

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe_id).unwrap();
      // console.log("deleted");
      toast.dark("Recipe deleted!");
      navigate("/dashboard");
    } catch (error) {
      // setError("Cant delete");
      toast.dark("Something went wrong. Cannot delete");
      console.log(error);
    }
  };

  return (
    <>
      <form className="editorContainer" onSubmit={handleSubmit}>
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <MyOnChangePlugin onChange={onChange} />
        </LexicalComposer>
        {/* {console.log(editorState)} */}
        <br />
        <button
          className="btn"
          disabled={
            editorState &&
            JSON.parse(editorState).root.children[0].children == ""
          }
        >
          SHARE RECIPE
        </button>
        {/* <p className="error">{error}</p> */}
      </form>
      {/* <button onClick={handleBackButton}>BACK</button> */}
      <button className="btn" onClick={handleDeleteClick}>
        CANCEL
      </button>
    </>
  );
}
export default ProcedureTextEditor;
