export const hostName = new URL(
	process.env.HOST_NAME || "https://sakshampuri.com"
).toString();

export const awsRegion = process.env.AWS_REGION || "ap-south-1";

export const SQSGroupID = process.env.SQS_GROUP_ID || "form";

export const sqsURL = process.env.SQS_URL;
