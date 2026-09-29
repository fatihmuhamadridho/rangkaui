import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "./Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: { layout: "padded" },
  args: { min: 0, max: 100, defaultValue: 20, "aria-label": "Example range" },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Disabled: Story = { args: { defaultValue: 20, disabled: true, "aria-label": "Disabled range" } };

export const MinAndMax: Story = { args: { min: 0, max: 5, defaultValue: 1, "aria-label": "Range from zero to five" } };

export const Steps: Story = { args: { min: 0, max: 5, step: 0.5, defaultValue: 0.5, "aria-label": "Range with half steps" } };

export const WithValue: Story = { args: { defaultValue: 45, showValue: true, "aria-label": "Volume" } };

export const Labelled: Story = { args: { label: "Volume", defaultValue: 65, showValue: true, id: "volume-range" } };
