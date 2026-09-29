import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tooltip, TooltipLink, TooltipTrigger, type TooltipPlacement } from "./Tooltip";

const placements: TooltipPlacement[] = ["top", "right", "bottom", "left"];

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Tooltip content="Tooltip on top"><TooltipTrigger>Hover or focus me</TooltipTrigger></Tooltip>,
};

export const Directions: Story = {
  render: () => <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem", padding: "5rem 1rem" }}>
    {placements.map((placement) => <Tooltip key={placement} placement={placement} content={`Tooltip on ${placement}`}>
      <TooltipTrigger>{placement}</TooltipTrigger>
    </Tooltip>)}
  </div>,
};

export const OnLinks: Story = {
  render: () => <p style={{ maxWidth: "40rem", lineHeight: 1.7 }}>
    Placeholder text to demonstrate some <Tooltip content="Default tooltip"><TooltipLink href="#inline">inline links</TooltipLink></Tooltip> with tooltips. This is just filler, no killer.
  </p>,
};

export const CustomContent: Story = {
  render: () => <Tooltip content={<><em>Tooltip</em> with <strong>HTML</strong> content.</>} placement="right">
    <TooltipTrigger>Tooltip with rich content</TooltipTrigger>
  </Tooltip>,
};

export const ClickTrigger: Story = {
  render: () => <Tooltip content="Click outside or press Escape to close." trigger="click" placement="bottom">
    <TooltipTrigger>Click to toggle tooltip</TooltipTrigger>
  </Tooltip>,
};
