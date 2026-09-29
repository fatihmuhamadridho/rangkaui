import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputGroup, InputGroupButton, InputGroupCheck, InputGroupInput, InputGroupSelect, InputGroupText } from "./InputGroup";

const meta = {
  title: "Components/Input Group",
  component: InputGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <InputGroup aria-label="Username"><InputGroupText>@</InputGroupText><InputGroupInput placeholder="Username" aria-label="Username" /></InputGroup>,
};

export const Wrapping: Story = {
  render: () => <InputGroup aria-label="Wrapping input group"><InputGroupText>@</InputGroupText><InputGroupInput placeholder="Username" aria-label="Username" /></InputGroup>,
};

export const BorderRadius: Story = {
  render: () => <InputGroup rounding="rounded" aria-label="Rounded input"><InputGroupText>https://</InputGroupText><InputGroupInput placeholder="example.com" aria-label="Website" /></InputGroup>,
};

export const Sizing: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    <InputGroup size="small" aria-label="Small group"><InputGroupText>@</InputGroupText><InputGroupInput placeholder="Small" aria-label="Small input" /></InputGroup>
    <InputGroup aria-label="Medium group"><InputGroupText>@</InputGroupText><InputGroupInput placeholder="Medium" aria-label="Medium input" /></InputGroup>
    <InputGroup size="large" aria-label="Large group"><InputGroupText>@</InputGroupText><InputGroupInput placeholder="Large" aria-label="Large input" /></InputGroup>
  </div>,
};

export const CheckboxesAndRadios: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    <InputGroup aria-label="Checkbox group"><InputGroupCheck aria-label="Accept terms" /><InputGroupInput placeholder="Additional information" aria-label="Additional information" /></InputGroup>
    <InputGroup aria-label="Radio group"><InputGroupCheck type="radio" name="choice" aria-label="Choice A" /><InputGroupInput placeholder="Choice details" aria-label="Choice details" /></InputGroup>
  </div>,
};

export const MultipleInputs: Story = {
  render: () => <InputGroup aria-label="Name fields"><InputGroupInput placeholder="First name" aria-label="First name" /><InputGroupInput placeholder="Last name" aria-label="Last name" /></InputGroup>,
};

export const MultipleAddons: Story = {
  render: () => <InputGroup aria-label="Price"><InputGroupText>$</InputGroupText><InputGroupInput placeholder="0.00" aria-label="Amount" /><InputGroupText>.00</InputGroupText></InputGroup>,
};

export const ButtonAddons: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    <InputGroup aria-label="Search"><InputGroupInput placeholder="Search terms" aria-label="Search terms" /><InputGroupButton variant="primary">Search</InputGroupButton></InputGroup>
    <InputGroup aria-label="Username"><InputGroupButton>@</InputGroupButton><InputGroupInput placeholder="Username" aria-label="Username" /></InputGroup>
    <InputGroup aria-label="Action"><InputGroupInput placeholder="Recipient username" aria-label="Recipient username" /><InputGroupButton>Button</InputGroupButton><InputGroupButton>Button</InputGroupButton></InputGroup>
  </div>,
};

export const DropdownAddons: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    <InputGroup aria-label="Dropdown before input"><InputGroupButton>Dropdown ▾</InputGroupButton><InputGroupInput placeholder="Recipient username" aria-label="Recipient username" /></InputGroup>
    <InputGroup aria-label="Input before dropdown"><InputGroupInput placeholder="Recipient username" aria-label="Recipient username" /><InputGroupButton>Dropdown ▾</InputGroupButton></InputGroup>
  </div>,
};

export const SelectAndFile: Story = {
  render: () => <div style={{ display: "grid", gap: "0.5rem" }}>
    <InputGroup aria-label="Select option"><InputGroupSelect aria-label="Choose option"><option>Choose...</option><option>One</option><option>Two</option></InputGroupSelect><InputGroupButton>Action</InputGroupButton></InputGroup>
    <InputGroup aria-label="Upload file"><InputGroupInput type="file" aria-label="Choose file" /><InputGroupButton>Upload</InputGroupButton></InputGroup>
  </div>,
};
