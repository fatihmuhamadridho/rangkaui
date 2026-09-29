import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputNumber } from "./InputNumber";

const meta = {
  title: "Components/Input Number",
  component: InputNumber,
  parameters: { layout: "padded" },
  args: { defaultValue: 3, "aria-label": "Quantity" },
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Addons: Story = {
  render: () => <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
    <InputNumber defaultValue={3} prefix="+" aria-label="Quantity" />
    <InputNumber defaultValue={3} suffix="$" aria-label="Amount" />
    <InputNumber defaultValue={3} prefix="$" suffix="USD" aria-label="Price" />
    <InputNumber defaultValue={3} prefix="+" suffix="$" aria-label="Price with add button" />
  </div>,
};

export const Clearable: Story = { args: { defaultValue: 3, clearable: true } };

export const Sizes: Story = {
  render: () => <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
    <InputNumber size="small" defaultValue={3} aria-label="Small quantity" />
    <InputNumber defaultValue={3} aria-label="Medium quantity" />
    <InputNumber size="large" defaultValue={3} aria-label="Large quantity" />
  </div>,
};

export const BoundsAndStep: Story = { args: { defaultValue: 3, min: 0, max: 10, step: 0.5 } };

export const Disabled: Story = { args: { defaultValue: 3, disabled: true, prefix: "+", suffix: "$" } };
