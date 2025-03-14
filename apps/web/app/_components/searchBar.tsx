import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

interface NavbarProps {
  buttonText: string;
  enableInputSearch: boolean;
  onClickPlus: () => void;
}
export default function SearchBar({
  enableInputSearch = true,
  onClickPlus,
  buttonText,
}: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Buscar por:", search);
    // Aqui você pode adicionar a lógica de busca
  };
  return (
    <>
      {/* Navbar */}
      <Flex
        w="100%"
        bg="white"
        rounded={"md"}
        p={4}
        align="center"
        justify="space-between"
        mb={4}
      >
        {/* Campo de Pesquisa */}
        {enableInputSearch && (
          <InputGroup maxW={"3xl"} size="sm">
            <Input pr="4.5rem" type={"text"} placeholder="Pesquisar" />
            <InputRightElement width="">
              <Button h="full" size="sm" onClick={() => {}}>
                <FiSearch />
              </Button>
            </InputRightElement>
          </InputGroup>
        )}

        {/* Botão que abre o modal */}
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          color={"white"}
          onClick={onClickPlus}
          ml="auto"
        >
          {buttonText}
        </Button>
      </Flex>
    </>
  );
}
