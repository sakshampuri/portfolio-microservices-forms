import { exec } from "child_process";
import { functionPackagedZipLocation } from "./compress";
import { promisify } from "util";

const execCommand = promisify(exec);
const functionName = process.env.LAMBDA_FUNCTION_NAME;

export const awsLambdaDeployCliCommand = `aws lambda update-function-code --function-name ${functionName} --zip-file "fileb://${functionPackagedZipLocation}"`;
export const awsLambdaDeployCliCommandDryRun = `${awsLambdaDeployCliCommand} --dry-run`;

export const runCommand = async (command: string) => {
	const { stdout, stderr } = await execCommand(command);
	if (stderr) {
		console.error("stderror is non empty");
		console.error(stderr);
		console.info(stdout);
		throw new Error(stderr);
	}
	console.info(stdout);
};

const main = async () => {
	if (!functionName)
		throw new Error(
			"Expected LAMBDA_FUNCTION_NAME to be defined in env. Please set a valid AWS lambda function identifier name in LAMBDA_FUNCTION_NAME"
		);

	await runCommand(awsLambdaDeployCliCommandDryRun);
	await runCommand(awsLambdaDeployCliCommand);
};

main();
