require("dotenv").config({ path: ".env" });
const AWS = require("aws-sdk");

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const BASE_URLS = `https://${BUCKET_NAME}.s3.amazonaws.com/`

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

async function awsQueryImg (prefix) {
    
    const params = {
        Bucket: BUCKET_NAME,
        Delimiter: "/",
        Prefix: prefix
    }
    
    try {
        const data = await s3.listObjects(params).promise();
        return data.Contents.map(obj => ({urlsProduct:`${BASE_URLS}${obj.Key}`}));
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = awsQueryImg;