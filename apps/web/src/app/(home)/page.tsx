"use client";
import {
  Button,
  Field,
  Fieldset,
  Flex,
  Input,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Contact details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your contact details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Usuario</Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Senha</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" width="100%" mt={5} alignSelf="flex-start">
          Logar
        </Button>
      </Fieldset.Root>
    </Flex>
  );
};

export default App;
