import { romania_enviroment } from "../../api/salary";

export function calculateSalary4h(
  difficulty: string,
  technologies: string[],
  experience: string
) {
  // Base brut salary for 4h (50% of 8h)
  const brutBase4h = romania_enviroment.brut_salary * 0.5;

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

  const difficultyMultiplier = difficultyMap[difficulty] ?? 1.0;
  const experienceMultiplier = experienceMap[experience] ?? 1.0;
  const techBonus = 1 + technologies.length * 0.05; // +5% per tech

  const brutFinal =
    brutBase4h * difficultyMultiplier * experienceMultiplier * techBonus;

  // Taxes
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
