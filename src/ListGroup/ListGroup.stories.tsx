import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../Badge";
import { ListGroup, ListGroupItem } from "./ListGroup";

const meta = {
  title: "Components/List Group",
  component: ListGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ListGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <ListGroup style={{ maxWidth: "24rem" }}>
    <ListGroupItem>An item</ListGroupItem><ListGroupItem>A second item</ListGroupItem><ListGroupItem>A third item</ListGroupItem><ListGroupItem>A fourth item</ListGroupItem>
  </ListGroup>,
};

export const ActiveAndDisabled: Story = {
  render: () => <ListGroup style={{ maxWidth: "24rem" }}>
    <ListGroupItem href="#active" active>An active link item</ListGroupItem><ListGroupItem href="#second">A second item</ListGroupItem><ListGroupItem button>A button item</ListGroupItem><ListGroupItem disabled>A disabled item</ListGroupItem>
  </ListGroup>,
};

export const FlushAndNumbered: Story = {
  render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))", gap: "2rem" }}>
    <ListGroup flush><ListGroupItem>An item</ListGroupItem><ListGroupItem>A second item</ListGroupItem><ListGroupItem>A third item</ListGroupItem></ListGroup>
    <ListGroup as="ol"><ListGroupItem>Task one</ListGroupItem><ListGroupItem>Task two</ListGroupItem><ListGroupItem>Task three</ListGroupItem></ListGroup>
  </div>,
};

export const Horizontal: Story = {
  render: () => <ListGroup horizontal><ListGroupItem>An item</ListGroupItem><ListGroupItem>A second item</ListGroupItem><ListGroupItem>A third item</ListGroupItem></ListGroup>,
};

export const Variants: Story = {
  render: () => <ListGroup style={{ maxWidth: "24rem" }}>
    {(["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"] as const).map((variant) => <ListGroupItem key={variant} variant={variant}>A {variant} list group item</ListGroupItem>)}
  </ListGroup>,
};

export const Badges: Story = {
  render: () => <ListGroup style={{ maxWidth: "24rem" }}>
    <ListGroupItem badge={<Badge pill>14</Badge>}>Inbox</ListGroupItem><ListGroupItem badge={<Badge variant="primary" pill>2</Badge>}>Drafts</ListGroupItem><ListGroupItem badge={<Badge variant="danger" pill>1</Badge>}>Alerts</ListGroupItem>
  </ListGroup>,
};

export const CustomContent: Story = {
  render: () => <ListGroup style={{ maxWidth: "24rem" }}>
    <ListGroupItem href="#first" active><strong>List group item heading</strong><small>3 days ago</small><div>Some placeholder content in a paragraph.</div></ListGroupItem>
    <ListGroupItem href="#second"><strong>Another item heading</strong><small>2 days ago</small><div>Some supporting text to make this item a little longer.</div></ListGroupItem>
  </ListGroup>,
};

export const CheckboxesAndRadios: Story = {
  render: () => <ListGroup style={{ maxWidth: "24rem" }}>
    {(["First", "Second", "Third"] as const).map((label, index) => <ListGroupItem key={label}><label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><input type="checkbox" name="list-check" defaultChecked={index === 0} />{label} checkbox</label></ListGroupItem>)}
  </ListGroup>,
};
