import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, type BadgeVariant } from "./Badge";

const variants: BadgeVariant[] = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "padded" },
  args: { children: "New" },
  argTypes: {
    variant: { control: "select", options: variants },
    pill: { control: "boolean" },
    position: { control: "select", options: [undefined, "top-start", "top-end", "bottom-start", "bottom-end"] },
    dot: { control: "boolean" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const BackgroundColors: Story = {
  render: () => <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>{variants.map((variant) => <Badge key={variant} variant={variant}>{variant}</Badge>)}</div>,
};

export const HeadingSizes: Story = {
  render: () => <div>{[1, 2, 3, 4, 5, 6].map((level) => {
    const Heading = `h${level}` as keyof JSX.IntrinsicElements;
    return <Heading key={level}>Example heading <Badge>New</Badge></Heading>;
  })}</div>,
};

export const PositionedCounters: Story = {
  render: () => <div style={{ display: "flex", gap: "2rem", padding: "0.5rem" }}>
    <button type="button" style={{ position: "relative" }}>Inbox <Badge variant="danger" pill position="top-end">99+</Badge></button>
    <button type="button" style={{ position: "relative" }}>Profile <Badge variant="danger" position="top-end" dot aria-label="New alerts" /></button>
  </div>,
};

export const PillBadges: Story = {
  render: () => <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>{variants.map((variant) => <Badge key={variant} variant={variant} pill>{variant}</Badge>)}</div>,
};
