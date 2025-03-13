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
  Select,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { findAlunos, upsertAvaliacao } from "../_actions/avaliacao";
import { useAuth } from "../_hooks/useAuth";
import { ReturnAvaliacaoDto } from "../_services/dtos/return-avaliacao-imc.dto";
import { avaliacaoImcSchema } from "../_services/schemas/avaliacao-imc.schema";
import Loading from "./loading";

interface UpsertAvaliacaoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  avaliacao?: ReturnAvaliacaoDto;
  onConfirm?: () => void;
  confirmText?: string;
}

type FormAvaliacaoSchema = z.infer<typeof avaliacaoImcSchema>;

export default function UpsertAvaliacaoDialog({
  isOpen,
  onClose,
  title,
  avaliacao,
  onConfirm,
  confirmText = "Confirmar",
}: UpsertAvaliacaoDialogProps) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      refetch(); // Executa a query quando o modal abre
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormAvaliacaoSchema>({
    resolver: zodResolver(avaliacaoImcSchema),
    defaultValues: avaliacao ?? {
      altura: 0.5,
      peso: 10,
      idAluno: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormAvaliacaoSchema) =>
      upsertAvaliacao({ ...data, user: user!, avaliacao }),
    onSuccess: (data) => {
      //login(data);

      onClose();
      router.refresh();
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

  const onSubmit = (values: FormAvaliacaoSchema) => mutation.mutate(values);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="altura" isInvalid={!!errors.altura}>
                <FormLabel>Altura em metros</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  {...register("altura", { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.altura?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="peso" isInvalid={!!errors.peso}>
                <FormLabel>Peso</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  {...register("peso", { valueAsNumber: true })}
                />
                <FormErrorMessage>{errors.peso?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="usuario_aluno" isInvalid={!!errors.idAluno}>
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
              </FormControl>
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
