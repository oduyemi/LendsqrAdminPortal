import React from "react";
import type { User } from "../../../features/users/api/mock/users";
import { Section, Info } from "./ui";

export const GeneralDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <Section title="Personal Information">
        <Info label="Full Name" value={user.username} />
        <Info label="Phone Number" value={user.phone} />
        <Info label="Email Address" value={user.email} />
        <Info label="BVN" value="—" />
        <Info label="Gender" value="—" />
        <Info label="Marital Status" value="—" />
        <Info label="Children" value="—" />
        <Info label="Type of Residence" value="—" />
      </Section>

      <Section title="Education and Employment">
        <Info label="Level of Education" value="—" />
        <Info label="Employment Status" value="—" />
        <Info label="Sector" value={user.organization} />
        <Info label="Duration" value="—" />
        <Info label="Office Email" value={user.email} />
        <Info label="Monthly Income" value="—" />
        <Info label="Loan Repayment" value="—" />
      </Section>

      <Section title="Socials">
        <Info label="Twitter" value="—" />
        <Info label="Facebook" value={user.username} />
        <Info label="Instagram" value="—" />
      </Section>

      <Section title="Guarantor">
        <Info label="Full Name" value="—" />
        <Info label="Phone Number" value="—" />
        <Info label="Email Address" value="—" />
        <Info label="Relationship" value="—" />
      </Section>
    </>
  );
};