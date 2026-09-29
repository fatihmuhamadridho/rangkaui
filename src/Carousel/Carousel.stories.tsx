import type { Meta, StoryObj } from "@storybook/react-vite";

import { Carousel } from "./Carousel";

const slides = [
  { id: "slide-1", content: <strong style={{ fontSize: "1.5rem", fontWeight: 400 }}>First slide</strong>, caption: <><strong>First slide label</strong><div>Some representative placeholder content for the first slide.</div></> },
  { id: "slide-2", content: <strong style={{ fontSize: "1.5rem", fontWeight: 400 }}>Second slide</strong>, caption: <><strong>Second slide label</strong><div>Some representative placeholder content for the second slide.</div></> },
  { id: "slide-3", content: <strong style={{ fontSize: "1.5rem", fontWeight: 400 }}>Third slide</strong>, caption: <><strong>Third slide label</strong><div>Some representative placeholder content for the third slide.</div></> },
];

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: { layout: "padded" },
  args: { slides },
  argTypes: {
    showControls: { control: "boolean" },
    showIndicators: { control: "boolean" },
    interval: { control: "number" },
    wrap: { control: "boolean" },
    dark: { control: "boolean" },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithIndicators: Story = { args: { slides, defaultActiveIndex: 1 } };
export const WithCaptions: Story = { args: { slides, defaultActiveIndex: 1 } };
export const Dark: Story = { args: { slides, defaultActiveIndex: 1, dark: true } };
export const Autoplay: Story = { args: { slides, interval: 3000, pauseOnHover: true } };
