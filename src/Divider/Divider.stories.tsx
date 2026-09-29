import type { Meta, StoryObj } from "@storybook/react-vite";

import { Divider, type DividerAlign } from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: { layout: "padded" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    variant: { control: "inline-radio", options: ["solid", "dashed"] },
    align: { control: "inline-radio", options: ["left", "center", "right"] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Examples: Story = {
  render: () => (
    <div>
      <Divider />
      <Divider variant="dashed" />
      {(["left", "center", "right"] as DividerAlign[]).map((align) => (
        <div key={align}>
          <Divider align={align}>Solid {align} text</Divider>
          <Divider align={align} variant="dashed">Dashed {align} text</Divider>
        </div>
      ))}
      <div><Divider orientation="vertical" /><Divider orientation="vertical" variant="dashed" /></div>
    </div>
  ),
};
