import { css } from "@emotion/css";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useZIndex } from "../../constants/zIndex";
import { useDecks } from "../../routes/StoryBuilder/hooks/useDecks";
import {
  StoryDecks,
  StoryDeckTags,
} from "../../routes/StoryBuilder/StoryBuilderRoute";

import { DiceFab } from "../DiceFab/DiceFab";

type DiceFabProps = Parameters<typeof DiceFab>[0];

export function Toolbox(props: {
  dice: DiceFabProps;
  hideDefaultRightActions?: boolean;
  leftActions?: JSX.Element;
  centerActions?: JSX.Element;
  rightActions?: JSX.Element;
}) {
  const theme = useTheme();
  const zIndex = useZIndex();
  const decksManager = useDecks();
  const [openStoryBuilderDecks, setOpenStoryBuilderDecks] = useState(false);

  return (
    <>
      {renderStoryBuilderDecksDialog()}
      <Box
        className={css({
          width: "100%",
          height: "6rem",
          position: "fixed",
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[16],
          zIndex: zIndex.drawer,
          bottom: "0",
          left: "0",
        })}
      >
        <Box
          className={css({
            maxWidth: "1920px",
            height: "100%",
            margin: "0 auto",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          })}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className={css({ height: "100%" })}
          >
            {/* LEFT */}
            <Grid item>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item>
                  <DiceFab
                    onRoll={props.dice.onRoll}
                    onRollPool={props.dice.onRollPool}
                    rollsForDiceBox={props.dice.rollsForDiceBox}
                  />
                </Grid>
                {props.leftActions}
              </Grid>
            </Grid>
            {/* CENTER */}
            <Grid item>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                {props.centerActions}
              </Grid>
            </Grid>
            {/* RIGHT */}
            {!props.hideDefaultRightActions && (
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  {props.rightActions}
                  {/* <Grid item>
                    <Tooltip title="Story Builder Decks">
                      <IconButton
                        className={css({
                          border: `1px solid ${theme.palette.primary.main}`,
                          boxShadow: theme.shadows[2],
                        })}
                        onClick={() => {
                          setOpenStoryBuilderDecks(true);
                        }}
                        size="large"
                      >
                        <LocalLibraryIcon
                          color="primary"
                          className={css({ width: "2rem", height: "2rem" })}
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid> */}
                </Grid>
              </Grid>
            )}{" "}
          </Grid>
        </Box>
      </Box>
    </>
  );

  function renderStoryBuilderDecksDialog() {
    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        open={openStoryBuilderDecks}
        onClose={() => {
          setOpenStoryBuilderDecks(false);
        }}
      >
        <DialogContent>
          <Box py="2rem">
            <Box pb="1rem">
              <StoryDeckTags decksManager={decksManager} />
            </Box>
            <Box>
              <StoryDecks decksManager={decksManager} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setOpenStoryBuilderDecks(false);
            }}
            color="primary"
          >
            {"Close"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
