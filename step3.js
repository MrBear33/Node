const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2);
let outputFile, path;

// Check if `--out` is provided
if (args[0] === '--out') {
    outputFile = args[1];
    path = args[2];
} else {
    path = args[0];
}

// Function to write data to a file or print to console
function outputData(data, outputFile) {
    if (outputFile) {
        fs.writeFile(outputFile, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${outputFile}:`);
                console.error(err.message);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

// Function to read from a file
function cat(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`);
            console.error(err.message);
            process.exit(1);
        } else {
            outputData(data, outputFile);
        }
    });
}

// Function to fetch content from a URL
async function webCat(url) {
    try {
        const response = await axios.get(url);
        outputData(response.data, outputFile);
    } catch (err) {
        console.error(`Error fetching ${url}:`);
        console.error(err.message);
        process.exit(1);
    }
}

// Determine if the path is a file or URL
if (path.startsWith('http')) {
    webCat(path);
} else {
    cat(path);
}
