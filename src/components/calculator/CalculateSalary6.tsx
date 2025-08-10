import { romania_enviroment } from "../../api/salary";

export function calculateSalary6h(
  difficulty: string,
  technologies: string[],
  experience: string
) {
  // Step 1: Base brut salary for 6h (75% of 8h)
  const brutBase6h = romania_enviroment.brut_salary * 0.75;

  // Step 2: Multipliers
  const difficultyMap: Record<string, number> = {
    low: 1.0,
    medium: 1.2,
    hard: 1.5,
    extreme: 2.0,
  };

  const experienceMap: Record<string, number> = {
    junior: 1.0,
    mid: 1.2,
    senior: 1.5,
    expert: 2.0,
    master: 2.5,
  };

  // Step 3: Get multipliers from maps
  const difficultyMultiplier = difficultyMap[difficulty] ?? 1.0;
  const experienceMultiplier = experienceMap[experience] ?? 1.0;

  // Step 4: Tech bonus
  const techBonus = 1 + technologies.length * 0.05; // +5% per tech

  // Step 5: Calculate brut final for 6h
  const brutFinal =
    brutBase6h * difficultyMultiplier * experienceMultiplier * techBonus;

  // Step 6: Taxes
  const CAS = brutFinal * (romania_enviroment.CAS / 100);
  const CASS = brutFinal * (romania_enviroment.CASS / 100);
  const impozit =
    (brutFinal - CAS - CASS) * (romania_enviroment.impozit_pe_venit / 100);

  const netFinal = brutFinal - CAS - CASS - impozit;

  return {
    brut: brutFinal,
    net: netFinal,
    CAS,
    CASS,
    impozit,
  };
}
