import Giscus from "@giscus/react";
import React from "react";

interface GiscusCommentsProps {
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
  inputPosition?: "top" | "bottom";
  theme?: string;
  lang?: string;
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  inputPosition = "bottom",
  theme = "light",
  lang = "bn",
}) => {
  return (
    <div style={{ marginTop: "2.5rem" }}>
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={mapping}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition={inputPosition}
        theme={theme}
        lang={lang}
        loading="lazy"
      />
    </div>
  );
};

export default GiscusComments;
