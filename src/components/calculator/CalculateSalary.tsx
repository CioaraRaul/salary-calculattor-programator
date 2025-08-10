import React from "react";
import { romania_enviroment } from "../../api/salary.ts";

function CalculateSalary(
  difficulty: string,
  technologies: string[],
  experience: string
) {
  let { brut_salary, CAS, CASS, impozit_pe_venit } = romania_enviroment;

  const difficultyMap: Record<string, number> = {
    low: 1.0,
    medium: 1.2,
    hard: 1.5,
    extreme: 2.0,
  };

  // Experience multiplier
  const experienceMap: Record<string, number> = {
    junior: 1.0,
    mid: 1.2,
    senior: 1.5,
    expert: 2.0,
    master: 2.5,
  };

  const diffMultiplier = difficultyMap[difficulty] || 1;
  const expMultiplier = experienceMap[experience] || 1;
  const techMultiplier = 1 + technologies.length * 0.05; // +5% per tech

  // Adjust gross salary
  const adjustedBrut =
    brut_salary * diffMultiplier * expMultiplier * techMultiplier;

  // Calculate deductions
  const casAmount = (adjustedBrut * CAS) / 100;
  const cassAmount = (adjustedBrut * CASS) / 100;
  const incomeTax = (adjustedBrut * impozit_pe_venit) / 100;

  const netSalary = adjustedBrut - casAmount - cassAmount - incomeTax;

  return {
    brut: adjustedBrut.toFixed(2),
    net: netSalary.toFixed(2),
    CAS: casAmount.toFixed(2),
    CASS: cassAmount.toFixed(2),
    Impozit: incomeTax.toFixed(2),
  };
}

export default CalculateSalary;
