import awsServerlessExpress from "@vendia/serverless-express";
import app from "./expressApp";

export const handler = awsServerlessExpress({ app });
