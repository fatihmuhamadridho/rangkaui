import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag, Tags } from "./Tags";

const meta = {
  title: "Components/Tags",
  component: Tags,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Tags aria-label="Tags"><Tag closable>Tag 1</Tag><Tag closable>Tag 2</Tag><Tag closable>Tag 3</Tag></Tags>,
};

export const CountExamples: Story = {
  render: () => <div style={{ display: "grid", gap: "1.5rem" }}>
    {[3, 2, 1, 4, 5, 6, 7, 8, 9, 10].map((count) => <Tags key={count} aria-label={`${count} tags`}>
      {Array.from({ length: count }, (_, index) => <Tag key={index} closable>Tag {index + 1}</Tag>)}
    </Tags>)}
  </div>,
};

export const Removable: Story = {
  render: () => {
    const [items, setItems] = useState(["Design", "Frontend", "React"]);
    return <Tags aria-label="Removable tags">{items.map((item) => <Tag key={item} closable onClose={() => setItems((current) => current.filter((tag) => tag !== item))}>{item}</Tag>)}</Tags>;
  },
};

export const VariantsAndSizes: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem" }}>
    <Tags><Tag size="small" closable>Small tag</Tag><Tag size="medium" closable>Medium tag</Tag><Tag size="large" closable>Large tag</Tag></Tags>
    <Tags><Tag variant="primary">Primary</Tag><Tag variant="success">Success</Tag><Tag variant="warning">Warning</Tag><Tag variant="danger">Danger</Tag></Tags>
    <Tags><Tag icon={null} closable>Without icon</Tag><Tag closable>With tag icon</Tag></Tags>
  </div>,
};
