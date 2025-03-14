"use client";

import SearchBar from "@/app/_components/searchBar";
import Sidebar from "@/app/_components/siderBar";
import { useAuth } from "@/app/_hooks/useAuth";
import { PerfilEnum } from "@/app/_services/enums/perfil";
import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { findUsers } from "@/app/_actions/users";
import UpsertUserDialog from "@/app/_components/upsertUserDialog";
import { useRouter } from "next/navigation";
import TableUsers from "./_components/tableAvaliacoes";

export default function Avaliacoes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: findUsers,
  });

  function handleClickPlus() {
    onOpen();
  }
  return (
    <Sidebar>
      {user?.perfil !== PerfilEnum.ALUNO && (
        <SearchBar
          enableInputSearch={false}
          onClickPlus={handleClickPlus}
          buttonText="Cadastrar usuario"
        />
      )}
      <TableUsers user={user!} key={"avaliacoes"} users={data} />
      <UpsertUserDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar usuário"
        onConfirm={() => alert("Confirmado!")}
      ></UpsertUserDialog>
    </Sidebar>
  );
}
