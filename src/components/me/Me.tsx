import React, { useState } from "react";
import "./Me.css"; // ← Import the CSS file
import { useNavigate } from "react-router-dom";

const availableTechnologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Angular",
  "Vue",
];

export default function Me() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");

  const navigate = useNavigate();

  const toggleTech = (technologie: string) => {
    if (selectedTech.includes(technologie)) {
      setSelectedTech(selectedTech.filter((tech) => tech !== technologie));
    } else {
      setSelectedTech([...selectedTech, technologie]);
    }
  };

  const toggleExperince = (exp: string) => {
    setSelectedExperience(exp);
  };

  const toggleDifficulty = (dif: string) => {
    setSelectedDifficulty(dif);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/calculator", {
      state: {
        difficulty: selectedDifficulty,
        technologies: selectedTech,
        year_of_experience: selectedExperience,
      },
    });
  };

  return (
    <div className="container-windows">
      <div className="container">
        <h1>Salary Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="difficulty">
              Difficulty of projects you are willing to take
            </label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={(e) => toggleDifficulty(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="extreme">Extreme</option>
            </select>
            <div className="result">
              {selectedDifficulty ? (
                <h3>Selected option by you is: {selectedDifficulty}</h3>
              ) : (
                <h3>You have to select an option</h3>
              )}
            </div>
          </div>

          <div>
            <h3>Select your technologies</h3>
            <div className="tech-buttons">
              {availableTechnologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={selectedTech.includes(tech) ? "selected" : ""}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="result">
              <h3>You selected:</h3>
              <p>{selectedTech.join(", ") || "None selected"}</p>
            </div>
          </div>

          <div>
            <label htmlFor="experience">Years of experience</label>
            <select
              name="experience"
              id="experience"
              required
              onChange={(e) => toggleExperince(e.target.value)}
            >
              <option value="" disabled selected>
                Select experience level
              </option>
              <option value="junior">Junior (0-1 years)</option>
              <option value="mid">Mid-level (1-3 years)</option>
              <option value="senior">Senior (3-5 years)</option>
              <option value="expert">Expert (5-10 years)</option>
              <option value="master">Master (10+ years)</option>
            </select>
            <div className="result">
              {selectedExperience ? (
                <h3>Selected option by you is: {selectedExperience}</h3>
              ) : (
                <h3>You have to select an option</h3>
              )}
            </div>
          </div>
          <div className="button-submit-div">
            <button className="button-submit-styling" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
