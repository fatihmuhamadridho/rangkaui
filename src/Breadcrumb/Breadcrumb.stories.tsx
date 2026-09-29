import type { Meta, StoryObj } from "@storybook/react-vite";

import { Breadcrumb } from "./Breadcrumb";

const paths = {
  home: { label: "Home", href: "#home" },
  library: { label: "Library", href: "#library" },
  data: { label: "Data" },
};

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
  args: { items: [paths.home, paths.library, paths.data] },
  argTypes: { divider: { control: "text" } },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Examples: Story = {
  render: () => <div style={{ display: "grid", gap: "1.25rem" }}>
    <Breadcrumb items={[paths.home]} />
    <Breadcrumb items={[paths.home, paths.library]} />
    <Breadcrumb items={[paths.home, paths.library, paths.data]} />
  </div>,
};

export const CustomDivider: Story = {
  render: () => <div style={{ display: "grid", gap: "1.25rem" }}>
    <Breadcrumb items={[paths.home, paths.library]} divider="›" />
    <Breadcrumb items={[paths.home, paths.library]} divider="" />
    <Breadcrumb items={[paths.home, paths.library]} divider=">" dir="rtl" />
  </div>,
};
