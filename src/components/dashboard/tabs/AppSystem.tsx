import React from "react";
import { Section, Info } from "./ui";

export const AppSystem: React.FC = () => {
  return (
    <Section title="System Info">
      <Info label="Last Login" value="—" />
      <Info label="Device" value="—" />
      <Info label="IP Address" value="—" />
    </Section>
  );
};