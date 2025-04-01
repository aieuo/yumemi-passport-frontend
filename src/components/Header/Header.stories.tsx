import { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "components/Header",
  component: Header,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
