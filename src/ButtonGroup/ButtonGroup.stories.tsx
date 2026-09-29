import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button";
import { ButtonGroup, ButtonGroupToggle, ButtonToolbar } from "./ButtonGroup";

const meta = {
  title: "Components/Button Group",
  component: ButtonGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <ButtonGroup aria-label="Basic example"><Button>Left</Button><Button>Middle</Button><Button>Right</Button></ButtonGroup>,
};

export const MixedStyles: Story = {
  render: () => <ButtonGroup aria-label="Mixed styles"><Button variant="warning">Left</Button><Button variant="danger">Middle</Button><Button variant="success">Right</Button></ButtonGroup>,
};

export const Outlined: Story = {
  render: () => <ButtonGroup aria-label="Outlined buttons"><Button variant="outline-primary">Left</Button><Button variant="outline-primary">Middle</Button><Button variant="outline-primary">Right</Button></ButtonGroup>,
};

export const CheckboxAndRadio: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
    <ButtonGroupToggle type="checkbox" options={[{ value: "one", label: "Checkbox 1" }, { value: "two", label: "Checkbox 2" }, { value: "three", label: "Checkbox 3" }]} />
    <ButtonGroupToggle type="radio" name="radio-demo" options={[{ value: "one", label: "Radio 1" }, { value: "two", label: "Radio 2" }, { value: "three", label: "Radio 3" }]} />
  </div>,
};

export const Toolbar: Story = {
  render: () => <ButtonToolbar aria-label="Toolbar with button groups">
    <ButtonGroup aria-label="First group"><Button>1</Button><Button>2</Button><Button>3</Button></ButtonGroup>
    <ButtonGroup aria-label="Second group"><Button variant="secondary">4</Button><Button variant="secondary">5</Button></ButtonGroup>
    <ButtonGroup aria-label="Third group"><Button variant="info">6</Button></ButtonGroup>
  </ButtonToolbar>,
};

export const Sizes: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
    <ButtonGroup size="large" aria-label="Large buttons"><Button variant="outline-primary">Left</Button><Button variant="outline-primary">Middle</Button><Button variant="outline-primary">Right</Button></ButtonGroup>
    <ButtonGroup size="medium" aria-label="Medium buttons"><Button variant="outline-primary">Left</Button><Button variant="outline-primary">Middle</Button><Button variant="outline-primary">Right</Button></ButtonGroup>
    <ButtonGroup size="small" aria-label="Small buttons"><Button variant="outline-primary">Left</Button><Button variant="outline-primary">Middle</Button><Button variant="outline-primary">Right</Button></ButtonGroup>
  </div>,
};

export const Vertical: Story = {
  render: () => <ButtonGroup orientation="vertical" aria-label="Vertical example"><Button>Button</Button><Button>Button</Button><Button>Button</Button></ButtonGroup>,
};
