import { useState } from "react";
import generateCaption from "../utils/generateCaption";
import Image from "next/image";

const Results = ({ apiOutput, promptInput, imageURL }) => {
  // State for API output:
  const [results, setResults] = useState(apiOutput);
  const src = imageURL;

  // Return new caption after feedback.
  const callGenerateEndpoint = async () => {
    generateCaption(promptInput).then((result) => setResults(result));
  };

  const positiveFeedback = async (prompt, result) => {
    console.log("Thank you for your feedback");
    const formattedData = {
      prompt: `Give me a one of a kind Instagram caption inspired by ${prompt}`,
      completion: result,
    };
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });
    callGenerateEndpoint();
  };
  return (
    <div>
      <div className="output text-center">
        <div className="output-header-container sm:mt-64">
          <div className="output-header">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              {imageURL ? (
                <div>
                  <Image
                    loader={() => src}
                    src={imageURL}
                    alt="Alternate caption"
                    height={400}
                    width={200}
                    className="mx-auto"
                  />
                </div>
              ) : (
                <div>Output</div>
              )}
            </h3>
          </div>
        </div>
        <div className="output-content w-[350px] mx-auto">
          <p className="w-[350px] text-lg mt-5">{results}</p>
        </div>
        {/* AI Feedback Loop */}
        <span className="isolate inline-flex rounded-md shadow-sm mt-5">
          <button
            type="button"
            onClick={callGenerateEndpoint}
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <span className="sr-only">Negative</span>
            <span className="text-5xl">💩</span>
          </button>
          <button
            type="button"
            onClick={callGenerateEndpoint}
            className="relative -ml-px inline-flex items-center  border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <span className="sr-only">Neutral</span>
            <span className="text-5xl">😐</span>
          </button>
          <button
            type="button"
            onClick={() => positiveFeedback(promptInput, apiOutput)}
            className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <span className="sr-only">Positive</span>
            <span className="text-5xl">🔥</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Results;
