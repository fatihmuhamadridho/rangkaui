import type { Meta, StoryObj } from "@storybook/react-vite";

import { ColorPicker } from "./ColorPicker";

const meta = {
  title: "Components/Color Picker",
  component: ColorPicker,
  parameters: { layout: "padded" },
  args: { defaultValue: "#1708FF", label: "Choose color" },
  argTypes: { showAlpha: { control: "boolean" }, disabled: { control: "boolean" } },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  render: () => <ColorPicker defaultValue="#1708FF" />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector("input[aria-label='Choose color hex value']");
    input?.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
  },
};

export const Controlled: Story = {
  args: { value: "#198754", label: "Brand color" },
};

export const WithoutOpacity: Story = {
  args: { defaultValue: "#dc3545", showAlpha: false },
};

export const Disabled: Story = {
  args: { defaultValue: "#6c757d", disabled: true },
};
