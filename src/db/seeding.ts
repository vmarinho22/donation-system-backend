import 'dotenv/config';
import dbClient from '../clients/db';
import { bloodType, factorRh } from '../types/blood';
import { bloods } from './schema/bloods';

async function seeding() {

  const returnedBlood = await dbClient.select({ id: bloods.id }).from(bloods);

  if (returnedBlood.length === 0) {
    console.log('Seeding...');
    await dbClient.insert(bloods).values([
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.A_POSITIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.A_POSITIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.A_NEGATIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.A_NEGATIVE
      },
      
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.B_POSITIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.B_POSITIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.B_NEGATIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.B_NEGATIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.AB_POSITIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.AB_POSITIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.AB_NEGATIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.AB_NEGATIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.AB_POSITIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.AB_POSITIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.AB_NEGATIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.AB_NEGATIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.O_POSITIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.O_POSITIVE
      },
      {
        factor_rh: factorRh.POSITIVE,
        type: bloodType.O_NEGATIVE
      },
      {
        factor_rh: factorRh.NEGATIVE,
        type: bloodType.O_NEGATIVE
      }
    ]);
  }


  console.log('Seeding done!')
  process.exit();
}

seeding();