const fs = require('fs');
const path = process.argv[2]; // The file path is passed as a command line argument

function cat(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`);
            console.error(err.message);
            process.exit(1); // Halt the script execution
        } else {
            console.log(data);
        }
    });
}

cat(path);
