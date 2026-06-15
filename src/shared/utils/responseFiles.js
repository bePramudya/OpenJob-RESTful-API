import fs from "node:fs";
import path from "node:path";

const responseFile = (res, document) => {
	const filePath = path.join(process.cwd(), "public", document.file_url);

	if (!fs.existsSync(filePath)) throw new NotFoundError("File Note found");

	fs.createReadStream(filePath).pipe(
		res.status(200).set({
			"Content-Type": document.file_type,
			"Content-Disposition": `inline; filename="${document.filename}"`,
			"Content-Length": document.file_size,
		}),
	);
};

export default responseFile;
