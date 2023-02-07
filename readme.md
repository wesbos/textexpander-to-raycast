# Text Expander → Raycast Snippet Script

Generates a importable snippets.json file from your text expander backup.

1. Go to the folder where your latest Text Expander backups live.

For example:

`cd ~/Library/Application\ Support/TextExpander/Backups/TextExpander\ Backup\ 2023-02-07-0830432_122.textexpanderbackup/`

You can generate this folder by hittingt he "backup now" button in text expander.

2. Run this index.ts script with `deno` (https://deno.land/)

deno run --unstable https://raw.githubusercontent.com/wesbos/textexpander-to-raycast/main/index.ts

It will ask to allow read file access to read your snippets backup, and then ask for write file access to write the snippets.json file.

You can also download and run it locally, just put the backup file in whichever folder you are running the script folder from.

## Import into Raycast

Open raycast, run the `import snippets` command, and give it your newly created snippets.json file
