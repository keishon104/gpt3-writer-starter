import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

// Components
import Tabs from "../components/Tabs";
import Results from "../components/Results";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

// Assets
import logoImage from "../assets/captionlyLogo.png";

// Utils Functions
import generateCaption from "../utils/generateCaption";

export default function Home() {
  const [apiOutput, setApiOutput] = useState("");
  const [apiChildOutput, setApiChildOutput] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageDescriptionText, setImageDescriptonText] = useState("");

  const callReGenerateEndpoint = async () => {
    setIsGenerating(true);
    generateCaption(promptInput).then((result) => setApiChildOutput(result));
    // setApiChildOutput(data);
    setIsGenerating(false);
  };

  const apiOutputCallback = (value) => {
    setApiChildOutput(value);
  };

  const promptInputCallback = (value) => {
    console.log("Value from input text: ", value);
    setPromptInput(value);
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
    callReGenerateEndpoint();
  };

  const imageUploadUrl = (value) => {
    setImageURL(value);
  };

  const imageUploadCaptionGenerate = async (imageDescription) => {
    // console.log("Description of image recieved from child: ", imageDescription);
    setImageDescriptonText(imageDescription);

    // setIsGenerating(true);
    generateCaption(imageDescription).then((result) =>
      setApiChildOutput(result)
    );
    // setIsGenerating(false);
  };
  return (
    <div className="bg-white">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/faviconC.ico" />
        <title>Instagram Caption Generator</title>
      </Head>
      <main>
        {/* Hero section */}
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <Image
                  src={logoImage}
                  width="200"
                  height="auto"
                  alt="Captionly"
                />
              </div>
              <div className="mt-10 text-center sm:text-left">
                <div>
                  <div className="inline-flex space-x-4">
                    {/* <span className="rounded bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-500">
                      What's new
                    </span> */}
                    <span className="inline-flex items-center space-x-1 text-sm font-medium text-indigo-600">
                      <a href="https://github.com/keishon104/gpt3-writer-starter/commits/main">
                        Version 0.3.0
                      </a>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
                    Instagram Caption Generator
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Transform your Instagram posts with our AI-powered caption
                    generator. Get more engagement and drive more traffic to
                    your profile with captions that resonate with your audience.
                  </p>
                  <p className="mt-6 text-xl text-gray-500">
                    Give me a Instagram caption inspired by _______________.
                  </p>
                </div>
                <div className="mt-20">
                  <Tabs
                    onTextArea={apiOutputCallback} // Output fom OpenAI call.
                    promptText={promptInputCallback} // Text entered into TextArea component
                    imageUrl={imageUploadUrl} //Url returned from image upload.
                    imageAltText={imageUploadCaptionGenerate} //Image to text alt text
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                />
              </svg>
            </div>
            <div className="relative pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
              {apiChildOutput ? (
                <Results
                  apiOutput={apiChildOutput}
                  promptInput={promptInput}
                  imageURL={imageURL}
                  imageDescription={imageDescriptionText}
                />
              ) : (
                <div className="">
                  <Carousel />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
}
