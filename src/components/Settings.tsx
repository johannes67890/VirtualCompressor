import React from "react";
import { useState } from "react";
import Button from "./Button";

export const SettingsTemplate: React.FC<{
  setOptions: React.Dispatch<React.SetStateAction<Compressor.Options>>;
}> = ({ setOptions }) => {
  const defaultSettings = {
    maxWidth: Infinity,
    minWidth: 0,
    maxHeight: Infinity,
    minHeight: 0,
    width: undefined,
    height: undefined,
    resize: "none",
    quality: 0.8,
    mimeType: "auto",
    convertTypes: ["image/png"],
    convertSize: 5000000,
  } as Compressor.Options;
  const [settings, setSettings] = useState({ ...defaultSettings });

  return (
    <div className="flex flex-col gap-3 my-4">
      <ul className="flex flex-col gap-4">
        <InputTemplate
          title="Max Width"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"maxWidth"}
          placeholder="Default 'Infinity'"
          min={0}
          max={Infinity}
          step={1000}
          defaultVal={Infinity}
        />
        <InputTemplate
          title="Max Height"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"maxHeight"}
          placeholder="Default 'Infinity'"
          min={0}
          max={Infinity}
          step={1000}
          defaultVal={Infinity}
        />
        <InputTemplate
          title="Min Width"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"minWidth"}
          placeholder="Default '0'"
          min={Infinity}
          max={0}
          step={1000}
          defaultVal={0}
        />
        <InputTemplate
          title="Min Height"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"minHeight"}
          placeholder="Default '0'"
          min={Infinity}
          max={0}
          step={1000}
          defaultVal={0}
        />
        <InputTemplate
          title="Width"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"width"}
          placeholder="Default '0'"
          min={0}
          max={Infinity}
          step={1000}
          defaultVal={undefined}
        />
        <InputTemplate
          title="Height"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"height"}
          placeholder="Default '0'"
          min={0}
          max={Infinity}
          step={1000}
          defaultVal={undefined}
        />
        <InputTemplate
          title="Quality"
          type="number"
          setState={setSettings}
          currState={settings}
          setting={"quality"}
          placeholder="Default '1'"
          min={0.1}
          max={1}
          step={0.1}
          defaultVal={0.8}
        />
        <InputTemplate
          title="Convert Size"
          type="number"
          currState={settings}
          setState={setSettings}
          setting={"convertSize"}
          placeholder="Default '5000000'"
          min={0}
          max={5000000}
          step={1000}
          defaultVal={5000000}
        />
      </ul>
      <div className="flex mx-auto gap-2">
        <Button
          classes="bg-gray-400"
          onClick={() => {
            setOptions(defaultSettings);
          }}
        >
          Set default
        </Button>
        <Button
          onClick={() => {
            setOptions(settings);
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

const InputTemplate: React.FC<{
  setState: React.Dispatch<React.SetStateAction<Compressor.Options>>;
  currState: Compressor.Options;
  setting: any;
  title: string;
  placeholder: string;
  defaultVal?: number | string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
}> = ({
  setState,
  currState,
  setting,
  title,
  placeholder,
  defaultVal,
  type,
  min,
  max,
  step,
}) => {
  return (
    <li className="max-w-[20rem] min-w-[17rem] mx-auto">
      <div className="flex gap-2 ">
        <span className="min-w-[6rem] font-bold ">{title}</span>
        <input
          className="max-w-[10rem] min-w-[10rem] rounded-sm px-2.5 bg-gray-200"
          type={type}
          step={step}
          placeholder={placeholder}
          defaultValue={defaultVal}
          min={min}
          max={max}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const obj: { [k: string]: any } = {};
            let value: any = undefined;
            switch (e.target.type) {
              case "number":
                value = parseFloat(e.target.value);
                break;
              case "text":
                value = e.target.value;
                break;
              case "boolean":
                value = e.target.value;
                break;
            }
            obj[setting] = value;
            const ObjConcat = Object.assign(currState, obj);

            setState(ObjConcat as Compressor.Options);
          }}
        />
      </div>
    </li>
  );
};
