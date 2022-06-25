import React, { useEffect, useState } from "react";
import { Heading, Container, HStack, VStack, Button, Text } from "@chakra-ui/react";
import { signIn, useSession, signOut } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { spotifyApi } from "../lib/spotify";

export default function Home({ provider }) {
	const { data: session } = useSession();
	const { spotify } = provider;

	useEffect(() => {
		session && spotifyApi.setAccessToken(session.accessToken);
	}, [session]);

	const [recentTracks, setRecentTracks] = useState([]);

	const fetchTracks = () => {
		if (session.accessToken) {
			spotifyApi.getMyRecentlyPlayedTracks().then((res) => {
				try {
					const {
						body: { items },
					} = res;
					setRecentTracks(items);
				} catch (err) {
					console.log(err);
				}
			});
			return true;
		}
		return false;
	};
	return (
		<Container maxW="container.xl" h="100vh" p={4}>
			<VStack h="full" justifyContent="center" spacing={8}>
				<Heading>Starter Template</Heading>
				{session?.user ? (
					<Button onClick={() => signOut()}>Sign out</Button>
				) : (
					<Button onClick={() => signIn(spotify.id)}>Login with spotify</Button>
				)}
				<Button onClick={fetchTracks} disabled={!session}>
					Get Recently Played
				</Button>
				<HStack maxW="800px" flexWrap="wrap" spacing={0} gap={4}>
					{recentTracks.map((recent, index) => {
						const {
							track: { name },
						} = recent;
						return (
							<VStack key={index} bg="red.100" rounded="md" px={4} py={1}>
								<Text>{name}</Text>
							</VStack>
						);
					})}
				</HStack>
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
