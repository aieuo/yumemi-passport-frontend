import { Meta, StoryObj } from "@storybook/react";
import MenuButton from "./MenuButton";

const meta: Meta<typeof MenuButton> = {
  title: "components/MenuButton",
  component: MenuButton,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
