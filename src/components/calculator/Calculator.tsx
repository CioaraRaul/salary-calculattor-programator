import React from "react";
import type { User } from "../../models/User";
import "./Calculator.css";
import { useLocation } from "react-router-dom";
import CalculateSalary from "./CalculateSalary";
import { calculateSalary6h } from "./CalculateSalary6";
import { calculateSalary4h } from "./CalculateSalary4";

const Calculator: React.FC<User> = () => {
  const location = useLocation();

  const { difficulty, technologies, year_of_experience } =
    (location.state as User) || {};

  const result = CalculateSalary(difficulty, technologies, year_of_experience);
  const result6 = calculateSalary6h(
    difficulty,
    technologies,
    year_of_experience
  );
  const result4 = calculateSalary4h(
    difficulty,
    technologies,
    year_of_experience
  );

  return (
    <div className="bg-calculator">
      <h1>The options selected by you: </h1>
      <p>Difficulty: {difficulty}</p>
      <p>Technologies: {technologies?.join(", ")}</p>
      <p>Years of Experience: {year_of_experience}</p>
      <div>
        <div className="salary-8">
          <h2>Salary Calculator Result</h2>
          <p>Gross Salary: {result.brut} RON</p>
          <p>Net Salary: {result.net} RON</p>
          <p>CAS: {result.CAS} RON</p>
          <p>CASS: {result.CASS} RON</p>
          <p>Income Tax: {result.Impozit} RON</p>
        </div>
        <div className="salary-6">
          <h2>Salary Estimated for 6 hours/day</h2>
          <p>Gross Salary: {result6.brut.toFixed(2)} RON</p>
          <p>Net Salary: {result6.net.toFixed(2)} RON</p>
          <p>CAS: {result6.CAS.toFixed(2)} RON</p>
          <p>CASS: {result6.CASS.toFixed(2)} RON</p>
          <p>Income Tax: {result6.impozit.toFixed(2)} RON</p>
        </div>

        <div className="salary-4">
          <h2>Salary Estimated for 4 hours/day</h2>
          <p>Gross Salary: {result4.brut.toFixed(2)} RON</p>
          <p>Net Salary: {result4.net.toFixed(2)} RON</p>
          <p>CAS: {result4.CAS.toFixed(2)} RON</p>
          <p>CASS: {result4.CASS.toFixed(2)} RON</p>
          <p>Income Tax: {result4.impozit.toFixed(2)} RON</p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
