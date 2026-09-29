import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button";
import { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicModal({ size = "md", centered = false, scrollable = false }: { size?: "sm" | "md" | "lg" | "xl" | "fullscreen"; centered?: boolean; scrollable?: boolean }) {
  return <Modal>
    <ModalTrigger>Launch demo modal</ModalTrigger>
    <ModalContent size={size} centered={centered} scrollable={scrollable}>
      <ModalHeader><ModalTitle>Modal title</ModalTitle><ModalDescription>Modal body text goes here.</ModalDescription></ModalHeader>
      <ModalBody><p>This is a reusable modal dialog with accessible focus management and keyboard support.</p></ModalBody>
      <ModalFooter><ModalClose>Close</ModalClose><ModalClose variant="primary">Save changes</ModalClose></ModalFooter>
    </ModalContent>
  </Modal>;
}

export const Playground: Story = { render: () => <BasicModal /> };
export const Centered: Story = { render: () => <BasicModal centered /> };
export const Scrollable: Story = { render: () => <BasicModal scrollable /> };
export const Large: Story = { render: () => <BasicModal size="lg" /> };

export const Controlled: Story = {
  render: () => {
    const ControlledModal = () => {
      const [open, setOpen] = useState(false);
      return <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger>Open controlled modal</ModalTrigger>
        <ModalContent>
          <ModalHeader><ModalTitle>Controlled modal</ModalTitle></ModalHeader>
          <ModalBody>The parent controls whether this modal is open.</ModalBody>
          <ModalFooter><ModalClose>Close</ModalClose><Button onClick={() => setOpen(false)}>Confirm</Button></ModalFooter>
        </ModalContent>
      </Modal>;
    };
    return <ControlledModal />;
  },
};
