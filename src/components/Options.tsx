import Compressor from "compressorjs";
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
    <div className="max-w-5xl mx-auto flex mt-5 gap-6">
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
  type: string;
  file: Blob[] | File;
}> = ({ name, size, type, file }) => {
  return (
    <div className="p-3 text-base">
      <ul className="grid grid-rows-3">
        <li>
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
        <li className="mx-auto my-2">
          <Button
            onClick={() => {
              const URL = getImgURL(file);

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
      className={`max-w-5xl min-w-[${size}] flex-auto flex-col bg-gray-100 rounded-lg border border-gray-300`}
    >
      <div className="bg-gray-300 rounded-t-lg p-2">
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Options;
