import React, { useEffect, useState } from "react";
import { router, Link } from "@inertiajs/react";
import diagnosisData from "./diagnosisData.json";

import { usePage } from "@inertiajs/react";

export default function ResultsPage() {
    const { props } = usePage() as {
        props: { formData: any; diagnosis: { prediction: string; confidence?: number } }
    };

    const { formData, diagnosis } = props;
    if (!formData || !diagnosis) {
        return <div>No diagnosis data available.</div>;
    }

    const {
        ageRange = "N/A",
        weight = "N/A",
        mainSymptom = [],
        priorIllnesses = []
    } = formData;

    return (
        <div className="flex min-h-screen bg-blue-50 dark:bg-gray-900">
            <div className="flex-1 p-6 sm:p-10">
                <header className="flex justify-between items-center mb-8">
                    <img src={"/assets/logo.jpg"} alt="PiKrous Logo" className="h-12" />
                    <button
                        onClick={() => router.get("/symptom-form")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Start Over
                    </button>
                </header>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-10 shadow space-y-6">
                    <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-300 text-center">
                        Diagnosis Summary
                    </h1>

                    <div>
                        <h2 className="font-semibold">Age Range:</h2>
                        <p>{ageRange}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Weight:</h2>
                        <p>{weight} kg</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Selected Symptoms:</h2>
                        <ul className="list-disc list-inside">
                            {mainSymptom.map((s: string, idx: number) => (
                                <li key={idx}>{s}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold">Past Illnesses:</h2>
                        {priorIllnesses.length ? (
                            <ul className="list-disc list-inside">
                                {priorIllnesses.map((ill: string, idx: number) => (
                                    <li key={idx}>{ill}</li>
                                ))}
                            </ul>
                        ) : <p>None</p>}
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md">
                        <p>
                            Based on your symptoms, you may be experiencing{" "}
                            <strong>{diagnosis.prediction}</strong>.<br />
                            Confidence: {diagnosis.confidence ? `${(diagnosis.confidence * 100).toFixed(0)}%` : "N/A"}<br />
                            <em>This is not a medical diagnosis. Always consult a licensed healthcare provider.</em>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
