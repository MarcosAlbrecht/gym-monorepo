import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Tem certeza que deseja excluir este item? Esta ação não pode ser
            desfeita.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="ghost">
            Cancelar
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm}>
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
