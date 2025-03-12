"use client";
import { Container } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useAuth } from "../_hooks/useAuth";

export default function page() {
  const { login, user } = useAuth();

  if (user) {
    console.log("usuario está logado: ", user);
    redirect("/avaliacoes");
  }

  if (!user) {
    redirect("/login");
  }

  return <Container bg={"blue.500"}></Container>;
}
