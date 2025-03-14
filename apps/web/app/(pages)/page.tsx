"use client";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../_hooks/useAuth";

export default function page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("Usuário está logado:", user);
      router.push("/avaliacoes");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return <Container bg={"blue.500"}></Container>;
}
