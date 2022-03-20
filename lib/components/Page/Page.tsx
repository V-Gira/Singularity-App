import { css } from "@emotion/css";
import BugReportIcon from "@mui/icons-material/BugReport";
import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import ForumIcon from "@mui/icons-material/Forum";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import SignalWifi4BarLockIcon from "@mui/icons-material/SignalWifi4BarLock";
import StorageIcon from "@mui/icons-material/Storage";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TranslateIcon from "@mui/icons-material/Translate";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Select from "@mui/material/Select";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { env } from "../../constants/env";
import { Images } from "../../constants/Images";
import { useZIndex } from "../../constants/zIndex";
import { useLogger } from "../../contexts/InjectionsContext/hooks/useLogger";
import { MyBinderContext } from "../../contexts/MyBinderContext/MyBinderContext";
import { SettingsContext } from "../../contexts/SettingsContext/SettingsContext";
import { Icons } from "../../domains/Icons/Icons";
import { useHighlight } from "../../hooks/useHighlight/useHighlight";
import { useTranslate } from "../../hooks/useTranslate/useTranslate";
import {
  IPossibleLanguages,
  PossibleLanguagesNames,
} from "../../services/internationalization/InternationalizationService";
import { AppLink } from "../AppLink/AppLink";
import { CookieConsent } from "../CookieConsent/CookieConsent";
import { FateLabel } from "../FateLabel/FateLabel";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

let gameIdSingleton: string | undefined = undefined;

export const FariMaxWidth = "1920px";
export const FariToolbarMaxWidth = "1280px";

export enum LiveMode {
  Connecting,
  Live,
}

export const Page: React.FC<{
  notFound?: JSX.Element;
  gameId?: string;
  live?: LiveMode;
  liveLabel?: string;
  drawerWidth?: string;
  maxWidth?: string;
  pb?: string;
  debug?: Record<string, string>;
  hideHeaderLogo?: boolean;
  disableAutomaticScrollTop?: boolean;
}> = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameId, setGameId] = useState(gameIdSingleton);
  const shouldDisplayRejoinButton = gameId && !props.gameId;
  const { t, i18n, currentLanguage } = useTranslate();

  const myBinderManager = useContext(MyBinderContext);
  const settingsManager = useContext(SettingsContext);
  const logger = useLogger();
  const zIndex = useZIndex();

  const isLive = props.live !== undefined;
  const highlight = useHighlight();

  useEffect(() => {
    if (props.gameId) {
      setGameId(props.gameId);
      gameIdSingleton = props.gameId;
    }
  }, [props.gameId]);

  return (
    <>
      {!props.disableAutomaticScrollTop && <ScrollToTop />}

      {renderHeader()}
      {renderContent()}
    </>
  );

  function renderContent() {
    return (
      <Fade in timeout={250}>
        <div>
          <div
            className={css({
              height: "100%",
              paddingBottom: "4rem",
              minHeight: "calc(100vh - 56px)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            })}
          >
            {!!props.notFound ? (
              props.notFound
            ) : (
              <div
                className={css({
                  maxWidth: props.drawerWidth
                    ? undefined
                    : props.maxWidth ?? FariMaxWidth,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "2rem",
                  width: "100%",
                  flex: "1 0 auto",
                })}
              >
                {props.children}
              </div>
            )}
          </div>

          {renderFooter()}
        </div>
      </Fade>
    );
  }

  function renderFooter() {
    return (
      <Box
        pb={props.pb ?? "0"}
        displayPrint="none"
        className={css({
          paddingTop: "1rem",
          marginLeft: props.drawerWidth ?? undefined,
        })}
      >
        <CookieConsent />
        </Box>
    );
  }

  function renderHeader() {
    const background = highlight.linearBackground;
    const color = highlight.color;
    return (
      <Box
        displayPrint="none"
        className={css({
          color: color,
          background: background,
          transition: theme.transitions.create(["color", "background"]),
        })}
      >
        <AppBar
          position="relative"
          className={css({
            color: "inherit",
            background: "inherit",
            boxShadow: "none",
            zIndex: zIndex.navBar,
          })}
        >
          <Box className={css({ padding: ".5rem 2.5rem" })}>
            <Toolbar
              className={css({
                margin: "0 auto",
                maxWidth: FariToolbarMaxWidth,
                minHeight: "72px",
                width: "100%",
                padding: "0",
                position: "relative",
                zIndex: zIndex.navBar,
              })}
            >
              <RouterLink
                to="/"
                data-cy="page.menu.home"
                className={css({
                  textDecoration: "none",
                })}
              >
                <img
                  alt="Fari"
                  className={css({
                    height: "2.5rem",
                    marginRight: "1rem",
                    cursor: "pointer",
                    display: props.hideHeaderLogo ? "none" : "inherit",
                  })}
                  src={Images.app}
                />
              </RouterLink>
              {isLive && (
                <Box>
                  <Grid container alignItems="center" spacing={3} wrap="nowrap">
                    <Grid item>
                      {props.live === LiveMode.Connecting && (
                        <SignalWifi0BarIcon />
                      )}
                      {props.live === LiveMode.Live && (
                        <SignalWifi4BarLockIcon />
                      )}
                    </Grid>
                    <Grid item>
                      <Box maxWidth="150px">
                        <Typography variant="subtitle1" noWrap>
                          {/*  */}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Hidden mdDown>{renderMenu(false)}</Hidden>
              <Hidden mdUp>
                {!isLive && (
                  <IconButton
                    color="inherit"
                    className={css({ padding: "0" })}
                    onClick={() => {
                      setMenuOpen(true);
                    }}
                    size="large"
                  >
                    <MenuIcon color="inherit" />
                  </IconButton>
                )}
              </Hidden>
              <Drawer
                anchor="bottom"
                classes={{
                  paper: css({
                    maxHeight: "80vh",
                  }),
                }}
                open={menuOpen}
                onClose={() => {
                  setMenuOpen(false);
                }}
              >
                <Box
                  p="1.5rem"
                  color={theme.palette.primary.main}
                  bgcolor={theme.palette.background.default}
                >
                  {renderMenu(true)}
                </Box>
              </Drawer>
              <Typography
                className={css({
                  flex: "1 1 auto",
                })}
              />
              
              {shouldDisplayRejoinButton && (
                <ThemeProvider theme={highlight.highlightTheme}>
                  <Button
                    color="primary"
                    onClick={() => {
                      history.push(`/play/${gameId}`);
                    }}
                    variant={"outlined"}
                    className={css({
                      minWidth: "10rem",
                    })}
                  >
                    <Typography variant="button" noWrap>
                      Rejoin&nbsp;Game
                    </Typography>
                  </Button>
                </ThemeProvider>
              )}
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
    );
  }

  function renderMenu(mobile: boolean) {
    const itemClass = mobile
      ? css({ textAlign: "center" })
      : css({ flex: "0 1 auto" });

    const smSize = 8;
    const xsSize = 12;

    return (
      <Grid
        container
        spacing={3}
        justifyContent={mobile ? "center" : undefined}
        alignItems="center"
      >
        {!isLive && (
          <>
            <Grid item xs={xsSize} sm={smSize} className={itemClass}>
              <PageNavLink
                label={t("menu.my-binder")}
                data-cy="page.menu.my-binder"
                onClick={() => {
                  myBinderManager.actions.open();
                }}
              />
            </Grid>
            <Grid item xs={xsSize} sm={smSize} className={itemClass}>
              <PageNavLink
                label={t("menu.tools")}
                data-cy="page.menu.tools"
                subNav={[
                  {
                    label: t("menu.tools"),
                    links: [
                      {
                        to: "/data",
                        label: t("menu.data"),
                        icon: <StorageIcon />,
                      },
                      {
                        to: "/dice",
                        label: t("menu.dice"),
                        icon: <Icons.FateDice />,
                        ["data-cy"]: "page.menu.tools.dice",
                      },
                      {
                        to: "/dice-pool",
                        label: t("menu.dice-pool"),
                        icon: <Icons.ThrowDice />,
                      },
                      {
                        to: "/story-builder",
                        label: "Story Builder",
                        icon: <LocalLibraryIcon />,
                      },
                    ],
                  },
                ]}
              />
            </Grid>
            <Grid item xs={xsSize} sm={smSize} className={itemClass}>
              <PageNavLink
                label={t("menu.resources")}
                subNav={[
                  {
                    label: "Fari",
                    links: [
                      {
                        to: "https://fari.canny.io/changelog",
                        label: t("menu.whats-new"),
                        icon: <FiberNewIcon />,
                        target: "_blank",
                      },
                      {
                        to: "/feature-requests",
                        label: t("menu.feature-requests"),
                        icon: <EmojiObjectsIcon />,
                      },
                      {
                        to: "/bugs",
                        label: t("menu.report-a-bug"),
                        icon: <BugReportIcon />,
                      },
                      {
                        to: "/discord",
                        label: t("menu.discord"),
                        icon: <ForumIcon />,
                        target: "_blank",
                      },
                    ],
                  },
                  {
                    label: "Documents",
                    links: [
                      {
                        to: "/fari-wiki",
                        label: t("menu.fari-wiki"),
                        icon: <InfoIcon />,
                      },
                      {
                        to: "/srds",
                        label: t("menu.srds"),
                        icon: <LibraryBooksIcon />,
                      },
                    ],
                  },
                  {
                    label: "Support Fari",
                    links: [
                      {
                        to: "https://www.patreon.com/bePatron?u=43408921",
                        label: t("menu.patreon"),
                        icon: <ThumbUpIcon />,
                        target: "_blank",
                      },
                      {
                        to: "https://ko-fi.com/rpdeshaies",
                        label: t("menu.ko-fi"),
                        icon: <LocalCafeIcon />,
                        target: "_blank",
                      },
                      {
                        to: "https://github.com/fariapp/fari",
                        label: t("menu.github"),
                        icon: <GitHubIcon />,
                        target: "_blank",
                      },
                    ],
                  },
                ]}
              />
            </Grid>
          </>
        )}

        <Grid item xs={xsSize} sm={smSize} className={itemClass}>
          <PageNavLink
            data-cy="page.menu.languages"
            tooltip={t("menu.languages")}
            label={<TranslateIcon />}
          >
            <Box>
              <Select
                fullWidth
                native
                value={currentLanguage}
                inputProps={{
                  ["data-cy"]: "app.languages",
                }}
                onChange={(e) => {
                  const newLanguage = e.target.value as string;
                  i18n.changeLanguage(newLanguage);
                  logger.setTag("language", newLanguage);
                }}
                variant="standard"
              >
                {Object.keys(PossibleLanguagesNames).map((languageKey) => {
                  const shouldRenderDev = languageKey === "dev" && env.isDev;
                  if (languageKey !== "dev" || shouldRenderDev) {
                    return (
                      <option key={languageKey} value={languageKey}>
                        {
                          PossibleLanguagesNames[
                            languageKey as IPossibleLanguages
                          ]
                        }
                      </option>
                    );
                  }
                })}
              </Select>
            </Box>
          </PageNavLink>
        </Grid>
        <Grid item xs={xsSize} sm={smSize} className={itemClass}>
          <PageNavLink
            data-cy="page.use-theme-from-system-preferences"
            tooltip={t("menu.use-theme-from-system-preferences")}
            onClick={() => {
              settingsManager.actions.setThemeMode(undefined);
            }}
            label={
              <>
                <ComputerIcon />
              </>
            }
          />
        </Grid>
        <Grid item xs={xsSize} sm={smSize} className={itemClass}>
          <PageNavLink
            data-cy="page.toggle-dark-mode"
            tooltip={t("menu.toggle-theme")}
            onClick={() => {
              if (settingsManager.state.themeMode === "dark") {
                settingsManager.actions.setThemeMode("light");
              } else {
                settingsManager.actions.setThemeMode("dark");
              }
            }}
            label={
              <>
                {settingsManager.state.themeMode === "dark" ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeIcon />
                )}
              </>
            }
          />
        </Grid>
      </Grid>
    );
  }
};

type IPageNavLink = {
  label: JSX.Element | string;
  target?: "_blank";
  ["data-cy"]?: string;
  to?: string;
  tooltip?: string;
  onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
};

function PageNavLink(
  props: IPageNavLink & {
    subNav?: Array<{
      label: JSX.Element | string;
      links: Array<IPageNavLink & { icon?: JSX.Element }>;
    }>;
    children?: JSX.Element;
  }
) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const highlight = useHighlight();
  const subNav = props.subNav ?? [];
  const hasSubNav = subNav.length > 0;
  const hasPopperContent = hasSubNav || !!props.children;
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

  const open = Boolean(anchorEl);

  function handleOpenSubNav(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    if (hasPopperContent) {
      if (!open) {
        setAnchorEl(event.currentTarget);
      } else {
        handleCloseSubNav();
      }
    }
  }

  function handleCloseSubNav() {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title={props.tooltip ?? ""}>
        <div>
          <AppLink
            data-cy={props["data-cy"]}
            target={props.target}
            className={css({
              "label": "PageNavLink",
              "display": "flex",
              "alignItems": "center",
              "color": "inherit",
              "fontWeight": theme.typography.fontWeightMedium,
              "fontSize": "1.1rem",
              "&:hover": {
                color: isSmall ? "inherit" : highlight.hover,
                textDecoration: "underline",
              },
            })}
            to={props.to}
            onClick={props.onClick ?? handleOpenSubNav}
          >
            {props.label}
            {hasPopperContent && <ExpandMoreIcon />}
          </AppLink>
        </div>
      </Tooltip>

      <Hidden mdDown>
        <Popover
          open={open}
          onClose={handleCloseSubNav}
          anchorEl={anchorEl}
          TransitionProps={{ timeout: theme.transitions.duration.shortest }}
          className={css({
            marginTop: "1rem",
          })}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box px="1.5rem" py=".5rem" minWidth="200px">
            <Box>
              <Box>{renderSubNav()}</Box>
              <Box>{props.children}</Box>
            </Box>
          </Box>
        </Popover>
      </Hidden>

      <Hidden mdUp>
        <Collapse in={open}>
          <Box mt=".5rem">
            <Paper elevation={2}>
              <Box p="1rem">
                <Box>{renderSubNav()}</Box>
                <Box>{props.children}</Box>
              </Box>
            </Paper>
          </Box>
        </Collapse>
      </Hidden>
    </>
  );

  function renderSubNav() {
    return (
      <>
        {props.subNav?.map((category, categoryIndex) => {
          return (
            <Box key={categoryIndex} mt=".5rem" mb="1.5rem">
              <Box display="flex">
                <FateLabel color="textSecondary" fontSize=".8rem">
                  {category.label}
                </FateLabel>
              </Box>
              {category.links.map((link, linkIndex) => {
                return (
                  <Box key={linkIndex} my=".5rem">
                    <Grid
                      container
                      wrap="nowrap"
                      spacing={1}
                      alignItems="center"
                    >
                      {link.icon && (
                        <Grid item>
                          <Box
                            display="flex"
                            className={css({
                              "& *": {
                                color: theme.palette.primary.main,
                              },
                            })}
                          >
                            {link.icon}
                          </Box>
                        </Grid>
                      )}
                      <Grid item>
                        <Tooltip title={link.tooltip ?? ""}>
                          <div
                            className={css({
                              textAlign: "left",
                            })}
                          >
                            <AppLink
                              to={link.to}
                              target={link.target}
                              data-cy={link["data-cy"]}
                              onClick={link.onClick}
                              className={css({
                                "color": theme.palette.primary.main,
                                "fontWeight": theme.typography.fontWeightMedium,

                                "fontSize": "1rem",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              })}
                            >
                              {link.label}
                            </AppLink>
                          </div>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </>
    );
  }
}
