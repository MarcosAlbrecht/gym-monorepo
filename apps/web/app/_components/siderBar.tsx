"use client";
import {
  Box,
  Drawer,
  DrawerContent,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

import { useAuth } from "@/app/_hooks/useAuth";
import MobileNav from "./mobileNav";
import SidebarContent from "./sidebarContent";

interface SidebarProps {
  children?: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { user } = useAuth();

  useEffect(() => {
    if (isDesktop) onClose();
  }, [isDesktop, onClose]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Sidebar Desktop */}
      <SidebarContent
        user={user!}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />

      {/* Sidebar Mobile */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent user={user!} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Navbar Mobile */}
      <MobileNav user={user!} onOpen={onOpen} />

      {/* Espaço para o conteúdo da página */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
