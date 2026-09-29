import type { Meta, StoryObj } from "@storybook/react-vite";

import { Alert, type AlertVariant } from "./Alert";

const variants: AlertVariant[] = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  args: { children: "A simple alert—check it out!" },
  argTypes: { variant: { control: "select", options: variants } },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const VariantMatrix: Story = {
  render: () => (
    <div>
      {variants.map((variant) => <Alert key={variant} variant={variant}>A simple {variant} alert—check it out!</Alert>)}
    </div>
  ),
};

export const Dismissible: Story = {
  args: { variant: "success", dismissible: true, children: "Nice, you triggered this alert message!" },
};

export const WithAdditionalContent: Story = {
  args: {
    variant: "success",
    title: "Well done!",
    children: <><p>Aww yeah, you successfully read this important alert message.</p><hr /><p>Whenever you need to, be sure to use margin utilities to keep things tidy.</p></>,
  },
};
