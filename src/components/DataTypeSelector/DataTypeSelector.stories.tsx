import { DATA_TYPES } from "@/consts/consts";
import { Meta, StoryObj } from "@storybook/react";
import DataTypeSelector from "./DataTypeSelector";

const meta: Meta<typeof DataTypeSelector> = {
  title: "components/DataTypeSelector",
  component: DataTypeSelector,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    types: DATA_TYPES,
  },
};
