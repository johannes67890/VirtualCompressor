import Compressor from "compressorjs";
import React, { useState } from "react";
import { SettingsTemplate } from "./Settings";
import { PhotographIcon } from "@heroicons/react/solid";
import Button from "./Button";
const Options: React.FC<{
  file: Blob[];
  compressed: File | undefined;
  options: Compressor.Options;
  setOptions: React.Dispatch<React.SetStateAction<Compressor.Options>>;
}> = ({ file, compressed, setOptions }) => {
  return (
    <div className="max-w-5xl mx-auto flex m-5 gap-6">
      <MainContentTemplate title="Settings" size="20rem">
        <SettingsTemplate setOptions={setOptions} />
      </MainContentTemplate>

      <MainContentTemplate title="Preview" size="40rem">
        {compressed !== undefined ? (
          <div>
            <div className="flex my-1.5 border-b border-gray-300 border-dotted">
              <div className="w-[25rem] mx-auto">
                <span className="font-bold text-lg">Original Image</span>
                <img
                  className="max-w-full p-3"
                  id="preview"
                  src={getImgURL(file)}
                  alt=""
                />
                <PreviewInfo
                  name={compressed.name}
                  size={file[0].size}
                  type={file[0].type}
                  file={file}
                />
              </div>
            </div>
            <div className="flex my-1.5">
              <div className="w-[25rem] mx-auto">
                <span className="font-bold text-lg">Compressed Image</span>
                <img
                  className="max-w-full p-3"
                  id="preview"
                  src={getImgURL(file)}
                  alt=""
                />
                <PreviewInfo
                  name={compressed.name}
                  size={compressed.size}
                  sizeDiff={((compressed.size / file[0].size) * 100).toFixed(2)}
                  type={compressed.type}
                  file={compressed}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex border-dashed border-2 rounded-md border-gray-400 h-80 m-6">
            <PhotographIcon
              width={"5rem"}
              className={"m-auto block fill-gray-500 "}
            />
          </div>
        )}
      </MainContentTemplate>
    </div>
  );
};

function getImgURL(file: File | Blob | Blob[]) {
  let Url = "";

  if (Array.isArray(file)) {
    Url = URL.createObjectURL(new File([file[0]], "Compressed array Image"));
  } else {
    Url = URL.createObjectURL(new File([file], "Compressed Image"));
  }
  return Url;
}

const PreviewInfo: React.FC<{
  name: string;
  size: number;
  sizeDiff?: string;
  type: string;
  file: Blob[] | File;
}> = ({ name, size, sizeDiff, type, file }) => {
  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div className="p-3 text-base">
      <ul className="grid grid-rows-3">
        <li>
          <span className="font-bold">Image name: </span>
          {name}
        </li>
        <li>
          <span className="font-bold">Image size: </span>
          {formatBytes(size)}{" "}
          {sizeDiff != undefined ? <span>({sizeDiff}%)</span> : null}
        </li>
        <li>
          <span className="font-bold">Image type: </span>
          {type}
        </li>

        <li className="mx-auto my-2">
          <Button
            onClick={() => {
              const URL = getImgURL(file); // download file

              fetch(URL).then((res) => {
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = res.url;
                a.download = `${name}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(res.url);
              });
            }}
          >
            Download
          </Button>
        </li>
      </ul>
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
      className={`max-w-5xl min-w-[${size}] overflow-hidden top-1/4 sticky h-[0%] flex-auto flex-col bg-gray-100 rounded-lg border border-gray-300`}
    >
      <div className="bg-gray-300 rounded-t-lg p-2">
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Options;
