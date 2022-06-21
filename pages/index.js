import React, { useState } from "react";
import { Heading, Container, VStack, Text, HStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { initialData } from "../initialData";

export default function Home() {
	const [listItems, setListItems] = useState(initialData);

	const handleDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		// Check if item is dragged outside the DraggableContext
		if (!destination) {
			return;
		}

		// Check if source and destination is the same
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const start = listItems.columns[source.droppableId];
		const finish = listItems.columns[destination.droppableId];

		// If item is dropped in the same column as initial
		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newListItems = {
				...listItems,
				columns: {
					...listItems.columns,
					[newColumn.id]: newColumn,
				},
			};

			setListItems(newListItems);
			return;
		}

		// Moving from one column to another
		const startTaskIds = Array.from(start.taskIds);
		// remove task from original column
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		// add task to destination column
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newListItems = {
			...listItems,
			columns: {
				...listItems.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		setListItems(newListItems);
	};

	return (
		<Container maxW="container.xl" h="100vh" p={4}>
			<VStack h="full">
				<Heading>Starter Template</Heading>
				{/* <NoSSR> */}
				<DragDropContext onDragEnd={handleDragEnd}>
					<HStack spacing={4} pt={4}>
						{listItems?.columnOrder?.map((columnId, index) => {
							const column = listItems?.columns[columnId];
							const tasks = column.taskIds.map((taskId) => listItems?.tasks[taskId]);
							return (
								<VStack bg="red.100" py={4} px={2} key={column.id}>
									<Text fontSize="md">{column.title}</Text>
									<Droppable droppableId={column.id} index={index}>
										{(provided) => (
											<VStack ref={provided.innerRef} {...provided.droppableProps} minH="150px" minW="200px" h="full">
												{tasks?.map((task, index) => {
													return (
														<Draggable draggableId={task.id} key={task.id} index={index}>
															{(provided) => (
																<Text
																	ref={provided.innerRef}
																	{...provided.dragHandleProps}
																	{...provided.draggableProps}
																	bg="blue.100"
																	px={4}
																	w="full"
																	py={1}
																	key={index}
																>
																	{task.content}
																</Text>
															)}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</VStack>
										)}
									</Droppable>
								</VStack>
							);
						})}
					</HStack>
				</DragDropContext>
				{/* </NoSSR> */}
			</VStack>
		</Container>
	);
}

export async function getServerSideProps(context) {
	resetServerContext();
	return { props: { data: [] } };
}
