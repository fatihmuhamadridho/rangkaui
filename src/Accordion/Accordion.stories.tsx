import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion } from "./Accordion";

const sampleItems = [
  {
    id: "item-1",
    title: "Accordion Item #1",
    content: <p>This is the first item’s accordion body. It is shown by default in this example. Add any content you need inside the panel.</p>,
  },
  {
    id: "item-2",
    title: "Accordion Item #2",
    content: <p>This is the second item’s accordion body.</p>,
  },
  {
    id: "item-3",
    title: "Accordion Item #3",
    content: <p>This is the third item’s accordion body.</p>,
  },
];

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  args: { items: sampleItems, defaultOpen: "item-1" },
  argTypes: {
    allowMultiple: { control: "boolean" },
    flush: { control: "boolean" },
    headingLevel: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Flush: Story = { args: { items: sampleItems, defaultOpen: "item-1", flush: true } };

export const AllowMultiple: Story = { args: { items: sampleItems, defaultOpen: ["item-1", "item-2"], allowMultiple: true } };
