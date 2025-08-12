import fs from "fs";
import path from "path";

function extractStatementsFromContent(content: string): string[] {
  const lines = content.split(/\r?\n/);
  const statements: string[] = [];

  let current: string[] = [];
  let capturing = false;

  const startRegexes = [
    /^\s*CREATE\s+TABLE\b/i,
    /^\s*CREATE\s+INDEX\b/i,
  ];

  for (const line of lines) {
    if (!capturing) {
      if (startRegexes.some((re) => re.test(line))) {
        capturing = true;
        current.push(line);
        if (/;\s*$/.test(line)) {
          statements.push(current.join("\n"));
          current = [];
          capturing = false;
        }
      }
      continue;
    }

    current.push(line);
    if (/;\s*$/.test(line)) {
      statements.push(current.join("\n"));
      current = [];
      capturing = false;
    }
  }

  return statements;
}

export function extractDdlStatementsFromSqldelight(dir: string): string[] {
  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith(".sq"))
    .map((f) => path.join(dir, f));

  const statements: string[] = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const extracted = extractStatementsFromContent(content);
    statements.push(...extracted);
  }
  return statements;
}

export function writeDdlFile(outputDirectory: string, statements: string[], filename = "schema_extracted.sql"): string {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  const filePath = path.join(outputDirectory, filename);
  const header = `-- Auto-generated from sqldelight .sq files\n-- Do not edit manually.\n\n`;
  fs.writeFileSync(filePath, header + statements.join("\n\n") + "\n");
  return filePath;
}


