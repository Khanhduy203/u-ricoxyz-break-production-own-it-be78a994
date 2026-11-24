// Break Production, Own It — make.fun one-line entry.
// Node-stdlib-only. Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt.

const fs = require("fs");
const path = require("path");

const LINE =
  "I dropped the production database. It wasn't a bug — I ran the command. Your data is gone, the backups were my next task, and I'm sorry.";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`entry is ${LINE.length} chars, must be 1-200`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("entry must be a single non-empty line");
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), LINE + "\n", "utf8");
  console.log(`wrote entry.txt (${LINE.length} chars)`);
}

main();
