import prisma from '@/lib/prisma';
import 'dotenv/config';

async function main() {
  const voices = await prisma.voice.findMany();
  console.log('Total voices:', voices.length);
  console.log('Voices:', JSON.stringify(voices, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
