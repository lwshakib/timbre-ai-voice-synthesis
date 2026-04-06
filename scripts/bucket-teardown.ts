import 'dotenv/config';
import {
  S3Client,
  DeleteBucketCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';

// Standard S3 environment variables
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_ENDPOINT,
  AWS_S3_BUCKET_NAME,
  AWS_REGION = 'auto',
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
  console.error('Missing required S3 environment variables.');
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

async function emptyBucket() {
  const listObjectsParams = {
    Bucket: AWS_S3_BUCKET_NAME,
  };

  let listedObjects;
  while (true) {
    listedObjects = await s3Client.send(new ListObjectsV2Command(listObjectsParams));

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) break;

    const deleteParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Delete: {
        Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
      },
    };

    console.log(`Deleting ${listedObjects.Contents.length} objects...`);
    await s3Client.send(new DeleteObjectsCommand(deleteParams));

    if (!listedObjects.IsTruncated) break;
  }
}

async function teardownBucket() {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }));
    console.log(`Bucket "${AWS_S3_BUCKET_NAME}" exists. Tearing down...`);

    await emptyBucket();
    await s3Client.send(new DeleteBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }));

    console.log(`Bucket deleted successfully.`);
  } catch (error: any) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      console.log(`Bucket "${AWS_S3_BUCKET_NAME}" not found. No action needed.`);
    } else {
      throw error;
    }
  }
}

async function main() {
  console.log('--- BUCKET TEARDOWN INITIALIZED ---');
  try {
    await teardownBucket();
    console.log('--- BUCKET TEARDOWN COMPLETED ---');
  } catch (error) {
    console.error('--- BUCKET TEARDOWN FAILED ---');
    console.error(error);
    process.exit(1);
  }
}

main();
