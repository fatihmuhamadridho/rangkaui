import type { Meta, StoryObj } from "@storybook/react-vite";

import { Popover, PopoverContent, PopoverTrigger, type PopoverPlacement } from "./Popover";

const placements: PopoverPlacement[] = ["top", "right", "bottom", "left"];

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Popover>
    <PopoverTrigger>Click to toggle popover</PopoverTrigger>
    <PopoverContent title="Popover title">And here's some amazing content. It's very engaging. Right?</PopoverContent>
  </Popover>,
};

export const FourDirections: Story = {
  render: () => <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem", padding: "8rem 2rem" }}>
    {placements.map((placement) => <Popover key={placement} placement={placement}>
      <PopoverTrigger style={{ background: "#6c757d", borderColor: "#6c757d" }}>Popover on {placement}</PopoverTrigger>
      <PopoverContent title={`Popover on ${placement}`}>Popover content placed {placement}.</PopoverContent>
    </Popover>)}
  </div>,
};

export const CustomContent: Story = {
  render: () => <Popover placement="right" defaultOpen>
    <PopoverTrigger style={{ background: "#6c757d", borderColor: "#6c757d" }}>Custom popover</PopoverTrigger>
    <PopoverContent title="Custom popover" style={{ borderColor: "#6f42c1", background: "#f4efff" }}>
      This popover can contain <strong>custom React content</strong> and be styled with CSS.
    </PopoverContent>
  </Popover>,
};

export const HoverTrigger: Story = {
  render: () => <Popover trigger="hover" placement="bottom">
    <PopoverTrigger>Hover or focus me</PopoverTrigger>
    <PopoverContent title="Hover popover">Popover also opens when trigger receives focus.</PopoverContent>
  </Popover>,
};

export const DisabledTrigger: Story = {
  render: () => <Popover trigger="hover">
    <PopoverTrigger disabled>Disabled button</PopoverTrigger>
    <PopoverContent>Hover and focus trigger behavior can provide feedback for unavailable actions.</PopoverContent>
  </Popover>,
};
