import { userData } from "../lib/data";

export const resolvers = {
	Query: {
		users: () => userData,
	},
};
