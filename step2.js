const fs = require('fs');
const axios = require('axios');
const arg = process.argv[2];

// Function to read from a file
function cat(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`);
            console.error(err.message);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

// Function to fetch content from a URL
async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.error(`Error fetching ${url}:`);
        console.error(err.message);
        process.exit(1);
    }
}

// Determine if the argument is a file path or URL
if (arg.startsWith('http')) {
    webCat(arg);
} else {
    cat(arg);
}
