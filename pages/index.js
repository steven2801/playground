import React from "react";
import { Heading, Container, VStack, Button } from "@chakra-ui/react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getProviders } from "next-auth/react";

export default function Home({ provider }) {
	const { data: session } = useSession();
	const { spotify } = provider;

	return (
		<Container maxW="container.xl" h="100vh" p={4}>
			<VStack h="full">
				<Heading>Starter Template</Heading>
				{session?.user ? (
					<Button onClick={() => signOut()}>Sign out</Button>
				) : (
					<Button onClick={() => signIn(spotify.id)}>Login with spotify</Button>
				)}
			</VStack>
		</Container>
	);
}

export async function getServerSideProps() {
	const provider = await getProviders();

	return {
		props: {
			provider,
		},
	};
}
