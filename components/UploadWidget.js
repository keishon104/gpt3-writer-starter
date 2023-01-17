import { useEffect, useRef, useState } from "react";
import Head from "next/head";

const UploadWidget = ({ imageUploadLink }) => {
  const cloudName = "dgusjlsoo";
  const uploadPreset = "jpoubnxn";

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          let link = result.info.secure_url;
          imageUploadLink(link);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
        myWidget.open();
      },
      false
    );
  }, []);
  return (
    <div>
      <Head>
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <button
        id="upload_widget"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-300 px-4 py-2 text-sm font-medium text-black-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadWidget;
