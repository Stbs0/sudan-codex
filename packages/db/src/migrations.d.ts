interface MigrationJournal {
  version: string;
  dialect: string;
  entries: {
    idx: number;
    version: string;
    when: number;
    tag: string;
    breakpoints: boolean;
  }[];
}

interface MigrationData {
  journal: MigrationJournal;
  migrations: Record<string, string>;
}

declare const migrations: MigrationData;

export default migrations;
