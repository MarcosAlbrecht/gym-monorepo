"use client";
import { Container } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useAuth } from "../_hooks/useAuth";
import { storage } from "../_utils/storage";

export default function page() {
  const { login, user } = useAuth();

  const token = storage.getToken();
  console.log("token armazenado: ", token);

  if (!user) {
    redirect("/login");
  }

  return <Container bg={"blue.500"}></Container>;
}
