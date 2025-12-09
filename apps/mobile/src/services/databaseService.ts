// import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// const db = SQLite.openDatabase('drug.db');

// const getItemsCount = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT COUNT(*) as count FROM items',
//         [],
//         (_, { rows: { _array } }) => resolve(_array[0].count),
//         (_, error) => {
//           reject(error);
//           return false;
//         }
//       );
//     });
//   });
// };

// export const initDB = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, name TEXT, tradeName TEXT, category TEXT, company TEXT, dosageForm TEXT, packSize TEXT, composition TEXT);'
//     );
//   });

//   getItemsCount().then(async count => {
//     if (count === 0) {
//       try {
//         const asset = Asset.fromModule(require('../assets/data/drugData.json'));
//         await asset.downloadAsync();
//         const jsonString = await FileSystem.readAsStringAsync(asset.localUri as string);
//         const drugData = JSON.parse(jsonString);

//         db.transaction(tx => {
//           drugData.forEach((item: any) => {
//             tx.executeSql('INSERT INTO items (name, tradeName, category, company, dosageForm, packSize, composition) VALUES (?, ?, ?, ?, ?, ?, ?)',
//               [item.name, item.tradeName, item.category, item.company, item.dosageForm, item.packSize, item.composition]);
//           });
//         });
//       } catch (e) {
//         console.error("Failed to load data into database", e);
//       }
//     }
//   });
// };

// export const searchDrugs = (searchTerm: string, callback: (results: any[]) => void) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'SELECT * FROM items WHERE name LIKE ? OR tradeName LIKE ?',
//       [`%${searchTerm}%`, `%${searchTerm}%`],
//       (_, { rows: { _array } }) => {
//         callback(_array);
//       }
//     );
//   });
// };
