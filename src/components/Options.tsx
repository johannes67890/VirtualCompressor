import { useEffect, useState } from "react";
import Button from "./Button";
import Compressor from "compressorjs";
const Options: React.FC<{
  file: Blob[];
  compressed: File | undefined;
  options: Compressor.Options;
  setOptions: React.Dispatch<React.SetStateAction<Compressor.Options>>;
}> = ({ file, compressed, setOptions }) => {
  return (
    <div className="max-w-5xl mx-auto flex mt-5 gap-6">
      <MainContentTemplate title="Settings">
        <SettingsTemplate setOptions={setOptions} />
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
}> = ({ setOptions }) => {
  const reset = {
    quality: 0.4,
  } as Compressor.Options;
  const [settings, setSettings] = useState({ ...reset });

  return (
    <div>
      <ul className="flex flex-col gap-1">
        <InputTemplate
          title="Quality"
          setState={setSettings}
          setting={"quality"}
          placeholder="Default Value '1'"
          min={0.1}
          max={1}
          step={0.1}
        />
      </ul>
      <Button
        classes="bg-gray-400"
        onClick={() => {
          setOptions(reset);
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          setOptions(settings);
        }}
      >
        Apply
      </Button>
    </div>
  );
};

const InputTemplate: React.FC<{
  setState: React.Dispatch<React.SetStateAction<Compressor.Options>>;
  setting: any;
  title: string;
  placeholder: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
}> = ({ setState, setting, title, placeholder, type, min, max, step }) => {
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
            const value = parseFloat(e.target.value);
            const obj: { [k: string]: any } = {};
            obj[setting] = value;
            setState(obj as Compressor.Options);
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
