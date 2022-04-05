import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { ContentEditable } from "../../../../../../components/ContentEditable/ContentEditable";
import { IBlockComponentProps } from "../../types/IBlockComponentProps";

export function BlockInfoText(
  props: IBlockComponentProps<IInfoTextBlock> & {}
) {
  return (
    <>
      <Box>
        <Box>
          <Typography
          >
            <ContentEditable
              readonly={props.readonly || !props.advanced}
              border={props.advanced}
              data-cy={`${props.dataCy}.value`}
              value={props.block.value}
              onChange={(value) => {
                props.onValueChange(value);
              }}
            />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
BlockInfoText.displayName = "BlockInfoText";
