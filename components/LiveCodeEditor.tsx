import {
  Sandpack,
  SandpackPredefinedTemplate,
  SandpackSetup,
  SandpackThemeProp,
} from "@codesandbox/sandpack-react";

interface LiveCodeEditorProps {
  files: Record<
    string,
    | string
    | { code: string; readOnly?: boolean; active?: boolean; hidden?: boolean }
  >;
  template?: SandpackPredefinedTemplate;
  theme?: SandpackThemeProp;
  customSetup?: SandpackSetup;
  options?: {
    showNavigator?: boolean;
    showTabs?: boolean;
    showLineNumbers?: boolean;
    wrapContent?: boolean;
    editorHeight?: number;
  };
}

export default function LiveCodeEditor({
  files,
  template = "react",
  theme = "light",
  customSetup,
  options = {
    showNavigator: true,
    showTabs: true,
    showLineNumbers: true,
    wrapContent: true,
    editorHeight: 350,
  },
}: LiveCodeEditorProps) {
  return (
    <div style={{ marginTop: "30px", marginBottom: "20px" }}>
      <Sandpack
        template={template}
        theme={theme}
        files={files}
        customSetup={customSetup}
        options={options}
      />
    </div>
  );
}
