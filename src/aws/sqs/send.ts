import {
	SQSClient,
	SendMessageCommand,
	SendMessageCommandInput,
} from "@aws-sdk/client-sqs";
import { v4 as uuidV4 } from "uuid";
import { awsRegion, SQSGroupID } from "../../utils/constants";
import appData from "../../utils/data";

export interface ExpectedFormData {
	name: string;
	email: string;
	message: string;
	token: string;
}

const getParams = (data: ExpectedFormData): SendMessageCommandInput => ({
	MessageBody: JSON.stringify(data),
	MessageDeduplicationId: uuidV4(), // Required for FIFO queues
	MessageGroupId: SQSGroupID, // Required for FIFO queues
	QueueUrl: appData.sqsURL,
});

const sendMessageToSQS = async (data: ExpectedFormData) => {
	const client = new SQSClient({ region: awsRegion });
	const command = new SendMessageCommand(getParams(data));
	try {
		const responseData = await client.send(command);
		console.info(
			`Sent message to SQS successfully with message id: ${responseData.MessageId} Sequence Number: ${responseData.SequenceNumber}`
		);
	} catch (e) {
		console.error("Failed to send message to SQS with data:");
		console.info(data);
		console.info(`Params generated for SQS: ${getParams(data)}`);
		console.error(e);
		throw new Error("Failed SQS message");
	}
};

export default sendMessageToSQS;
