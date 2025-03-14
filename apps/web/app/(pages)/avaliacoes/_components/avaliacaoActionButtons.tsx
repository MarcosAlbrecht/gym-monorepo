import UpsertAvaliacaoDialog from "@/app/_components/upsertAvaliacaoDialog";
import { ReturnAvaliacaoDto } from "@/app/_services/dtos/return-avaliacao-imc.dto";
import { UserDto } from "@/app/_services/dtos/userDto";
import { PerfilEnum } from "@/app/_services/enums/perfil";
import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import DeleteButton from "./deleteButton";

interface AvaliacaoActionsButtonsProps {
  avaliacao: ReturnAvaliacaoDto;
  user: UserDto;
}

export default function AvaliacaoActionsButtons({
  user,
  avaliacao,
}: AvaliacaoActionsButtonsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack justifyContent="flex-end" spacing={2}>
      <IconButton
        aria-label="Editar"
        icon={<FiEdit />}
        size="sm"
        colorScheme="blue"
        onClick={onOpen}
      />
      {user.perfil === PerfilEnum.ADMIN && (
        <DeleteButton key={"deletebutton"} avaliacao={avaliacao} />
      )}
      <UpsertAvaliacaoDialog
        isOpen={isOpen}
        onClose={onClose}
        avaliacao={avaliacao}
        title="Editar avaliação"
        onConfirm={() => alert("Confirmado!")}
      ></UpsertAvaliacaoDialog>
    </HStack>
  );
}
