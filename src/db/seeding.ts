import 'dotenv/config';
import dbClient from '../clients/db';
import { bloodType, factorRh } from '../types/blood.d';
import { bloods } from './schema/bloods';

async function seeding() {
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

  process.exit();
}

seeding()