import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button";
import { Toast, ToastContainer, type ToastVariant } from "./Toast";

const variants: ToastVariant[] = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "padded" },
  args: { title: "Bootstrap", children: "Hello, world! This is a toast message." },
  argTypes: {
    variant: { control: "select", options: variants },
    autohide: { control: "boolean" },
    delay: { control: "number" },
    closeButton: { control: "boolean" },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LiveExample: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return <div>
      <Button onClick={() => setVisible(true)}>Show toast</Button>
      {visible && <Toast title="Bootstrap" autohide onClose={() => setVisible(false)}>
        Hello, world! This is a toast message.
      </Toast>}
    </div>;
  },
};

export const Translucent: Story = {
  render: () => <Toast title="Bootstrap" style={{ opacity: 0.9 }}>
    Hello, world! This is a toast message.
  </Toast>,
};

export const Stacking: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem", width: "22rem" }}>
    <Toast title="Bootstrap">See? Just like this.</Toast>
    <Toast title="Bootstrap">Heads up, toasts will stack automatically.</Toast>
  </div>,
};

export const ColorSchemes: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem", width: "22rem" }}>
    {variants.map((variant) => <Toast key={variant} variant={variant} title={variant}>{`This is a ${variant} toast message.`}</Toast>)}
  </div>,
};

export const Placement: Story = {
  render: () => <div style={{ position: "relative", height: "18rem", background: "#212529" }}>
    <ToastContainer placement="top-end">
      <Toast title="Bootstrap">Hello, world! This is a toast message.</Toast>
      <Toast title="Bootstrap">Heads up, toasts will stack automatically.</Toast>
    </ToastContainer>
  </div>,
};

export const AutoHide: Story = {
  render: () => <Toast title="Auto dismiss" autohide delay={3000}>
    This toast closes automatically after three seconds.
  </Toast>,
};
