import { useEffect, useState } from "react";
import {
  DocumentProcessor,
  IDocumentIndexes,
} from "../domains/DocumentProcessor";

export type ILoadFunction = () => Promise<string>;

export function useMarkdownFile(props: {
  loadFunction: ILoadFunction;
  prefix: string;
}) {
  const [dom, setDom] = useState<HTMLDivElement>();
  const [html, setHtml] = useState<string | undefined>();
  const [markdownIndexes, setMarkdownIndexes] = useState<IDocumentIndexes>({
    tree: [],
    flat: [],
  });

  useEffect(() => {
    load();
    async function load() {
      if (props.loadFunction) {
        try {
          const markdown = await props.loadFunction();
          const markdownContent = markdown;
          if (markdownContent) {
            const { dom, documentIndexes: markdownIndexes } =
              DocumentProcessor.process({
                html: markdownContent,
                prefix: props.prefix,
              });
            setDom(dom);
            setHtml(dom.innerHTML);
            setMarkdownIndexes(markdownIndexes);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [props.loadFunction]);

  return { dom, html, markdownIndexes };
}

export const scrollMarginTop = 16;
