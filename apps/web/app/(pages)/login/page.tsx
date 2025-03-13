"use client";
import { useAuth } from "@/app/_hooks/useAuth";
import { authUserSchema } from "@/app/_services/schemas/auth-schema";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormValues = z.infer<typeof authUserSchema>;

export default function Home() {
  const router = useRouter();
  const { login, user } = useAuth();
  if (user) {
    router.push("/avaliacoes");
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(authUserSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ usuario, senha }: LoginFormValues) => login(usuario, senha),
    onSuccess: (data) => {
      //login(data);
      console.log("sucesso no login: ");
      router.push("/avaliacoes");
    },
    onError: (error) => {
      console.error("Erro ao logar:", error);
    },
  });

  const onSubmit = (values: LoginFormValues) => mutation.mutate(values);
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="usuario" isInvalid={!!errors.usuario}>
                <FormLabel>Usuário</FormLabel>
                <Input type="text" {...register("usuario")} />
                <FormErrorMessage>{errors.usuario?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.senha}>
                <FormLabel>Senha</FormLabel>
                <Input type="password" {...register("senha")} />
                <FormErrorMessage>{errors.senha?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
