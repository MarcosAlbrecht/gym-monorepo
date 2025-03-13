"use client";
import { deleteUser } from "@/app/_actions/users";
import ConfirmDeleteDialog from "@/app/_components/confirmDeleteDialog";
import { ReturnUserDto } from "@/app/_services/dtos/return-user.dto";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { FiTrash } from "react-icons/fi";

interface DeleteButtonProps {
  user: ReturnUserDto;
}

export default function DeleteButton({ user }: DeleteButtonProps) {
  const router = useRouter();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const mutation = useMutation({
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      alert("Avaliação excluída com sucesso!");
      onDeleteClose();
      router.refresh();
    },
    onError: (error) => {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir a avaliação!");
    },
  });
  return (
    <>
      <IconButton
        aria-label="Excluir"
        icon={<FiTrash />}
        size="sm"
        colorScheme="red"
        onClick={onDeleteOpen}
      />
      <ConfirmDeleteDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={() => mutation.mutate()}
      />
    </>
  );
}
