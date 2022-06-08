import { Container, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import CardContainer from "../components/CardContainer";

export default function Home() {
	const MotionContainer = motion(Container);
	const containerRef = useRef();

	const [cards, setCards] = useState([1, 2, 3, 4, 5, 6]);
	const deleteCard = () => {
		let tempCards = [...cards];
		tempCards.shift();
		setCards(tempCards);
	};

	const variants = {
		initial: {
			height: containerRef.current?.clientHeight ? containerRef.current?.clientHeight : "auto",
		},
		animate: {
			height: "auto",
			transition: { duration: 0.5 },
		},
	};

	return (
		<MotionContainer
			ref={containerRef}
			variants={variants}
			initial="initial"
			animate="animate"
			height="auto"
			maxW="container.xl"
			bg="whiteAlpha.100"
			my={8}
			borderRadius="lg"
			p={0}
		>
			<Button onClick={deleteCard}>Delete Card</Button>
			<CardContainer cards={cards} />
		</MotionContainer>
	);
}
