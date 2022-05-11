import { useEffect } from "react";
import Dropzone from "react-dropzone";
import { UploadIcon, XIcon } from "@heroicons/react/outline";
import Compressor from "compressorjs";

const Fileinput: React.FC<{
  file: File[];
  options: Compressor.Options;
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
  setCompressed: React.Dispatch<React.SetStateAction<File | undefined>>;
}> = ({ file, options, setFile, setCompressed }) => {
  useEffect(() => {
    if (file.length !== 0) {
      new Compressor(file[0], {
        ...options,

        success: (result: File) => {
          // compressedResult has the compressed file.
          setCompressed(result);
        },
        error(err) {
          // error handeling
          console.log(err.message);
        },
      });
    }
  }, [options, file]);

  return (
    <>
      {file.length !== 0 ? (
        <section className="bg-gray-400 hover:transition-all z-10 duration-200 ease-in -top-12 sticky hover:top-0">
          <div className="max-w-5xl h-32 p-3 mx-auto">
            <div
              className="border-2 border-dashed border-gray-100 h-full rounded-lg cursor-pointer"
              onClick={() => {
                setFile([]);
                setCompressed(undefined);
              }}
            >
              <div className="text-white text-center h-full py-4">
                <XIcon className="w-10 h-10 mx-auto" />

                <span className="inline-block align-middle">
                  File uploaded, Click to remove current image
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Dropzone
          accept={"image/jpeg,image/png"}
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="bg-secondary-200">
              <div {...getRootProps()} className="max-w-5xl h-32 p-3 mx-auto">
                <div className="border-2 border-dashed border-secondary-100 h-full rounded-lg">
                  <input {...getInputProps()} />
                  <div className="text-white text-center h-full py-4">
                    <UploadIcon className="w-10 h-10 mx-auto" />
                    <span className="inline-block align-middle">
                      Drag 'n' drop some files here, or click to select file
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </>
  );
};

export default Fileinput;
