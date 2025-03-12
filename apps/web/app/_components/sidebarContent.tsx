import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { FiClipboard, FiUser } from "react-icons/fi";
import { PerfilEnum } from "../_services/enums/perfil";
import NavItem from "./navItem";

interface SidebarProps extends BoxProps {
  user: UserDto;
  onClose: () => void;
}

const LinkItems = [
  {
    name: "Avaliações",
    icon: FiClipboard,
    path: "/avaliacoes",
    roles: [PerfilEnum.ADMIN, PerfilEnum.ALUNO, PerfilEnum.PROFESSOR],
  },
  { name: "Usuários", icon: FiUser, path: "/users", roles: [PerfilEnum.ADMIN] }, // Apenas admin vê esse item
];

export default function SidebarContent({
  user,
  onClose,
  ...rest
}: SidebarProps) {
  // Obtém o usuário autenticado
  //console.log("usuario logado: ", user);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const pathname = usePathname();
  // Define a role do usuário (padrão: "aluno" se não estiver logado)
  const userRole = user?.perfil || PerfilEnum.ALUNO;

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.filter((link) => link.roles.includes(userRole)).map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          isActive={pathname === link.path}
          onClick={() => {
            setSelectedItem(link.path), redirect(link.path);
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
