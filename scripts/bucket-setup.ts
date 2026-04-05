import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { 
    S3Client, 
    CreateBucketCommand, 
    PutObjectCommand, 
    HeadBucketCommand,
    type PutObjectCommandInput 
} from "@aws-sdk/client-s3";

// Standard S3 environment variables
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_ENDPOINT,
    AWS_S3_BUCKET_NAME,
    AWS_REGION = "auto"
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
    console.error("Missing required S3 environment variables.");
    process.exit(1);
}

const s3Client = new S3Client({
    region: AWS_REGION,
    endpoint: AWS_ENDPOINT || undefined,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

const VOICES_DIR = path.join(process.cwd(), "public", "system-voices");

async function ensureBucket() {
    try {
        await s3Client.send(new HeadBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }));
        console.log(`Bucket "${AWS_S3_BUCKET_NAME}" already exists.`);
    } catch (error: any) {
        if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
            console.log(`Creating bucket "${AWS_S3_BUCKET_NAME}"...`);
            await s3Client.send(new CreateBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }));
            console.log(`Bucket created.`);
        } else {
            throw error;
        }
    }
}

async function uploadVoices() {
    const files = await fs.readdir(VOICES_DIR);
    const wavFiles = files.filter(f => f.endsWith(".wav"));

    console.log(`Uploading ${wavFiles.length} system voices...`);

    for (const file of wavFiles) {
        const filePath = path.join(VOICES_DIR, file);
        const buffer = await fs.readFile(filePath);
        const key = `voices/system/${file}`;

        const uploadParams: PutObjectCommandInput = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: "audio/wav",
        };

        try {
            await s3Client.send(new PutObjectCommand(uploadParams));
            console.log(`✓ Uploaded: ${file} -> ${key}`);
        } catch (error) {
            console.error(`✗ Failed to upload ${file}:`, error);
        }
    }
}

async function main() {
    console.log("--- BUCKET SETUP INITIALIZED ---");
    try {
        await ensureBucket();
        await uploadVoices();
        console.log("--- BUCKET SETUP COMPLETED ---");
    } catch (error) {
        console.error("--- BUCKET SETUP FAILED ---");
        console.error(error);
        process.exit(1);
    }
}

main();
