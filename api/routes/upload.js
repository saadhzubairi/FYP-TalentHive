const express = require("express");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require("firebase/storage");
const multer = require("multer");

const config = require("../firebase.config")
const router = express.Router();

//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "ua" + dateTime}`);
        const metadata = { contentType: req.file.mimetype, };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

router.put("/", async (req, res) => {
    try {
        const fileUrl = req.body.fileUrl;
        const fileNameStartIndex = fileUrl.lastIndexOf("%2F") + 3; // Index of "%2F" + 3 to exclude it
        const fileNameEndIndex = fileUrl.lastIndexOf("?alt=media&token="); // Index before the query parameters
        const fileName = decodeURIComponent(fileUrl.substring(fileNameStartIndex, fileNameEndIndex));
        const fileRef = ref(storage, `files/${fileName}`);
        await deleteObject(fileRef);
        console.log('File successfully deleted.');
        return res.send({
            message: 'File deleted from Firebase Storage.',
            fileUrl: fileUrl
        });
    } catch (error) {
        return res.status(400).send({ error: error.message, fileUrl: req.body.fileUrl, req: req.body });
    }
});


const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

module.exports = router;