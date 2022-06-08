import React, { memo } from "react";
import { Flex, HStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";

const CardContainer = memo(({ cards }) => {
	const MotionFlex = motion(Flex);

	return (
		<HStack justifyContent="center" p={16} spacing={0} gap={6} flexFlow="wrap">
			<AnimatePresence>
				{cards.map((card) => {
					return (
						<MotionFlex key={card} exit={{ opacity: 0 }} alignItems="center" justifyContent="center">
							<Card />
						</MotionFlex>
					);
				})}
			</AnimatePresence>
		</HStack>
	);
});

export default CardContainer;
