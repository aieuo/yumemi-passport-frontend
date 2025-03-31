import type { StorybookConfig } from "@storybook/nextjs";
import "../src/app/globals.css";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["..\\public"],
};
export default config;
