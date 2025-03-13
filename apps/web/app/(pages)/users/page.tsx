"use client";

import SearchBar from "@/app/_components/searchBar";
import Sidebar from "@/app/_components/siderBar";
import UpsertAvaliacaoDialog from "@/app/_components/upsertAvaliacaoDialog";
import { useAuth } from "@/app/_hooks/useAuth";
import { PerfilEnum } from "@/app/_services/enums/perfil";
import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { findUsers } from "@/app/_actions/users";
import TableUsers from "./_components/tableAvaliacoes";

export default function Avaliacoes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: findUsers,
  });

  function handleClickPlus() {
    console.log("clicou");
    onOpen();
  }
  return (
    <Sidebar>
      {user?.perfil !== PerfilEnum.ALUNO && (
        <SearchBar
          onClickPlus={handleClickPlus}
          buttonText="Cadastrar avaliação"
        />
      )}
      <TableUsers user={user!} key={"avaliacoes"} users={data} />
      <UpsertAvaliacaoDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar avaliação"
        onConfirm={() => alert("Confirmado!")}
      ></UpsertAvaliacaoDialog>
    </Sidebar>
  );
}
