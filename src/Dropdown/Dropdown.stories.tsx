import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from "./Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Dropdown>
    <DropdownToggle>Dropdown button</DropdownToggle>
    <DropdownMenu>
      <DropdownItem href="#action">Action</DropdownItem>
      <DropdownItem href="#another">Another action</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#else">Something else here</DropdownItem>
    </DropdownMenu>
  </Dropdown>,
};

export const Variants: Story = {
  render: () => <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
    {(["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"] as const).map((variant) => <Dropdown key={variant}>
      <DropdownToggle variant={variant}>{variant}</DropdownToggle>
      <DropdownMenu><DropdownItem href="#action">Action</DropdownItem><DropdownItem href="#other">Another action</DropdownItem></DropdownMenu>
    </Dropdown>)}
  </div>,
};

export const SplitButton: Story = {
  render: () => <Dropdown split>
    <button type="button" style={{ padding: "0.375rem 0.75rem", border: "1px solid #0d6efd", background: "#0d6efd", color: "white" }}>Action</button>
    <DropdownToggle split aria-label="Open action menu" />
    <DropdownMenu><DropdownItem href="#edit">Edit</DropdownItem><DropdownItem href="#duplicate">Duplicate</DropdownItem><DropdownDivider /><DropdownItem href="#delete">Delete</DropdownItem></DropdownMenu>
  </Dropdown>,
};

export const Dark: Story = {
  render: () => <Dropdown dark>
    <DropdownToggle variant="secondary">Dark menu</DropdownToggle>
    <DropdownMenu dark><DropdownHeader>Menu header</DropdownHeader><DropdownItem href="#action">Action</DropdownItem><DropdownItem href="#another">Another action</DropdownItem></DropdownMenu>
  </Dropdown>,
};

export const Placement: Story = {
  render: () => <div style={{ display: "flex", justifyContent: "space-between", padding: "8rem 1rem" }}>
    {(["bottom-start", "bottom-end", "top-start", "top-end"] as const).map((placement) => <Dropdown key={placement} placement={placement}>
      <DropdownToggle variant="secondary">{placement}</DropdownToggle>
      <DropdownMenu align={placement.endsWith("end") ? "end" : "start"}><DropdownItem href="#action">Action</DropdownItem><DropdownItem href="#another">Another action</DropdownItem></DropdownMenu>
    </Dropdown>)}
  </div>,
};

export const DisabledAndActive: Story = {
  render: () => <Dropdown defaultOpen>
    <DropdownToggle>Menu states</DropdownToggle>
    <DropdownMenu><DropdownItem href="#active" active>Active item</DropdownItem><DropdownItem href="#disabled" disabled>Disabled item</DropdownItem><DropdownItem href="#normal">Regular item</DropdownItem></DropdownMenu>
  </Dropdown>,
};
