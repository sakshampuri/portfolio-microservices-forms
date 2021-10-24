import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import sendMessageToSQS, { ExpectedFormData } from "../aws/sqs/send";
import data from "../utils/data";

const router = express.Router();

router.post(
	"/forms/contact",
	body("email").isEmail().escape(),
	body("name")
		.isLength({ min: 1 })
		.withMessage("Name should not be empty")
		.escape(),
	body("message")
		.isLength({ min: 1 })
		.withMessage("A message should be provided")
		.trim()
		.escape(),
	body("token").isLength({ min: 20 }),
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const formattedErrors = errors.array().map((er) => er.msg);
			return res.redirect(data.errorRedirect(JSON.stringify(formattedErrors)));
		}
		console.log("Logging inside contact endpoint");
		console.log(req.body);
		try {
			await sendMessageToSQS(req.body as ExpectedFormData);
		} catch (e) {
			return res.redirect(
				data.errorRedirect(`Error sending message to SQS queue. ${e}`)
			);
		}
		return res.redirect(data.successRedirect);
	}
);

export default router;
