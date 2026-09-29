import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./Select";

const options = <>
  <option value="" disabled>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</>;

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "padded" },
  args: { "aria-label": "Example select" },
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    multiple: { control: "boolean" },
    nativeSize: { control: "number" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <Select {...args}>{options}</Select> };

export const Sizes: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    <Select size="large" aria-label="Large select">{options}</Select>
    <Select aria-label="Default select">{options}</Select>
    <Select size="small" aria-label="Small select">{options}</Select>
  </div>,
};

export const Multiple: Story = { render: () => <Select multiple aria-label="Multiple select">{options}</Select> };

export const Listbox: Story = { render: () => <Select nativeSize={3} aria-label="Three-row select">{options}</Select> };

export const Disabled: Story = { render: () => <Select disabled aria-label="Disabled select">{options}</Select> };
