import {
    Sandpack,
    SandpackPredefinedTemplate,
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
  options = {
    showNavigator: true,
    showTabs: true,
    showLineNumbers: true,
    wrapContent: true,
    editorHeight: 350,
  },
}: LiveCodeEditorProps) {
  return (
    <Sandpack
      template={template}
      theme={theme}
      files={files}
      options={options}
    />
  );
}
