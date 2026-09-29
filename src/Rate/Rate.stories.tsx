import type { Meta, StoryObj } from "@storybook/react-vite";

import { Rate } from "./Rate";

const meta = {
  title: "Components/Rate",
  component: Rate,
  parameters: { layout: "padded" },
  args: { defaultValue: 3, count: 5, "aria-label": "Rate this item" },
  argTypes: {
    icon: { control: "select", options: ["star", "face"] },
    count: { control: { type: "number", min: 1, max: 10 } },
    allowHalf: { control: "boolean" },
    allowClear: { control: "boolean" },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["small", "medium", "large"] },
  },
} satisfies Meta<typeof Rate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const HalfRatings: Story = {
  render: () => <div style={{ display: "grid", gap: "1.5rem" }}>
    {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => <Rate key={value} value={value} allowHalf readOnly aria-label={`${value} out of 5 stars`} />)}
  </div>,
};

export const FaceRatings: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem" }}>
    {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((value) => <Rate key={value} icon="face" count={5} value={value} allowHalf readOnly aria-label={`${value} out of 5`} />)}
  </div>,
};

export const Sizes: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem" }}>
    <Rate size="small" defaultValue={3} aria-label="Small rating" />
    <Rate defaultValue={4} aria-label="Medium rating" />
    <Rate size="large" defaultValue={5} aria-label="Large rating" />
  </div>,
};

export const ReadOnly: Story = { args: { value: 4.5, allowHalf: true, readOnly: true } };

export const Disabled: Story = { args: { value: 3, disabled: true } };
