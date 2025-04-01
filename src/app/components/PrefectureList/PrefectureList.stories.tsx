import PrefectureList from "@/app/components/PrefectureList/PrefectureList";
import { Prefecture } from "@/types/data";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PrefectureList> = {
  title: "components/PrefectureList",
  component: PrefectureList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const prefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
  { prefCode: 4, prefName: "宮城県" },
  { prefCode: 5, prefName: "秋田県" },
] as Prefecture[];

export const Default: Story = {
  args: {
    prefectures: prefectures,
    selectedPrefectureCodes: [],
  },
};

export const Selected: Story = {
  args: {
    prefectures: prefectures,
    selectedPrefectureCodes: [1, 2],
  },
};
