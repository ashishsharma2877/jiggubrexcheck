// bino.js

const readline = require("readline");

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Gracefully handle Ctrl-C
process.on("SIGINT", () => {
  console.log("\nInterrupted. Goodbye!");
  rl.close();
  process.exit(0);
});

// Gracefully handle EOF (Ctrl-D)
rl.on("close", () => {
  console.log("\nInput closed. Exiting.");
  process.exit(0);
});

/**
 * Promisified prompt function that throws if no input is given.
 */
function ask(question) {
  return new Promise((resolve, reject) => {
    rl.question(question + " ", (answer) => {
      if (answer === null || answer === undefined) {
        reject(new Error("No input provided"));
      } else {
        resolve(answer.trim());
      }
    });
  });
}

/**
 * Normalize a string for fuzzy substring matching:
 * - Lowercases
 * - Removes non-alphanumeric characters (except spaces)
 */
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, "")
    .trim();
}

/**
 * Check whether two free-text responses "match" by
 * seeing if one normalized string contains the other.
 */
function isMatch(rawJiggu, rawBino) {
  const jt = normalize(rawJiggu);
  const bd = normalize(rawBino);
  return jt.includes(bd) || bd.includes(jt);
}

/**
 * Utility to detect exit commands.
 */
function isExitCommand(input) {
  const cmd = input.toLowerCase();
  return cmd === "exit" || cmd === "quit";
}

/**
 * Main interaction loop.
 * Repeats until Bino’s extramarital thoughts are fulfilled,
 * or until either user opts to exit.
 */
async function runLoop() {
  let fulfilled = false;

  while (!fulfilled) {
    let answer;
    try {
      answer = (await ask(
        "Bino: Have your extramarital thoughts been fulfilled? (yes/no or type 'exit' to quit)"
      )).toLowerCase();
    } catch (err) {
      console.error("Error reading input:", err.message);
      continue;
    }

    if (isExitCommand(answer)) {
      console.log("Exiting loop—no hard feelings!");
      break;
    }

    if (answer === "yes") {
      fulfilled = true;
      break;
    } else if (answer !== "no") {
      console.log("→ Please answer 'yes', 'no', or 'exit'.");
      continue;
    }

    // Now ask Jiggu
    let jigguThoughts;
    try {
      jigguThoughts = await ask(
        "Jiggu: What are your extra-marital thoughts? (or 'exit')"
      );
    } catch (err) {
      console.error("Error reading input:", err.message);
      continue;
    }

    if (isExitCommand(jigguThoughts)) {
      console.log("Exiting loop—no hard feelings!");
      break;
    }

    // Ask Bino for what he wants
    let binoDesired;
    try {
      binoDesired = await ask(
        "Bino: Describe what you’re looking for (or 'exit'):"
      );
    } catch (err) {
      console.error("Error reading input:", err.message);
      continue;
    }

    if (isExitCommand(binoDesired)) {
      console.log("Exiting loop—no hard feelings!");
      break;
    }

    // Perform fuzzy substring match
    if (isMatch(jigguThoughts, binoDesired)) {
      fulfilled = true;
    } else {
      console.log("Bino and Jiggu are not compatible extramaritally");
      console.log("Depressed Bino needs a rethink");
    }
  }

  if (fulfilled) {
    console.log("🎉 Bino’s extramarital thoughts have been fulfilled!");
  }
}

(async () => {
  try {
    await runLoop();
  } catch (err) {
    console.error("Unexpected error:", err.message);
  } finally {
    rl.close();
  }
})();