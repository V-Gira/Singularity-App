import { useMemo } from "react";
import { DocumentProcessor } from "../domains/DocumentProcessor";

export function useMarkdownPage(props: {
  url: string;
  page: string | undefined;
  section: string | undefined | null;
  dom: HTMLDivElement | undefined;
}): ReturnType<typeof DocumentProcessor["getPage"]> {

  return useMemo(() => {
    try {
      const result = DocumentProcessor.getPage({
        prefix: props.url,
        dom: props.dom,
        page: props.page,
        section: props.section,
      });
      return result;
    } catch (error) {
      console.log(error)
      const errorHtml =
        "<h1>Error</h1><p>There was an error processing this document</p>";
      const dom = document.createElement("div");
      dom.innerHTML = errorHtml;

      return {
        pageId: "",
        title: "Error",
        description: "Document Error",
        pageDom: dom,
        image: undefined,
      };
    }
  }, [props.url, props.dom, props.page, props.section]);
}
