import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React, { useContext, useState } from "react";
import { ContentEditable } from "../../../../../../components/ContentEditable/ContentEditable";
import { FateLabel } from "../../../../../../components/FateLabel/FateLabel";
import { Delays } from "../../../../../../constants/Delays";
import { DiceContext } from "../../../../../../contexts/DiceContext/DiceContext";
import { ISkillTrackerBlock } from "../../../../../../domains/character/types";
import { CommmandSetOptions } from "../../../../../../domains/dice/Dice";
import { Icons } from "../../../../../../domains/Icons/Icons";
import { useLazyState } from "../../../../../../hooks/useLazyState/useLazyState";
import { useTranslate } from "../../../../../../hooks/useTranslate/useTranslate";
import { BlockSelectors } from "../../domains/BlockSelectors/BlockSelectors";
import {
  IBlockActionComponentProps,
  IBlockComponentProps,
} from "../../types/IBlockComponentProps";
import { BlockToggleMeta } from "../BlockToggleMeta";
import { DiceSelectorForCharacterSheet } from "../DiceSelectorForCharacterSheet";
import { Pool } from "./BlockDicePool";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export function BlockSkillTracker(props: IBlockComponentProps<ISkillTrackerBlock>) {
  const { t } = useTranslate();
  const theme = useTheme();

  const diceManager = useContext(DiceContext);
  const [hover, setHover] = useState(false);
  const [blockValue, setBlockValue] = useLazyState({
    value: props.block.value,
    delay: Delays.field,
    onChange: (newValue) => {
      props.onValueChange(newValue);
    },
  });
  const isSelected = diceManager.state.pool.some(
    (p) => p.blockId === props.block.id
  );
  const numberOfCommands = props.block.meta?.commands?.length ?? 0;
  const hasSkillPoints = blockValue.filter(x => x.checked).length > 0;
  const hasCommands = numberOfCommands > 0 && hasSkillPoints;
  const [firstCommandSet] =
    props.block.meta?.commands?.map((commandId) => {
      return CommmandSetOptions[commandId];
    }) ?? [];
  const rollGroup = BlockSelectors.getRollGroupFromBlock(props.block);
  const shouldDisplayNoCommandsWarning = hasCommands || !props.advanced;
  const RollIcon = hasSkillPoints ? firstCommandSet?.icon ?? Icons.ThrowDice : Icons.ThrowDice ;

  return (
    <>
      <Box>
        <Grid container spacing={1} alignItems="center" wrap="nowrap">
          <Grid item>
            {props.readonly ? (
              <RollIcon className={css({ fontSize: "2rem" })} />
            ) : (
              <Pool
                tooltipTitle={
                  shouldDisplayNoCommandsWarning
                    ? t("character-dialog.skill-block.roll")
                    : t("character-dialog.skill-block.missing-dice-commands")
                }
                fontSize="1.2rem"
                borderRadius="8px"
                selected={isSelected}
                clickable={!props.readonly}
                borderStyle={"solid"}
                className={css({
                  borderColor: shouldDisplayNoCommandsWarning
                    ? "inherit"
                    : theme.palette.warning.light,
                })}
                onContextMenu={(event) => {
                  event.preventDefault();
                  if (!hasCommands) {
                    return;
                  }

                  diceManager.actions.setOptions({ listResults: false });
                  diceManager.actions.addOrRemovePoolElement({
                    blockId: props.block.id,
                    blockType: props.block.type,
                    label: props.block.label,
                    rollGroup: rollGroup,
                  });
                }}
                onClick={() => {
                  if (!hasCommands) {
                    return;
                  }
                  const diceRollResult = diceManager.actions.roll([rollGroup], {
                    listResults: false,
                  });
                  props.onRoll(diceRollResult);
                }}
              >
                <RollIcon
                  className={css({
                    fontSize: "2.3rem",
                  })}
                />
              </Pool>
            )}
          </Grid>
          <Grid item xs>
            <FateLabel
              className={css({ display: "inline-block", width: "100%" })}
            >
              <ContentEditable
                data-cy={`${props.dataCy}.label`}
                readonly={props.readonly || !props.advanced}
                border={props.advanced}
                value={props.block.label}
                onChange={(value) => {
                  props.onLabelChange(value);
                }}
              />
            </FateLabel>
          </Grid>
        </Grid>
          <SlotTracker />
      </Box>
    </>
  );

  function SlotTracker() {

  
    function handleAddBox() {
      setBlockValue((draft) => {  
        return [
          ...draft,
          {
            checked: false,
          },
        ];
      });
    }
  
    function handleRemoveBox() {
      setBlockValue((draft) => {
        return draft.filter((box, boxIndex, boxes) => {
          return boxIndex !== boxes.length - 1;
        });
      });
    }
  
    function handleToggleBox(boxIndexToToggle: number) {
      setBlockValue((draft) => {
        return draft.map((box, boxIndex) => {
          if (boxIndex === boxIndexToToggle) {
            return {
              ...box,
              checked: !box.checked,
            };
          }
          return box;
        });
      });
    }
  
    return (
      <>
        <Box
          onPointerEnter={() => {
            setHover(true);
          }}
          onPointerLeave={() => {
            setHover(false);
          }}
        >
          {(!props.readonly) && (
            <Box>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                wrap="nowrap"
                spacing={1}
              >
                {!props.readonly && (
                  <Fade in={hover}>
                    <Grid item>
                      <Tooltip
                        title={t("character-dialog.control.remove-box")}
                      >
                        <IconButton
                          size="small"
                          color="inherit"
                          data-cy={`${props.dataCy}.remove-box`}
                          onClick={() => {
                            handleRemoveBox();
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Fade>
                )}
                {renderAsTrack()}
                {!props.readonly && (
                  <Fade in={hover}>
                    <Grid item>
                      <Tooltip
                        title={t("character-dialog.control.add-box")}
                      >
                        <IconButton
                          color="inherit"
                          data-cy={`${props.dataCy}.add-box`}
                          size="small"
                          onClick={() => {
                            handleAddBox();
                          }}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Fade>
                )}
              </Grid>
            </Box>
          )}
  
          
        </Box>
      </>
    );
  
    function renderAsTrack() {
      return (
        <Grid container justifyContent="center" spacing={1}>
          {blockValue.map((box, boxIndex) => {
            return (
              <Grid item key={boxIndex}>
                <Box
                  className={css({
                    display: "flex",
                    justifyContent: "center",
                  })}
                >
                  <Checkbox
                    data-cy={`${props.dataCy}.box.${boxIndex}.value`}
                    icon={<CircleOutlinedIcon htmlColor="currentColor" />}
                    checkedIcon={<CircleIcon htmlColor="currentColor" />}
                    checked={box.checked}
                    disabled={props.readonly}
                    color="default"
                    className={css({
                      color: "inherit",
                      padding: "0",
                    })}
                    onChange={() => {
                      handleToggleBox(boxIndex);
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      );
    }
  }

}
BlockSkillTracker.displayName = "BlockSkillTracker";

export function BlockSkillTrackerActions(
  props: IBlockActionComponentProps<ISkillTrackerBlock>
) {
  const theme = useTheme();
  const { t } = useTranslate();

  const commands =  props.block.meta.commands || [];

  return (
    <>
      <Grid item>
        <DiceSelectorForCharacterSheet
          commandSetIds={commands}
          onChange={(newCommandIds) => {
            props.onMetaChange({
              ...props.block.meta,
              commands: newCommandIds,
            });
          }}
          render={(diceSelectorProps) => (
            <Tooltip title={commands.join(" + ")}>
              <Link
                component="button"
                variant="caption"
                className={css({
                  color: theme.palette.primary.main,
                })}
                onClick={(e: any) => {
                  if (!diceSelectorProps.open) {
                    diceSelectorProps.openMenu(e);
                  } else {
                    diceSelectorProps.closeMenu();
                  }
                }}
                underline="hover"
              >
                {t("character-dialog.control.set-dice")}
              </Link>
            </Tooltip>
          )}
        />
      </Grid>
      <Grid item>
        <Link
          component="button"
          variant="caption"
          className={css({
            color: theme.palette.primary.main,
          })}
          onClick={() => {
            props.onMetaChange({
              ...props.block.meta,
              checked:
                props.block.meta.checked === undefined ? false : undefined,
            });
          }}
          underline="hover"
        >
          {props.block.meta.checked === undefined
            ? t("character-dialog.control.add-toggle")
            : t("character-dialog.control.remove-toggle")}
        </Link>
      </Grid>
    </>
  );
}

BlockSkillTrackerActions.displayName = "BlockSkillTrackerActions";

