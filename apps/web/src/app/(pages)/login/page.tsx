"use client";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "../../_services/api";

// Esquema de validação com Zod
const loginSchema = z.object({
  usuario: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ usuario, password }: LoginFormValues) =>
      loginUser(usuario, password),
    onSuccess: (data) => {
      //login(data);
      console.log(data);
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
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <Input type="password" {...register("password")} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
