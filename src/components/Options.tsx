import { useState } from "react";
import Button from "./Button";

const Options: React.FC<{
  file: Blob[];
  compressed: File | undefined;
  options: Compressor.Options;
  setOptions: React.Dispatch<React.SetStateAction<Compressor.Options>>;
}> = ({ file, compressed, options, setOptions }) => {
  return (
    <div className="max-w-5xl mx-auto flex mt-5 gap-6">
      <MainContentTemplate title="Settings">
        <SettingsTemplate setOptions={setOptions} options={options} />
      </MainContentTemplate>

      <MainContentTemplate title="Preview">
        {compressed !== undefined ? (
          <div>
            <div className="flex">
              <img
                className="max-w-md max-h-[24rem] p-3"
                id="preview"
                src={getImgURL(file)}
                alt=""
              />
              <PreviewInfo
                name={compressed.name}
                size={file[0].size}
                type={file[0].type}
                URL={getImgURL(compressed)}
              />
            </div>
            <div className="flex">
              <img
                className="max-w-md max-h-[24rem] p-3"
                id="preview"
                src={getImgURL(compressed)}
                alt=""
              />
              <PreviewInfo
                name={compressed.name}
                size={compressed.size}
                type={compressed.type}
                URL={getImgURL(compressed)}
              />
            </div>
            <Button onClick={() => setOptions({ quality: 0.8 })}>
              options
            </Button>
          </div>
        ) : null}
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
  type: string;
  URL: string;
}> = ({ name, size, type, URL }) => {
  return (
    <div className="p-3 text-lg">
      <ul className="grid grid-rows-3">
        <li className="gro">
          <span className="font-bold">Image name: </span>
          {name}
        </li>
        <li>
          <span className="font-bold">Image size: </span>
          {size}
        </li>
        <li>
          <span className="font-bold">Image type: </span>
          {type}
        </li>
      </ul>
    </div>
  );
};

const SettingsTemplate: React.FC<{
  setOptions: React.Dispatch<React.SetStateAction<Compressor.Options>>;
  options: Compressor.Options;
}> = ({ setOptions, options }) => {
  const defaultSettings = {
    strict: true,
    checkOrientation: true,
    maxHeight: Infinity,
    maxWidth: Infinity,
    minHeight: Infinity,
    minWidth: Infinity,
    width: undefined,
    height: undefined,
    resize: "none",
    quality: 0.8,
    mimeType: "auto",
    convertTypes: ["image/png"],
    convertSize: 5000000,
  } as Compressor.Options;
  return (
    <div>
      <ul className="flex flex-row gap-1"></ul>
      <Button
        classes="bg-gray-400"
        onClick={() => {
          setOptions(defaultSettings);
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          setOptions({ ...options });
        }}
      >
        Apply
      </Button>
    </div>
  );
};

const InputTemplate: React.FC<{
  title: string;
  placeholder: string;
  options: Compressor.Options;
  setting: Compressor.Options;
  type: string;
  min?: number;
  max?: number;
  step?: number;
}> = ({ title, placeholder, options, setting, type, min, max, step }) => {
  setting as Compressor.Options;
  return (
    <li className="min-w-[15rem] mx-auto">
      <div className="flex gap-1">
        <span className="font-bold">{title}</span>
        <input
          className="min-w-[9.5rem] rounded-md px-2.5 bg-gray-200"
          type={type}
          step={step}
          placeholder={placeholder}
          min={min}
          max={max}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //options.setting = parseFloat(e.target.value);
          }}
        />
      </div>
    </li>
  );
};

const MainContentTemplate: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <div
      className={`max-w-2xl flex-auto flex-col bg-gray-100 rounded-lg border border-gray-300`}
    >
      <div className="bg-gray-300 rounded-t-lg p-2">
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Options;
