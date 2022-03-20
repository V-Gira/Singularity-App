import axios from "axios";

async function getDoc(getMarkdownPromise: Promise<typeof import("*?url")>) {
  const url = (await getMarkdownPromise).default;
  const docResponse = await axios.get(url);
  return docResponse.data;
}

/**
 * Import HTML documents generated from the original markdown files by `eleventy`
 */
export const DocImport = {
  FateCore: () => {
    return getDoc(import("../../../_site/docs/fate-core/index.html?url"));
  },
  FariWiki: () => {
    return getDoc(import("../../../_site/docs/fari-wiki/index.html?url"));
  },
};
