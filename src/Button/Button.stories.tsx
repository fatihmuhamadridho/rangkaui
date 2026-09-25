import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from "./Button";

const variants: ButtonVariant[] = [
  "standard",
  "primary",
  "secondary",
  "base",
  "outline-primary",
  "outline-secondary",
  "link",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
  "outline-success",
  "outline-danger",
  "outline-warning",
  "outline-info",
  "outline-light",
  "outline-dark",
];

const sizes: ButtonSize[] = ["medium", "large", "small"];

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "padded" },
  args: { children: "Button Title" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "inline-radio", options: sizes },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function StateRow({ size, variant }: { size: ButtonSize; variant: ButtonVariant }) {
  return (
    <div className="flex items-center gap-3">
      <Button size={size} variant={variant}>Hovered/pressed</Button>
      <Button size={size} variant={variant}>Active</Button>
      <Button size={size} variant={variant} disabled>Disabled</Button>
    </div>
  );
}

export const VariantMatrix: Story = {
  render: () => (
    <div className="grid gap-8 bg-gray-100 p-8">
      {variants.map((variant) => (
        <section key={variant} className="grid gap-3">
          <h3 className="text-sm font-semibold capitalize text-body">{variant.replace(/-/g, " ")}</h3>
          {sizes.map((size) => <StateRow key={size} size={size} variant={variant} />)}
        </section>
      ))}
    </div>
  ),
};

export const IconOnly: Story = {
  render: (args: ButtonProps) => (
    <div className="flex gap-3">
      <Button {...args} iconOnly aria-label="Add">+</Button>
      <Button {...args} iconOnly variant="outline-primary" aria-label="Settings">⚙</Button>
      <Button {...args} iconOnly variant="danger" aria-label="Delete">×</Button>
    </div>
  ),
};
