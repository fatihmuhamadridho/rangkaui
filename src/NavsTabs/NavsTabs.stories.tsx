import { useState } from "react";

import { NavsTabs, NavsTabsList, NavsTabsPanel, NavsTabsTab, type NavsTabsVariant } from "./NavsTabs";

const examples: NavsTabsVariant[] = ["tabs", "pills", "underline", "plain"];

export default {
  title: "Components/Navs and Tabs",
  component: NavsTabs,
};

export function Variants() {
  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {examples.map((variant) => (
        <NavsTabs key={variant} defaultActiveKey="home" variant={variant}>
          <NavsTabsList label={`${variant} navigation`}>
            <NavsTabsTab tabKey="home">Home</NavsTabsTab>
            <NavsTabsTab tabKey="profile">Profile</NavsTabsTab>
            <NavsTabsTab tabKey="contact">Contact</NavsTabsTab>
            <NavsTabsTab tabKey="disabled" disabled>Disabled</NavsTabsTab>
          </NavsTabsList>
          {variant !== "plain" && (
            <>
              <NavsTabsPanel tabKey="home">Home tab content.</NavsTabsPanel>
              <NavsTabsPanel tabKey="profile">Profile tab content.</NavsTabsPanel>
              <NavsTabsPanel tabKey="contact">Contact tab content.</NavsTabsPanel>
              <NavsTabsPanel tabKey="disabled">Disabled tab content.</NavsTabsPanel>
            </>
          )}
        </NavsTabs>
      ))}
    </div>
  );
}

export function Vertical() {
  return (
    <NavsTabs defaultActiveKey="home" orientation="vertical" variant="pills">
      <NavsTabsList>
        <NavsTabsTab tabKey="home">Home</NavsTabsTab>
        <NavsTabsTab tabKey="profile">Profile</NavsTabsTab>
        <NavsTabsTab tabKey="contact">Contact</NavsTabsTab>
      </NavsTabsList>
      <NavsTabsPanel tabKey="home">Home tab content.</NavsTabsPanel>
      <NavsTabsPanel tabKey="profile">Profile tab content.</NavsTabsPanel>
      <NavsTabsPanel tabKey="contact">Contact tab content.</NavsTabsPanel>
    </NavsTabs>
  );
}

export function Justified() {
  const [activeKey, setActiveKey] = useState("home");
  return (
    <NavsTabs activeKey={activeKey} onChange={setActiveKey} variant="pills" justified>
      <NavsTabsList>
        <NavsTabsTab tabKey="home">Home</NavsTabsTab>
        <NavsTabsTab tabKey="profile">Profile</NavsTabsTab>
        <NavsTabsTab tabKey="contact">Contact</NavsTabsTab>
      </NavsTabsList>
      <NavsTabsPanel tabKey="home">Home tab content.</NavsTabsPanel>
      <NavsTabsPanel tabKey="profile">Profile tab content.</NavsTabsPanel>
      <NavsTabsPanel tabKey="contact">Contact tab content.</NavsTabsPanel>
    </NavsTabs>
  );
}
