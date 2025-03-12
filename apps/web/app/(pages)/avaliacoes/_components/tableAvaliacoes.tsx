import { ReturnAvaliacaoDto } from "@/app/_services/dtos/return-avaliacao-imc.dto";
import { UserDto } from "@/app/_services/dtos/userDto";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import AvaliacaoActionsButtons from "./avaliacaoActionButtons";

interface TableAvaliacaoProps {
  avaliacoes?: ReturnAvaliacaoDto[];
  user: UserDto;
}

export default function TableAvaliacao({
  user,
  avaliacoes,
}: TableAvaliacaoProps) {
  return (
    <TableContainer border={"1px"} rounded={"lg"} borderColor={"gray.400"}>
      <Table variant="simple">
        <TableCaption>Avaliações de IMC</TableCaption>
        <Thead>
          <Tr>
            <Th>Altura</Th>
            <Th>Peso</Th>
            <Th>IMC</Th>
            <Th>Classificação</Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          {avaliacoes?.map((avaliacao) => (
            <Tr>
              <Td>{avaliacao.altura}</Td>
              <Td>{avaliacao.peso}</Td>
              <Td>{avaliacao.imc}</Td>
              <Td>{avaliacao.classificacao}</Td>
              <Td>
                {/* Alinha os botões à direita */}
                <AvaliacaoActionsButtons avaliacao={avaliacao} user={user} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
