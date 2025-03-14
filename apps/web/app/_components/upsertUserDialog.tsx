"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { findAlunos } from "../_actions/avaliacao";
import { upsertUser } from "../_actions/users";
import { useAuth } from "../_hooks/useAuth";
import { ReturnUserDto } from "../_services/dtos/return-user.dto";
import { PerfilEnum } from "../_services/enums/perfil";
import { SituacaoEnum } from "../_services/enums/situacao";
import { userSchema } from "../_services/schemas/create-user-schema";
import Loading from "./loading";

interface UpsertUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  userProps?: ReturnUserDto;
  onConfirm?: () => void;
  confirmText?: string;
}

type FormUserSchema = z.infer<typeof userSchema>;

export default function UpsertUserDialog({
  isOpen,
  onClose,
  title,
  userProps,
  onConfirm,
  confirmText = "Confirmar",
}: UpsertUserDialogProps) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      //refetch(); // Executa a query quando o modal abre
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: userProps ?? {
      id_professor: null,
      nome: "",
      perfil: PerfilEnum.ALUNO,
      senha: "",
      situacao: SituacaoEnum.ATIVO,
      usuario: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormUserSchema) =>
      upsertUser({
        ...data,
        id: userProps?.id ?? "", // Garante que id seja passado se existir
      }),
    onSuccess: (data) => {
      //login(data);

      onClose();
      //router.refresh();
    },
    onError: (error) => {
      console.error("Erro ao logar:", error);
    },
  });

  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useQuery({
      queryKey: ["users"],
      queryFn: findAlunos,
      enabled: false,
    });

  if (isLoading) return <Loading />;

  const onSubmit = (values: FormUserSchema) => mutation.mutate(values);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="altura" isInvalid={!!errors.nome}>
                <FormLabel>Nome</FormLabel>
                <Input type="text" {...register("nome")} />
                <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="usuario" isInvalid={!!errors.usuario}>
                <FormLabel>Usuario</FormLabel>
                <Input type="text" {...register("usuario")} />
                <FormErrorMessage>{errors.usuario?.message}</FormErrorMessage>
              </FormControl>

              {/* <FormControl id="usuario_aluno" isInvalid={!!errors.idAluno}>
                <FormLabel>Aluno</FormLabel>
                <Select
                  {...register("idAluno")}
                  placeholder="Selecione um aluno"
                  disabled={avaliacao !== undefined} // Desabilita caso já tenha uma avaliação
                >
                  {data?.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                      selected={avaliacao?.usuario_aluno.id === user.id}
                    >
                      {user.nome}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.idAluno?.message}</FormErrorMessage>
              </FormControl> */}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="ghost">
              Fechar
            </Button>

            <Button
              colorScheme="blue"
              type="submit"
              ml={3}
              isLoading={isSubmitting}
            >
              {confirmText}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
