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
  if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
    console.error("entry must be a single non-empty line");
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, LINE + "\n", "utf8");
  // Round-trip check: fail loudly if the file on disk is not exactly the
  // entry we meant to write (truncated write, wrong encoding, stray bytes).
  const written = fs.readFileSync(outPath, "utf8");
  if (written !== LINE + "\n") {
    console.error("entry.txt verification failed: written content does not match the entry");
    process.exit(1);
  }
  console.log(`wrote entry.txt (${LINE.length} chars)`);
}

main();
