import Button from "./Button";

const Options: React.FC<{
  file: Blob[];
  compressed: File | undefined;
}> = ({ file, compressed }) => {
  return (
    <div className="max-w-5xl mx-auto flex mt-5 gap-6">
      <MainContentTemplate title="Settings" size="xs">
        <div>test</div>
      </MainContentTemplate>

      <MainContentTemplate title="Preview" size="2xl">
        {compressed !== undefined ? (
          <div>
            <img
              className="max-w-md max-h-[24rem] p-3"
              id="preview"
              src={getImgURL(file)}
              alt=""
            />
            <div className="flex ">
              <img
                className="max-w-md max-h-[24rem] p-3"
                id="preview"
                src={getImgURL(compressed)}
                alt=""
              />
              <ul>
                <li>
                  <span>size: </span>
                </li>
              </ul>
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

const MainContentTemplate: React.FC<{ title: string; size: string }> = ({
  title,
  size,
  children,
}) => {
  return (
    <div
      className={`max-w-${size} flex-auto flex-col bg-gray-100 rounded-lg border border-gray-300`}
    >
      <div className="bg-gray-300 rounded-t-lg p-2">
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Options;
