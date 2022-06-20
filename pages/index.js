import React from "react";
import { Heading, Container, VStack } from "@chakra-ui/react";

export default function Home() {
	return (
		<Container maxW="container.xl" h="100vh" p={4}>
			<VStack h="full">
				<Heading>Starter Template</Heading>
			</VStack>
		</Container>
	);
}
