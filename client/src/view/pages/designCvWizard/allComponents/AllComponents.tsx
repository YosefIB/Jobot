import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import PersonalInformation from "../personalInformation/PersonalInformation";
import WorkExperience from "../workExperience/WorkExperience";
import ProfessionalSummary from "../professionalSummary/ProfessionalSummary";
import Skills from "../skills/Skills";
import Education from "../education/Education";
import ServiceType from "../serviceType/ServiceType";

const AllComponents = () => {
  const cvForm = useSelector((state: RootState) => state.cvForm); 
  console.log(cvForm)

  const sendCvFormToServer = async () => { // 🔹 פונקציה אסינכרונית תקינה
    try {
      const response = await fetch("http://localhost:3000/api/cv/addCvForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cvForm),
      });

      if (response.ok) {
        alert("קורות החיים נשלחו בהצלחה!");
      } else {
        alert("שגיאה בשליחה");
      }
    } catch (error) {
      console.error("שגיאה:", error);
    }
  };

  return (
    <div>
      <h1>אשף קורות חיים</h1>
      <PersonalInformation />
      <ProfessionalSummary />
      <Education />
      <WorkExperience />
      <ServiceType />
      <Skills />
      <br />
      <button onClick={sendCvFormToServer}>שלח קורות חיים</button>
      <p>{cvForm.personalInformation.userId}</p>
      <p>{cvForm.personalInformation?.firstName}</p>
      <p>{cvForm.personalInformation?.lastName}</p>
      <p>{cvForm.professionalSummary.summary}</p>
      <div>
        {cvForm.skills.map((x, index) => (
          <div key={index}>
            <p>{x.spokenLanguages}</p>
            <p>{x.technicalSkills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComponents;
