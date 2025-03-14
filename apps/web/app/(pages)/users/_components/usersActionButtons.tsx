import UpsertUserDialog from "@/app/_components/upsertUserDialog";
import { ReturnUserDto } from "@/app/_services/dtos/return-user.dto";
import { UserDto } from "@/app/_services/dtos/userDto";
import { PerfilEnum } from "@/app/_services/enums/perfil";
import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import DeleteButton from "./deleteButton";

interface UsersActionsButtonsProps {
  usr: ReturnUserDto;
  user: UserDto;
}

export default function UsersActionsButtons({
  usr,
  user,
}: UsersActionsButtonsProps) {
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
        <DeleteButton key={"deletebutton"} user={usr} />
      )}
      <UpsertUserDialog
        isOpen={isOpen}
        onClose={onClose}
        userProps={usr}
        title="Editar usuário"
        onConfirm={() => alert("Confirmado!")}
      ></UpsertUserDialog>
    </HStack>
  );
}
