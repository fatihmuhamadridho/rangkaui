import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button";
import {
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  CardHeader,
  CardImage,
  CardImageOverlay,
  CardLink,
  CardListGroup,
  CardListGroupItem,
  CardSubtitle,
  CardText,
  CardTitle,
} from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "padded" },
  args: { children: <CardBody><CardTitle>Card title</CardTitle><CardText>Some quick example text to build on the card title.</CardText></CardBody> },
  argTypes: {
    variant: { control: "select", options: [undefined, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"] },
    outline: { control: "boolean" },
    shadow: { control: "boolean" },
    horizontal: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const placeholder = "https://placehold.co/600x240/212529/ffffff?text=Card+image";

export const Playground: Story = {};

export const ImageCard: Story = {
  render: () => <Card style={{ maxWidth: "24rem" }}>
    <CardImage src={placeholder} alt="Abstract card cover" />
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card’s content.</CardText>
      <Button>Go somewhere</Button>
    </CardBody>
  </Card>,
};

export const HeaderFooter: Story = {
  render: () => <Card style={{ maxWidth: "24rem" }}>
    <CardHeader>Featured</CardHeader>
    <CardBody><CardTitle>Special title treatment</CardTitle><CardText>With supporting text below as a natural lead-in to additional content.</CardText><Button>Go somewhere</Button></CardBody>
    <CardFooter>2 days ago</CardFooter>
  </Card>,
};

export const ListItems: Story = {
  render: () => <Card style={{ maxWidth: "24rem" }}>
    <CardHeader>Featured</CardHeader>
    <CardListGroup><CardListGroupItem>Item one</CardListGroupItem><CardListGroupItem>Item two</CardListGroupItem><CardListGroupItem>Item three</CardListGroupItem></CardListGroup>
    <CardBody><CardLink href="#details">Card link</CardLink><CardLink href="#more">Another link</CardLink></CardBody>
  </Card>,
};

export const ImageOverlay: Story = {
  render: () => <Card style={{ maxWidth: "24rem" }}>
    <CardImage src={placeholder} alt="Abstract card cover" />
    <CardImageOverlay><CardTitle>Card title</CardTitle><CardText>This is a wider card with supporting text below as a natural lead-in.</CardText></CardImageOverlay>
  </Card>,
};

export const ContextualColors: Story = {
  render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))", gap: "1rem" }}>
    {(["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"] as const).map((variant) => <Card key={variant} variant={variant}><CardBody><CardTitle>{variant}</CardTitle><CardText>Contextual card content.</CardText></CardBody></Card>)}
  </div>,
};

export const CardGroups: Story = {
  render: () => <div style={{ display: "grid", gap: "1.5rem" }}>
    <CardGroup layout="group" columns={3}>{[1, 2, 3].map((item) => <Card key={item}><CardImage src={placeholder} alt="Abstract card cover" /><CardBody><CardTitle>Card {item}</CardTitle><CardText>Supporting text for this card.</CardText></CardBody></Card>)}</CardGroup>
    <CardGroup layout="grid" columns={3}>{[1, 2, 3].map((item) => <Card key={item} shadow><CardBody><CardTitle>Grid card {item}</CardTitle><CardText>Supporting text for this card.</CardText></CardBody></Card>)}</CardGroup>
  </div>,
};
