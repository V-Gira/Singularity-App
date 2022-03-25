import { previewContentEditable } from "../../../../../../components/ContentEditable/ContentEditable";
import {
  BlockType,
  IBlock,
  IDicePoolBlock,
  ISkillBlock,
  ISkillTrackerBlock,
} from "../../../../../../domains/character/types";
import { IRollGroup } from "../../../../../../domains/dice/Dice";

export const BlockSelectors = {
  getRollGroupFromBlock(
    block: IBlock & (IDicePoolBlock | ISkillBlock | ISkillTrackerBlock)
  ): IRollGroup {
    let modifier: number | undefined;
    let commands = block.meta.commands;
    if (block.type === BlockType.Skill && !block.meta.hideModifier) {
      modifier = parseInt(block.value) || 0;
    }
    if (block.type === BlockType.SkillTracker) {
      commands = Array(parseInt(block.value)).fill(commands);
    }
    return {
      label: previewContentEditable({ value: block.label }),
      modifier: modifier,
      commandSets:
        commands?.map((commandGroupId) => ({
          id: commandGroupId,
        })) ?? [],
    };
  },
};
