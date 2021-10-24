import { hostName, sqsURL } from "./constants";

const encodeMessage = (message: string) => message.split(" ").join("+");

const data = {
	successRedirect: `${hostName}?message=${encodeMessage(
		"Thanks for contacting me, I'll get back to you soon!"
	)}`,
	errorRedirect: (message: string) =>
		`${hostName}?message=${encodeMessage(
			`Error processing your request. Message: ${message}`
		)}`,
	sqsURL,
};

export default data;
