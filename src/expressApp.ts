import cors from "cors";
import express from "express";
import { contactForm } from "./routes";

const port = Number(process.env["PORT"]) || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(contactForm);

app.listen(port, () => console.log(`Listening on ${port}`));

export default app;
