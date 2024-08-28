import { FormEvent, useEffect, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useUpdatePersonalRecipeProceduresMutation } from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";
import IProcedures from "../../interfaces/IProcedures";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import "@lexical/rich-text";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

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
  procedure: IProcedures;
}
function EditProcedureTextEditor({ recipe_id, procedure }: IEditorParams) {
  const [editorState, setEditorState] = useState<any>({});

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [updateProceduresAPICall] = useUpdatePersonalRecipeProceduresMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProcedures = {
      steps: editorState,
      recipe_id: recipe_id,
      procedures_id: procedure._id,
    };
    if (
      editorState &&
      JSON.parse(editorState).root.children[0].children == ""
    ) {
      setError("Please provide instuctions for this recipe");
    } else {
      try {
        const res = await updateProceduresAPICall({
          _id: recipe_id,
          procedures_id: procedure._id,
          data: newProcedures,
        }).unwrap();

        setEditorState(res);

        navigate("/dashboard");
      } catch (error) {
        setError("Something went wrong. Cannot submit");
        console.log(error);
      }
    }
  };

  function onChange(editorState: string | any) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  // const handleBackButton = () => {
  //   navigate(`/dashboard/edit/${recipe_id}`);
  // };

  const handleCancelClick = async () => {
    navigate("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <LexicalComposer
          initialConfig={{
            namespace: "MyEditor",
            theme,
            onError,
            editable: true,
            editorState: procedure.steps,
          }}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={"Please provide the steps..."}
                placeholder={
                  <span className="editor-placeholder">
                    {"Please provide the steps..."}
                  </span>
                }
              />
            }
            placeholder={<></>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={onChange} />
        </LexicalComposer>

        <button> UPDATE RECIPE </button>
        <p className="error">{error}</p>
      </form>{" "}
      {/* <button onClick={handleBackButton}>BACK</button> */}
      <button onClick={handleCancelClick}>CANCEL</button>
    </>
  );
}
export default EditProcedureTextEditor;
