import { Children } from "react";
import React from "react";
const App = () => {
  return (
    <div className="max-w-5xl mx-auto flex mt-5 gap-6">
      <MainContentTemplate title="Settings" size="xs">
        <div>test</div>
      </MainContentTemplate>

      <MainContentTemplate title="Preview" size="2xl">
        <div>test</div>
      </MainContentTemplate>
    </div>
  );
};

const MainContentTemplate: React.FC<{ title: string; size: string }> = ({
  title,
  size,
  children,
}) => {
  return (
    <div
      className={`max-w-${size} flex-auto flex-col bg-gray-100 rounded-lg border border-gray-300`}
    >
      <div className="bg-gray-300 rounded-t-lg p-2">
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default App;
