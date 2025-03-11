import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavItemProps {
  icon: React.ElementType;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  icon,
  children,
  isActive,
  onClick,
}: NavItemProps) {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      bg={isActive ? "blue.500" : "transparent"} // Cor de fundo do item ativo
      color={isActive ? "white" : "inherit"}
      _hover={{
        bg: useColorModeValue("gray.200", "gray.700"),
        color: "black",
      }}
      onClick={onClick}
    >
      {icon && <Icon mr="4" fontSize="16" as={icon} />}
      <Text>{children}</Text>
    </Flex>
  );
}
