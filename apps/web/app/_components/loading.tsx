import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center w="full" h="100vh">
      <VStack spacing={4}>
        <Spinner color="teal.600" size="xl" />
        <Text color="teal.600" fontSize="lg" fontWeight="bold">
          Loading...
        </Text>
      </VStack>
    </Center>
  );
}
