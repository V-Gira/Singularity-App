import {
  IBlock,
  IDicePoolBlock,
  ISkillBlock,
  ISkillTrackerBlock,
} from "../../../../../../domains/character/types";
import {
  CommmandSetOptions,
  IDiceCommandSetId,
} from "../../../../../../domains/dice/Dice";

export const DiceCommandGroup = {
  getCommandSetById(commandId: IDiceCommandSetId) {
    const result = CommmandSetOptions[commandId];
    return result;
  },
  getCommandSetOptionsFromBlock(
    block: IBlock & (IDicePoolBlock | ISkillBlock | ISkillTrackerBlock)
  ) {
    const result =
      block.meta?.commands?.map((commandId) => {
        return this.getCommandSetById(commandId);
      }) ?? [];

    return result;
  },
};
