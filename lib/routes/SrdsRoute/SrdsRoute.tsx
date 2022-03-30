import { css } from "@emotion/css";
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { AppLink } from "../../components/AppLink/AppLink";
import { FateLabel } from "../../components/FateLabel/FateLabel";
import { Heading } from "../../components/Heading/Heading";
import { Page } from "../../components/Page/Page";
import { PageMeta } from "../../components/PageMeta/PageMeta";
import { Images } from "../../constants/Images";
import { useTranslate } from "../../hooks/useTranslate/useTranslate";
// import { IPossibleLanguages } from "../../services/internationalization/InternationalizationService";

export function SrdsRoute() {
  const { t } = useTranslate();

  return (
    <Page>
      <PageMeta
        title={t("srds-route.title")}
        description={t("srds-route.description")}
      />
      <Container maxWidth="md">
        <Srds />
      </Container>
    </Page>
  );
}
SrdsRoute.displayName = "SrdsRoute";

export function Srds() {
  const { t } = useTranslate();
  return (
    <div>
      <Heading
        icon={MenuBookIcon}
        title={t("srds-route.fate-srds.title")}
        subtitle={t("srds-route.fate-srds.subtitle")}
      />
      <SrdItems />
      <Box pt="1rem" />
      <Box pt="2rem" />
      <Heading icon={HelpIcon} title={t("srds-route.resources.title")} />
      <WikiItems />
    </div>
  );
}

// const FateCondensedLinks: { [language in IPossibleLanguages]?: string } = {
//   "en": "/srds/condensed",
//   "pt-BR": "/pt-br/srds/condensed",
// };
export function SrdItems() {
  const { t } = useTranslate();

  // const fateCondensedLink =
  //   FateCondensedLinks[currentLanguage] ?? (FateCondensedLinks["en"] as string);

  return (
    <Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <DocCard
            title={t("docs.bitd.title")}
            description={t("docs.bitd.description")}
            bgColor="#00409d"
            imageUrl="https://bladesinthedark.com/sites/default/files/inline-images/forged_in_the_dark_logo2_0.png"
            link="/srds/bitd"
          />
        </Grid>
      </Grid>
    </Box>
  );
}



export function WikiItems() {
  const { t } = useTranslate();
  return (
    <Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <DocCard
            title={t("docs.fari-wiki.title")}
            description={t("docs.fari-wiki.description")}
            bgColor="#0c2b69"
            imageUrl={Images.logo}
            link="/fari-wiki"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export const DocCard: React.FC<{
  title: string | JSX.Element;
  description: string | JSX.Element;
  bgColor?: string;
  imageUrl?: string;
  link: string;
}> = (props) => {
  const theme = useTheme();
  const backgroundColor = props.bgColor ?? theme.palette.background.paper;
  const color = theme.palette.getContrastText(backgroundColor);
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ButtonBase
      className={css({
        "height": "100%",
        "display": "inline-block",
        "textAlign": "left",
        "width": "100%",
        "transition": theme.transitions.create(["transform"]),
        "&:hover": {
          transform: isSmall ? undefined : "scale(1.05)",
        },
      })}
    >
      <AppLink to={props.link}>
        <Card
          raised
          className={css({
            "height": "100%",
            "display": "flex",
            "flexDirection": "column",
            "background": backgroundColor,
            "boxShadow": theme.shadows[8],
            "transition": theme.transitions.create(["box-shadow"]),
            "&:hover": {
              boxShadow: isSmall ? undefined : theme.shadows[16],
            },
          })}
        >
          <Box height="100%">
            <CardMedia
              image={props.imageUrl ?? ""}
              title={props.title as string}
              className={css({
                height: "8rem",
                maskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
              })}
            />
            <CardContent className={css({ height: "100%" })}>
              <Box pb="1rem">
                <Typography gutterBottom variant="h5" component="h2">
                  <FateLabel
                    textColor={color}
                    fontSize={theme.typography.h5.fontSize}
                    uppercase={false}
                  >
                    {props.title}
                  </FateLabel>
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={css({
                    color: color,
                  })}
                >
                  {props.description}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </AppLink>
    </ButtonBase>
  );
};

DocCard.displayName = "DocCard";
