import type { Meta, StoryObj } from "@storybook/react-vite";

import { Navbar, NavbarBrand, NavbarCollapse, NavbarContainer, NavbarItem, NavbarLink, NavbarNav, NavbarText, NavbarToggle } from "./Navbar";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  argTypes: {
    expand: { control: "select", options: ["sm", "md", "lg", "xl", "xxl", "never"] },
    theme: { control: "select", options: ["light", "dark", "primary", "secondary", "success", "danger", "warning", "info", "transparent"] },
    position: { control: "select", options: ["static", "fixed-top", "fixed-bottom", "sticky-top"] },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function ExampleNavbar({ theme = "light", expand = "lg" }: { theme?: "light" | "dark" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "transparent"; expand?: "sm" | "md" | "lg" | "xl" | "xxl" | "never" }) {
  return <Navbar theme={theme} expand={expand}>
    <NavbarBrand href="#home">Navbar</NavbarBrand>
    <NavbarToggle />
    <NavbarCollapse>
      <NavbarNav>
        <NavbarItem><NavbarLink href="#home" active>Home</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink href="#features">Features</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink href="#pricing">Pricing</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink href="#disabled" disabled>Disabled</NavbarLink></NavbarItem>
      </NavbarNav>
      <NavbarText>Signed in as Fatih</NavbarText>
    </NavbarCollapse>
  </Navbar>;
}

export const Playground: Story = { render: () => <ExampleNavbar /> };
export const Dark: Story = { render: () => <ExampleNavbar theme="dark" /> };
export const Primary: Story = { render: () => <ExampleNavbar theme="primary" /> };
export const Responsive: Story = { render: () => <ExampleNavbar expand="md" /> };
export const WithContainer: Story = {
  render: () => <Navbar theme="light">
    <NavbarContainer>
      <NavbarBrand href="#home">Brand</NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse><NavbarNav><NavbarItem><NavbarLink href="#home" active>Home</NavbarLink></NavbarItem><NavbarItem><NavbarLink href="#about">About</NavbarLink></NavbarItem></NavbarNav></NavbarCollapse>
    </NavbarContainer>
  </Navbar>,
};
