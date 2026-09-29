import type { Meta, StoryObj } from "@storybook/react-vite";

import { Blockquote, DescriptionDetails, DescriptionList, DescriptionTerm, Display, Heading, Lead, Text, TextList } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { children: "Typography example text." } };

export const Headings: Story = {
  render: () => <div>{([1, 2, 3, 4, 5, 6] as const).map((level) => <Heading key={level} level={level}>Heading level {level}</Heading>)}</div>,
};

export const DisplayHeadings: Story = {
  render: () => <div>{([1, 2, 3, 4, 5, 6] as const).map((level) => <Display key={level} level={level}>Display {level}</Display>)}</div>,
};

export const LeadAndInlineText: Story = {
  render: () => <div>
    <Lead>Make a paragraph stand out by adding lead.</Lead>
    <Text>This is a <Text as="mark" variant="mark">highlighted phrase</Text> in normal text.</Text>
    <Text as="p">You can <Text as="del" variant="deleted">remove text</Text> or <Text as="ins" variant="inserted">show inserted text</Text>.</Text>
    <Text as="p">Use <Text as="code" variant="code">inline code</Text> and press <Text as="kbd" variant="keyboard">Ctrl + S</Text>.</Text>
    <Text as="p" variant="muted">Muted text example.</Text>
  </div>,
};

export const Blockquotes: Story = {
  render: () => <div style={{ display: "grid", gap: "1rem" }}>
    <Blockquote cite="Source title" footer="Quoted author">A well-known quote, contained in a blockquote element.</Blockquote>
    <Blockquote align="center" cite="Source title" footer="Quoted author">A centered quote, contained in a blockquote element.</Blockquote>
    <Blockquote align="end" cite="Source title" footer="Quoted author">A right-aligned quote, contained in a blockquote element.</Blockquote>
  </div>,
};

export const Lists: Story = {
  render: () => <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
    <TextList><li>First item</li><li>Second item</li><li>Third item</li></TextList>
    <TextList as="ol"><li>First item</li><li>Second item</li><li>Third item</li></TextList>
    <TextList unstyled><li>Unstyled item</li><li>Another item</li></TextList>
    <TextList inline><li>Inline item</li><li>Another item</li><li>Third item</li></TextList>
  </div>,
};

export const DescriptionLists: Story = {
  render: () => <DescriptionList horizontal>
    <DescriptionTerm>Description term</DescriptionTerm><DescriptionDetails>Details for this term, and another one.</DescriptionDetails>
    <DescriptionTerm>Another term</DescriptionTerm><DescriptionDetails>This description is short, so no extra paragraph or anything.</DescriptionDetails>
    <DescriptionTerm>Nested term</DescriptionTerm><DescriptionDetails>This can be useful when space is tight.</DescriptionDetails>
  </DescriptionList>,
};
