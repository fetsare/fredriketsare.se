"use client";
import React from "react";
import FadeInSection from "./FadeInSection";

const DontPressMe: React.FC = () => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div className="mt-6">
      {!pressed ? (
        <FadeInSection direction="up" delay={100}>
          <button
            type="button"
            onClick={() => setPressed(true)}
            className="px-4 py-2 text-md rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            dont press me
          </button>
        </FadeInSection>
      ) : (
        <FadeInSection direction="up">
          <div className="mt-4 text-xl leading-relaxed text-gray-800 dark:text-gray-200">
            <p>Nothing happened</p>
            <p>You just clicked a button</p>
            <p>
              Your curiosity is admirable. Come back tomorrow, Maybe it will do
              something
            </p>
          </div>
        </FadeInSection>
      )}
    </div>
  );
};

export default DontPressMe;
