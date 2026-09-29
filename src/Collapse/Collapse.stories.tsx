import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Collapse, CollapsePanel, CollapseTrigger } from "./Collapse";

const meta = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Collapse>
    <CollapseTrigger style={{ padding: "0.5rem 1rem", border: 0, borderRadius: "0.375rem", background: "#0d6efd", color: "white" }}>Toggle content</CollapseTrigger>
    <CollapsePanel><div style={{ maxWidth: "32rem", padding: "1rem", marginTop: "0.5rem", border: "1px solid #dee2e6", borderRadius: "0.375rem" }}>This content expands and collapses with an accessible trigger.</div></CollapsePanel>
  </Collapse>,
};

export const MultipleTargets: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem" }}>
    {[1, 2, 3].map((number) => <Collapse key={number}>
      <CollapseTrigger style={{ padding: "0.5rem 1rem", border: 0, borderRadius: "0.375rem", background: "#0d6efd", color: "white" }}>Toggle element {number}</CollapseTrigger>
      <CollapsePanel><div style={{ padding: "1rem", marginTop: "0.5rem", border: "1px solid #dee2e6" }}>Collapsible content {number}.</div></CollapsePanel>
    </Collapse>)}
  </div>,
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [open, setOpen] = useState(false);
      return <Collapse open={open} onOpenChange={setOpen}>
        <CollapseTrigger style={{ padding: "0.5rem 1rem", border: 0, borderRadius: "0.375rem", background: "#6c757d", color: "white" }}>{open ? "Hide" : "Show"} controlled content</CollapseTrigger>
        <CollapsePanel><div style={{ padding: "1rem" }}>Open state controlled by the parent.</div></CollapsePanel>
      </Collapse>;
    };
    return <ControlledExample />;
  },
};

export const Horizontal: Story = {
  render: () => <Collapse horizontal>
    <CollapseTrigger style={{ padding: "0.5rem 1rem", border: 0, borderRadius: "0.375rem", background: "#0d6efd", color: "white" }}>Toggle width</CollapseTrigger>
    <CollapsePanel><div style={{ padding: "1rem", marginLeft: "0.5rem", background: "#cff4fc" }}>This panel collapses horizontally.</div></CollapsePanel>
  </Collapse>,
};
