# Bino & Jiggu Extramarital Thoughts Checker

A simple Node.js CLI script that interactively checks whether Bino’s and Jiggu’s extramarital thoughts align. The loop continues until Bino’s extramarital thoughts are fulfilled or either user opts to exit.

---

## Features

* Prompts Bino to confirm if his extramarital thoughts are fulfilled.
* If not, prompts Jiggu for her current thoughts and Bino for his desired thoughts.
* Uses fuzzy substring matching (case-insensitive, punctuation-stripped) to determine compatibility.
* Allows either user to exit the loop at any prompt by typing `exit` or `quit`.
* Gracefully handles Ctrl-C (SIGINT) and EOF (Ctrl-D).

---

## Prerequisites

* [Node.js](https://nodejs.org/) v12 or higher
* A terminal or command prompt

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/bino-extramartial-checker.git
   cd bino-extramartial-checker
   ```
2. (Optional) Install dependencies (none are required for now):

   ```bash
   npm install
   ```

---

## Usage

1. Save the script as `bino.js` in the project root (this repository).
2. Run the script:

   ```bash
   node bino.js
   ```
3. Follow the on-screen prompts:

   * Answer **yes** or **no** to whether Bino’s extramarital thoughts are fulfilled.
   * If **no**, input Jiggu’s and Bino’s descriptions when prompted.
   * Type `exit` or `quit` at any prompt to exit the loop immediately.
4. The script will exit once thoughts are compatible or on exit.

---

## Example Session

```text
$ node bino.js
Bino: Have your extramarital thoughts been fulfilled? (yes/no or type 'exit' to quit) no
Jiggu: What are your extra-marital thoughts? (or 'exit') dinner at the new steakhouse
Bino: Describe what you’re looking for (or 'exit'): steakhouse dinner
🎉 Bino’s extramarital thoughts have been fulfilled!
```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
