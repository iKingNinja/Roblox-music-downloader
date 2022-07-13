const fetch = require('node-fetch');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const os = require('os');

const windowsUsername = os.userInfo().username;
const targetDir = `C:\\Users\\${windowsUsername}\\Documents\\Roblox audio`;

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

async function downloadAudio(location) {
    console.log(`Downloading file from ${location}...`);

    const blobRes = await fetch(location);

    if (!blobRes.ok) {
        return console.log('Something went wrong while downloading file blob.');
    }

    console.log('Elaborating data...');

    const blob = await blobRes.blob();
    const buffer = await blob.arrayBuffer();
    const data = new Buffer.from(buffer);

    const id = location.split('/')[3];
    const fileUuid = uuid();

    fs.writeFile(`${targetDir}\\${fileUuid}.ogg`, data, function(err) {
        if (err) {
            return console.log('Something went wrong while creating file from buffer.');
        }

        console.log(`Sucessfully downloaded ${id}, saved as ${fileUuid}.`);
    })
}

downloadAudio('https://c7.rbxcdn.com/f76ee1402598e6d3d541addf1f70d47d');