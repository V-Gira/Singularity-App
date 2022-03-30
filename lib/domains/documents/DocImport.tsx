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
  FariWiki: () => {
    return getDoc(import("../../../_site/docs/fari-wiki/index.html?url"));
  },
  BitD: () => {
    return getDoc(import("../../../_site/docs/bitd-srd/index.html?url"));
  },
};
