"use client";

import SearchBar from "@/app/_components/searchBar";
import Sidebar from "@/app/_components/siderBar";
import UpsertAvaliacaoDialog from "@/app/_components/upsertAvaliacaoDialog";
import { useAuth } from "@/app/_hooks/useAuth";
import { PerfilEnum } from "@/app/_services/enums/perfil";
import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { findAvaliacoes } from "@/app/_actions/avaliacao";
import TableAvaliacao from "./_components/tableAvaliacoes";

export default function Avaliacoes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["avaliacao"],
    queryFn: findAvaliacoes,
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
      <TableAvaliacao user={user!} key={"avaliacoes"} avaliacoes={data} />
      <UpsertAvaliacaoDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar avaliação"
        onConfirm={() => alert("Confirmado!")}
      ></UpsertAvaliacaoDialog>
    </Sidebar>
  );
}
