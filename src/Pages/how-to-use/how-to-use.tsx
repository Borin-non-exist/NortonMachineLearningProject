import React from "react";
import { useNavigate } from "react-router-dom";

const HowToUsePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 sm:p-10 transition-colors">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="mb-6 flex justify-center">
          <img
            src="/src/assets/logo.jpg"
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-300">
            How to Use PiKrous
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Follow these simple steps to get the most out of your health
            diagnosis app.
          </p>
        </div>

        {/* Step-by-step Guide */}
        <div className="space-y-8">
          {[
            {
              title: "1. Sign Up / Log In",
              desc: "Create an account or log in to access personalized features and track your symptoms securely.",
            },
            {
              title: "2. Navigate to Diagnosis",
              desc: "From the dashboard or homepage, click on 'Diagnose a Disease' to begin the process.",
            },
            {
              title: "3. Answer the Questions",
              desc: "You will be asked a series of questions about your symptoms. Answer them as accurately as possible.",
            },
            {
              title: "4. View Recommendations",
              desc: "PiKrous will give you a likely diagnosis and basic advice. Consult a real doctor for confirmation.",
            },
            {
              title: "5. Explore Advice Section",
              desc: "Use the 'Advice' page to learn more about common diseases and health tips.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-300">
                {step.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Need help? Contact our support team or visit the FAQ page.
        </div>

        {/* 🔙 Back Button at the Bottom */}
        <div className="text-center pt-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 dark:text-blue-300 underline hover:text-blue-800"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToUsePage;
