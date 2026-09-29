import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner, type SpinnerColor } from "./Spinner";

const colors: SpinnerColor[] = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["border", "grow"] },
    color: { control: "select", options: [undefined, ...colors] },
    size: { control: "select", options: [undefined, "sm", "md"] },
    label: { control: "text" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { variant: "border", color: "primary" } };

export const BorderVariants: Story = {
  render: () => <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
    <Spinner />
    {colors.map((color) => <Spinner key={color} color={color} />)}
  </div>,
};

export const GrowingVariants: Story = {
  render: () => <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
    <Spinner variant="grow" />
    {colors.map((color) => <Spinner key={color} variant="grow" color={color} />)}
  </div>,
};

export const Sizes: Story = {
  render: () => <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <Spinner size="sm" color="primary" />
    <Spinner color="primary" />
    <Spinner variant="grow" size="sm" color="dark" />
    <Spinner variant="grow" color="dark" />
  </div>,
};

export const InButtons: Story = {
  render: () => <div style={{ display: "flex", gap: "0.5rem" }}>
    <button type="button" disabled style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.75rem", border: 0, borderRadius: "0.375rem", background: "#0d6efd", color: "white" }}>
      <Spinner size="sm" label="Loading" /> Loading...
    </button>
    <button type="button" disabled aria-label="Loading" style={{ display: "inline-flex", alignItems: "center", padding: "0.375rem 0.75rem", border: 0, borderRadius: "0.375rem", background: "#0d6efd", color: "white" }}>
      <Spinner size="sm" />
    </button>
  </div>,
};
