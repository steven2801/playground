import React from "react";
import { Box, VStack, Heading, HStack, Text, Divider } from "@chakra-ui/react";

function Card() {
	return (
		<VStack maxW={72} bg="whiteAlpha.200" p={4} borderRadius="md" alignItems="flex-start" spacing={4}>
			<Box w={64} h={64} borderRadius="md" bg="whiteAlpha.300"></Box>
			<Heading size="sm">Equilibrium #3429</Heading>
			<Text color="whiteAlpha.700">Our Equilibrium collection promotes balance and calm.</Text>
			<HStack justifyContent="space-between" w="full">
				<Text color="teal" fontWeight="bold">
					0.041 ETH
				</Text>
				<Text color="whiteAlpha.700">3 days left</Text>
			</HStack>
			<Divider></Divider>
			<Text w="full" textAlign="center" pt={2}>
				Design by{" "}
				<Box
					as="a"
					href="https://www.frontendmentor.com"
					_hover={{ opacity: 0.8 }}
					color="whiteAlpha.700"
					fontWeight="bold"
				>
					Frontend Mentor.
				</Box>
			</Text>
		</VStack>
	);
}

export default Card;
