import CheckBox from "@/app/components/CheckBox/CheckBox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CheckBox> = {
  title: "components/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChecked: { action: "checked changed" },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "チェックボックス",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "チェックボックス",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "チェックボックス",
    disabled: true,
  },
};
