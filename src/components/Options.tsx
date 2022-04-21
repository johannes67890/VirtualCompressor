import { useState } from "react";
import Button from "./Button";

const Options: React.FC<{
  file: Blob[];
  compressed: File | undefined;
  options: Compressor.Options;
  setOptions: React.Dispatch<React.SetStateAction<Compressor.Options>>;
}> = ({ file, compressed, options, setOptions }) => {
  console.log(file[0]?.size, compressed?.size);

  return (
    <div className="max-w-5xl mx-auto flex mt-5 gap-6">
      <MainContentTemplate title="Settings">
        <SettingsTemplate setOptions={setOptions} options={options} />
      </MainContentTemplate>

      <MainContentTemplate title="Preview">
        {compressed !== undefined ? (
          <div>
            <img
              className="max-w-md max-h-[24rem] p-3"
              id="preview"
              src={getImgURL(file)}
              alt=""
            />
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
  // const value: Object[] = Object.keys(options).map((key) => {
  //   return { text: key, val: key };
  // });
  // console.log(value);
  for (const i in options) {
    console.log(i);
  }

  return (
    <div>
      <ul>{}</ul>
    </div>
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
