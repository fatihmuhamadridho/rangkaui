import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress, ProgressSegment, ProgressStack, type ProgressVariant } from "./Progress";

const variants: ProgressVariant[] = ["primary", "secondary", "success", "danger", "warning", "info"];

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  args: { value: 50, "aria-label": "Example progress" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    variant: { control: "select", options: variants },
    striped: { control: "boolean" },
    animated: { control: "boolean" },
    showValue: { control: "boolean" },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Values: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    {[0, 25, 50, 75, 100].map((value) => <Progress key={value} value={value} aria-label={`${value}% complete`} />)}
  </div>,
};

export const CustomHeight: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem" }}>
    <Progress value={25} aria-label="Short progress" style={{ height: "0.5rem" }} />
    <Progress value={50} aria-label="Tall progress" style={{ height: "2rem" }} />
  </div>,
};

export const Labeled: Story = {
  render: () => <Progress value={25} label="25%" showValue aria-label="Quarter complete" />,
};

export const Backgrounds: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    {variants.map((variant) => <Progress key={variant} value={variant === "secondary" ? 50 : 25} variant={variant} showValue label={variant === "secondary" ? "50%" : "25%"} aria-label={`${variant} progress`} />)}
  </div>,
};

export const Stacked: Story = {
  render: () => <ProgressStack label="Stacked project progress">
    <ProgressSegment value={35} variant="success" label="Completed: 35%" />
    <ProgressSegment value={25} variant="info" label="In progress: 25%" />
    <ProgressSegment value={20} variant="warning" label="Review: 20%" />
  </ProgressStack>,
};

export const Striped: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    {variants.map((variant) => <Progress key={variant} value={variant === "danger" ? 100 : 50} variant={variant} striped aria-label={`${variant} striped progress`} />)}
  </div>,
};

export const AnimatedStripes: Story = {
  args: { value: 75, striped: true, animated: true },
};
