import { Meta, StoryObj } from "@storybook/react";
import PopulationGraph, { PopulationGraphData } from "./PopulationGraph";

const meta: Meta<typeof PopulationGraph> = {
  title: "components/PopulationGraph",
  component: PopulationGraph,
  decorators: [
    (Story) => (
      <div style={{ width: "800px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof meta>;

const generateData = () => [
  { year: 1980, value: Math.floor(Math.random() * 1000) },
  { year: 1990, value: Math.floor(Math.random() * 1000) },
  { year: 2000, value: Math.floor(Math.random() * 1000) },
  { year: 2010, value: Math.floor(Math.random() * 1000) },
  { year: 2020, value: Math.floor(Math.random() * 1000) },
];

const data1: PopulationGraphData = {
  name: "東京",
  data: generateData(),
};

const data2: PopulationGraphData = {
  name: "大阪",
  data: generateData(),
};

export const Default: Story = {
  args: {
    populations: [data1],
  },
};

export const MultipleData: Story = {
  args: {
    populations: [data1, data2],
  },
};

export const Empty: Story = {
  args: {
    populations: [],
  },
};
