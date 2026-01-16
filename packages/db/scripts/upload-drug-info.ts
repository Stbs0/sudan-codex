// import { createClient } from "@libsql/client";
// import { Database } from "bun:sqlite";
// import dotenv from "dotenv";
// import path from "path";

// // Load environment variables from the web app's dev env
// dotenv.config({
//   path: path.resolve(
//     __dirname,
//     "../../../apps/web-nextjs/.env.production.local",
//   ),
// });

// const TURSO_URL = process.env.TURSO_DATABASE_URL;
// const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

// if (!TURSO_URL || !TURSO_TOKEN) {
//   console.error(
//     "Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment",
//   );
//   process.exit(1);
// }

// const LOCAL_DB_PATH = path.resolve(
//   __dirname,
//   "../../../apps/mobile/mergedDrug.db",
// );

// async function upload() {
//   console.log("Connecting to Turso...");
//   const client = createClient({
//     url: TURSO_URL as string,
//     authToken: TURSO_TOKEN as string,
//   });

//   console.log(`Reading local data from ${LOCAL_DB_PATH}...`);
//   const localDb = new Database(LOCAL_DB_PATH);

//   try {
//     const rows = localDb.query("SELECT * FROM drugInfo").all() as any[];
//     console.log(`Found ${rows.length} rows to upload.`);

//     if (rows.length === 0) {
//       console.log("No rows found. Exiting.");
//       return;
//     }

//     // Batch insertion logic
//     const BATCH_SIZE = 50;
//     for (let i = 0; i < rows.length; i += BATCH_SIZE) {
//       const batch = rows.slice(i, i + BATCH_SIZE);
//       const statements = batch.map((row) => ({
//         sql: `INSERT OR REPLACE INTO drugInfo (
//           drug_id, title, ind, adult, ped, side, prgnancy, intermajer, clinical, admin, interminor, contra, clas, mode
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         args: [
//           row.drug_id,
//           row.title,
//           row.ind,
//           row.adult,
//           row.ped,
//           row.side,
//           row.prgnancy,
//           row.intermajer,
//           row.clinical,
//           row.admin,
//           row.interminor,
//           row.contra,
//           row.clas,
//           row.mode,
//         ],
//       }));

//       await client.batch(statements, "write");
//       console.log(
//         `Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(rows.length / BATCH_SIZE)}`,
//       );
//     }

//     console.log("Upload completed successfully!");
//   } catch (error) {
//     console.error("Error during upload:", error);
//   } finally {
//     localDb.close();
//   }
// }

// upload().catch(console.error);
