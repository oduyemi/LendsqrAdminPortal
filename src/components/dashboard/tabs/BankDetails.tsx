import React from "react";
import type { User } from "../../../features/users/api/mock/users";
import { Section, Info } from "./ui";

export const BankDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Section title="Bank Information">
      <Info label="Bank Name" value="Providus Bank" />
      <Info label="Account Number" value={user.phone} />
      <Info label="Account Name" value={user.username} />
    </Section>
  );
};