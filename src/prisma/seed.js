
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const defaultAccountIban = 'TN89370400440532013000'; 

  const existingAccount = await prisma.account.findUnique({
    where: { iban: defaultAccountIban },
  });

  if (existingAccount) {
    console.log(`Account with IBAN ${defaultAccountIban} already exists. Skipping creation.`);
    return;
  }

  // Create the default account
  const account = await prisma.account.create({
    data: {
      iban: defaultAccountIban,
      id:"1"
    },
  });

  console.log(`Created account with IBAN: ${account.iban}`);
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
