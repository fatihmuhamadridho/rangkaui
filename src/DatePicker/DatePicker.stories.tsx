import type { Meta, StoryObj } from "@storybook/react-vite";

import { DatePicker, type DatePickerTheme } from "./DatePicker";

const themes: DatePickerTheme[] = ["default", "primary", "success", "danger"];

const meta = {
  title: "Components/Date Picker",
  component: DatePicker,
  parameters: { layout: "padded" },
  args: { placeholder: "Select date", mode: "date" },
  argTypes: {
    mode: { control: "select", options: ["date", "range", "month", "year", "quarter"] },
    theme: { control: "select", options: themes },
    monthsToShow: { control: "select", options: [1, 2] },
    showTime: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ThemeVariants: Story = {
  render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 10rem)", gap: "1rem" }}>
    {themes.map((theme) => <DatePicker key={theme} theme={theme} placeholder="Select date" />)}
  </div>,
};

export const DateRange: Story = {
  args: { mode: "range", defaultValue: { start: "2021-10-30", end: "2021-12-06" } },
};

export const TwoMonths: Story = {
  args: { monthsToShow: 2, defaultValue: "2021-10-30" },
};

export const WithTime: Story = {
  args: { showTime: true, defaultValue: "2021-10-30" },
};

export const MonthYearQuarter: Story = {
  render: () => <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
    <DatePicker mode="month" placeholder="Select month" />
    <DatePicker mode="year" placeholder="Select year" />
    <DatePicker mode="quarter" placeholder="Select quarter" />
  </div>,
};
