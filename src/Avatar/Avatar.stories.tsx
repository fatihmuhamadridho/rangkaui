import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarGroup } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  args: { name: "User Sample", size: "lg" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    shape: { control: "select", options: ["circle", "square"] },
    variant: { control: "select", options: ["neutral", "primary", "orange", "success", "danger"] },
    dot: { control: "boolean" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SizesAndShapes: Story = {
  render: () => <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    {(["sm", "md", "xl", "xs"] as const).map((size) => <Avatar key={size} size={size} name="Sample User" />)}
    {(["sm", "md", "xl", "xs"] as const).map((size) => <Avatar key={`square-${size}`} size={size} shape="square" name="Sample User" />)}
  </div>,
};

export const Initials: Story = {
  render: () => <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Avatar name="Uma Thurman" size="xl" variant="orange" />
    <Avatar name="Uma Thurman" size="lg" variant="orange" />
    <Avatar name="Uma Thurman" size="md" variant="orange" />
    <Avatar name="Uma Thurman" size="sm" variant="orange" />
    <Avatar name="Uma Thurman" size="xs" variant="orange" shape="square" />
  </div>,
};

export const BadgesAndStatus: Story = {
  render: () => <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Avatar size="lg" name="Sample User" badge="99" />
    <Avatar size="md" name="Sample User" dot />
    <Avatar size="md" name="Sample User" status="online" />
    <Avatar size="md" name="Sample User" status="busy" shape="square" />
  </div>,
};

export const AvatarGroups: Story = {
  render: () => <div style={{ display: "grid", gap: "1.5rem" }}>
    <AvatarGroup aria-label="Team members">
      <Avatar name="Alex Morgan" variant="neutral" />
      <Avatar name="Taylor Reed" variant="neutral" />
      <Avatar name="Uma Thurman" variant="orange" />
      <Avatar name="Sam Lee" variant="neutral" />
    </AvatarGroup>
    <AvatarGroup max={3} size="lg" aria-label="Team members with overflow">
      <Avatar name="Alex Morgan" />
      <Avatar name="Taylor Reed" />
      <Avatar name="Uma Thurman" variant="orange" />
      <Avatar name="Sam Lee" />
      <Avatar name="Jordan Park" />
    </AvatarGroup>
  </div>,
};

export const ImageFallback: Story = { args: { src: "/missing-avatar.png", alt: "Alex Morgan", name: "Alex Morgan" } };
