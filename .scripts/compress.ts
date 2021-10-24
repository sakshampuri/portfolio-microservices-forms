import AdmZip from "adm-zip";
import { version as projectVersion } from "../package.json";
import { join as joinPath } from "path";

const zipper = new AdmZip();

const buildDir = joinPath(__dirname, "..", "build");

console.info(`Build directory: ${buildDir}`);

zipper.addLocalFile(joinPath(buildDir, "index.js"));
zipper.addLocalFile(joinPath(buildDir, "index.js.map"));

export const functionPackagedZipLocation = joinPath(
	buildDir,
	`prodDeploy-${projectVersion}.zip`
);

console.info(`Writing prod zip at ${functionPackagedZipLocation}`);

zipper.writeZip(functionPackagedZipLocation);

console.info(`Wrote prod zip at ${functionPackagedZipLocation}`);
