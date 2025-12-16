import { createClient } from "@libsql/client";
import { writeFile } from "fs";

// const match = NewForm.map((drug, index) => ({ id: index, slug: drug.slug }));

// writeFile("match.json", JSON.stringify(match), "utf8", (err) =>
//   console.log(err),
// );
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const data = await client.execute("SELECT id, slug from drugs");
console.log(data.rows);
writeFile("matchDB.json", JSON.stringify(data.rows), "utf8", (err) =>
  console.log(err),
);
