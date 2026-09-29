import type { Meta, StoryObj } from "@storybook/react-vite";

import { TimePicker, type TimePickerTheme } from "./TimePicker";

const themes: TimePickerTheme[] = ["default", "primary", "success", "danger"];

const meta = {
  title: "Components/Time Picker",
  component: TimePicker,
  parameters: { layout: "padded" },
  args: { useSeconds: true },
  argTypes: {
    mode: { control: "select", options: ["single", "range"] },
    theme: { control: "select", options: themes },
    useSeconds: { control: "boolean" },
    hour12: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ThemeVariants: Story = {
  render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 10rem)", gap: "1rem" }}>
    {themes.map((theme) => <TimePicker key={theme} theme={theme} defaultValue="08:16:55" />)}
  </div>,
};

export const TimeRange: Story = {
  args: { mode: "range", defaultValue: { start: "08:16:55", end: "16:24:55" } },
};

export const TwelveHourClock: Story = {
  args: { defaultValue: "08:16:55 PM", hour12: true },
};

export const MinutesOnly: Story = {
  args: { defaultValue: "08:16", useSeconds: false, minuteStep: 5 },
};

export const Disabled: Story = {
  args: { defaultValue: "08:16:55", disabled: true },
};
