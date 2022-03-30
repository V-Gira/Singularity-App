import { IDocProps } from "../../components/Doc/Doc";
import { Images } from "../../constants/Images";
import { DocImport } from "./DocImport";

export const DocRoutes: Array<Omit<IDocProps, "page" | "section">> = [
  {
    url: "/srds/bitd",
    parent: { title: "SRDs", url: "/srds" },
    title: "Blades in the Dark SRD",
    imageUrl: "https://bladesinthedark.com/sites/default/files/inline-images/forged_in_the_dark_logo2_0.png",
    loadFunction: DocImport.BitD,
    gitHubLink: "https://github.com/fariapp/fari/tree/master/docs/fate-core.md",
    author: {
      title: "John Harper",
      items: [
        {
          label: "Website",
          url: "https://bladesinthedark.com/",
        },
        {
          label: "Itch.io",
          url: "https://johnharper.itch.io/blades-in-the-dark",
        },
        {
          label: "Drive Thru",
          url: "https://www.drivethrurpg.com/product/170689",
        },
      ],
    },
  },
  {
    url: "/fari-wiki",
    parent: { title: "Fari", url: "/" },
    title: "Fari Wiki",
    loadFunction: DocImport.FariWiki,
    gitHubLink: "https://github.com/fariapp/fari/tree/master/docs/fari-wiki.md",
    imageUrl: Images.logo,
    sideBar: {
      "+Fari Wiki": ["introduction"],
      "+Getting Started": [
        "playing",
        "managing-characters",
        "managing-scenes",
        "tips-and-tricks",
        "data",
      ],
    },
  },
];
