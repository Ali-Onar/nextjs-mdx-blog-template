import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // Optional: Pass an icon component
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-slate-50">
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
