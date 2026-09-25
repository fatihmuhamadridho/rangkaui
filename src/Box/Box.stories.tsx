import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "./Box";

const meta = {
  title: "Layout/Box",
  component: Box,
  parameters: { layout: "padded" },
  args: {
    children: "Box content",
    padded: true,
    bordered: true,
    rounded: true,
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Card: Story = {
  render: () => (
    <Box padded bordered rounded shadow>
      <h2 className="text-lg font-semibold">Card title</h2>
      <p className="mt-2 text-sm text-muted">
        Box provides a div-like layout primitive for grouping content.
      </p>
    </Box>
  ),
};

export const Composition: Story = {
  render: () => (
    <Box padded bordered rounded>
      <Box className="mb-4" padded bordered rounded>
        Header area
      </Box>
      <Box className="bg-light" padded rounded>
        Content area
      </Box>
    </Box>
  ),
};
