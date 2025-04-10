
import React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-gray-400 mt-1">{description}</p>}
    </div>
  );
};

export default PageHeader;
