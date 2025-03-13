import { ReturnUserDto } from "@/app/_services/dtos/return-user.dto";
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
import UsersActionsButtons from "./usersActionButtons";

interface TableUsersProps {
  users?: ReturnUserDto[];
  user: UserDto;
}

export default function TableUsers({ user, users }: TableUsersProps) {
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
            <Th>Professor</Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((avaliacao) => (
            <Tr>
              <Td>{avaliacao.nome}</Td>
              <Td>{avaliacao.usuario}</Td>
              <Td>{avaliacao.perfil}</Td>
              <Td>{avaliacao.situacao}</Td>
              <Td>{avaliacao.usuario_professor?.nome}</Td>

              <Td>
                {/* Alinha os botões à direita */}
                <UsersActionsButtons user={user} users={users} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
