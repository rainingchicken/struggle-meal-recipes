import { FormEvent, useEffect, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCreatePersonalRecipeProceduresMutation } from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";

const theme = {};

function onError(error: Error) {
  console.error(error);
}
const initialConfig = {
  namespace: "MyEditor",
  theme,
  onError,
};
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
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [createProceduresAPICall] = useCreatePersonalRecipeProceduresMutation();

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
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  function onChange(editorState: string | any) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <form onSubmit={handleSubmit}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyOnChangePlugin onChange={onChange} />
      </LexicalComposer>
      <button>SHARE RECIPE</button>
      <p className="error">{error}</p>
    </form>
  );
}
export default ProcedureTextEditor;
