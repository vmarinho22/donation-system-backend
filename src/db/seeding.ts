import 'dotenv/config';
import dbClient from '../clients/db';
import { bloodType } from '../types/blood';
import { bloods } from './schema/bloods';


async function seeding() {

  const returnedBlood = await dbClient.select({ id: bloods.id }).from(bloods);

  if (returnedBlood.length === 0) {
    console.log('Seeding...');
    const bloodsArray = [
      bloodType.A_POSITIVE, 
      bloodType.A_NEGATIVE, 
      bloodType.B_POSITIVE, 
      bloodType.B_NEGATIVE,
      bloodType.AB_POSITIVE,
      bloodType.AB_NEGATIVE,
      bloodType.O_POSITIVE,
      bloodType.O_NEGATIVE
    ];
    await dbClient.insert(bloods).values(bloodsArray.map((type) => ({ type })));
  }

  console.log('Seeding done!')
  process.exit();
}

seeding();