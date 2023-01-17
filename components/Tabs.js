import React, { useCallback, useState } from "react";
import Head from "next/head";
import UploadWidget from "./UploadWidget";
import generateCaption from "../utils/generateCaption";

const Tabs = ({ onTextArea, promptText, imageUrl, imageAltText }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [userInputText, setUserInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  //   Handles textfield data changes
  const onUserChangedText = (event) => {
    setUserInputText(event.target.value);
  };

  const callImageUpload = async (value) => {
    console.log("Image link from upload child component:", value);

    // Call API Route with Cloudinary secure_url
    const response = await fetch("/api/imageUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });

    const data = await response.json();
    const { output } = data;
    imageUrl(value);
    imageAltText(data);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    generateCaption(userInputText).then((result) => onTextArea(result));
    setIsGenerating(false);
    promptText(userInputText);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <Head></Head>
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-black-500 bg-indigo-500 hover:bg-indigo-600"
                    : "text-black-300 bg-indigo-300 hover:bg-indigo-600")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#text"
                role="tablist"
              >
                Text to Caption
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-black-500 bg-indigo-500 hover:bg-indigo-600"
                    : "text-black-300 bg-indigo-300 hover:bg-indigo-600")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#image"
                role="tablist"
              >
                Image to Caption
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="text">
                  <form
                    action="#"
                    className="mt-12 sm:flex sm:w-full sm:max-w-lg"
                  >
                    <div className="min-w-0 flex-1">
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        value={userInputText}
                        placeholder="Drake. Gandhi. Barack Obama. Elon Musk."
                        className="prompt-box block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-200 text-indigo-600 "
                        onChange={onUserChangedText}
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <div className="prompt-buttons">
                        <div className="flex-1">
                          {isGenerating ? (
                            <span className="bg-indigo-500 animate-spin">
                              <svg
                                className="animate-spin h-5 w-5 mr-3 ..."
                                viewBox="0 0 24 24"
                              >
                                Test
                              </svg>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                callGenerateEndpoint();
                                // onTextArea("Apple Sauce Data");
                              }}
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Generate
                            </button>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="image">
                  {/* <p>Coming Soon</p> */}
                  <UploadWidget imageUploadLink={callImageUpload} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
