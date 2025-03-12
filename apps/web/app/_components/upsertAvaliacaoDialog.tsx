import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReturnAvaliacaoDto } from "../_services/dtos/return-avaliacao-imc.dto";

interface UpsertAvaliacaoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  avaliacao?: ReturnAvaliacaoDto;
  onConfirm?: () => void;
  confirmText?: string;
}

export default function UpsertAvaliacaoDialog({
  isOpen,
  onClose,
  title,
  avaliacao,
  onConfirm,
  confirmText = "Confirmar",
}: UpsertAvaliacaoDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input defaultValue={avaliacao?.classificacao ?? "vazio"}></Input>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="ghost">
            Fechar
          </Button>
          {onConfirm && (
            <Button colorScheme="blue" onClick={onConfirm} ml={3}>
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
