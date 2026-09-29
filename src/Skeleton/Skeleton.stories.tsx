import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton, type SkeletonColor } from "./Skeleton";

const colors: SkeletonColor[] = ["default", "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  args: { width: "12rem", animation: "glow" },
  argTypes: {
    animation: { control: "select", options: ["none", "glow", "wave"] },
    size: { control: "select", options: [undefined, "xs", "sm", "md", "lg"] },
    color: { control: "select", options: colors },
    width: { control: "text" },
    as: { control: "select", options: ["span", "div"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LoadingCard: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 10rem)", gap: "3rem" }}>
      <article style={{ overflow: "hidden", border: "1px solid #dee2e6", borderRadius: "0.375rem" }}>
        <Skeleton as="div" width="100%" style={{ height: "6.5rem", opacity: 0.55, backgroundColor: "#198754" }} />
        <div style={{ display: "grid", gap: "0.5rem", padding: "0.5rem" }}>
          <Skeleton as="div" width="6rem" />
          <Skeleton as="div" width="100%" size="sm" />
          <Skeleton as="div" width="85%" size="sm" />
          <Skeleton as="div" width="4rem" style={{ height: "1.75rem", borderRadius: "0.375rem", opacity: 0.65, backgroundColor: "#0d6efd" }} />
        </div>
      </article>
      <article aria-label="Loading card" style={{ overflow: "hidden", border: "1px solid #dee2e6", borderRadius: "0.375rem" }}>
        <Skeleton as="div" width="100%" style={{ height: "6.5rem" }} />
        <div style={{ display: "grid", gap: "0.5rem", padding: "0.5rem" }}>
          <Skeleton as="div" width="4rem" />
          <Skeleton as="div" width="100%" size="sm" />
          <Skeleton as="div" width="100%" size="sm" />
          <Skeleton as="div" width="90%" size="sm" />
          <Skeleton as="div" width="3.5rem" style={{ height: "1.75rem", borderRadius: "0.375rem" }} />
        </div>
      </article>
    </div>
  ),
};

export const Widths: Story = {
  render: () => <div style={{ display: "grid", gap: "0.4rem" }}>
    <Skeleton as="div" width="32%" />
    <Skeleton as="div" width="50%" />
    <Skeleton as="div" width="16rem" />
  </div>,
};

export const Colors: Story = {
  render: () => <div style={{ display: "grid", gap: "0.4rem" }}>
    {colors.map((color) => <Skeleton key={color} as="div" color={color} width="100%" />)}
  </div>,
};

export const Sizes: Story = {
  render: () => <div style={{ display: "grid", gap: "0.4rem" }}>
    {(["lg", "md", "sm", "xs"] as const).map((size) => <Skeleton key={size} as="div" size={size} width="100%" />)}
  </div>,
};

export const Animations: Story = {
  render: () => <div style={{ display: "grid", gap: "0.75rem" }}>
    <Skeleton as="div" animation="glow" width="100%" />
    <Skeleton as="div" animation="wave" width="100%" />
  </div>,
};
