import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { UploadIcon, XIcon } from "@heroicons/react/outline";
import Compressor from "compressorjs";

const Fileinput: React.FC<{
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCompressedPreview: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}> = ({ setPreview, setCompressedPreview }) => {
  const [file, setFile] = useState<any>();
  const [Compressed, setCompressed] = useState<any>();

  const x = new Compressor(file, {
    quality: 0.1,
    // The compression process is asynchronous,
    // which means you have to access the `result` in the `success` hook function.
    success(result) {
      setCompressed(result);
    },
    error(err) {
      console.log(err.message);
    },
  });

  useEffect(() => {
    // create the preview
    const OriginalObjectUrl = URL.createObjectURL(new Blob(file));
    const CompressedObjectUrl = URL.createObjectURL(new Blob(Compressed.file));
    setPreview(OriginalObjectUrl);
    setCompressedPreview(CompressedObjectUrl);

    console.log(Compressed.file);
    console.log(file);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(OriginalObjectUrl);
  }, [file]);

  return (
    <>
      {file !== undefined ? (
        <section className="bg-gray-400">
          <div className="max-w-5xl h-32 p-3 mx-auto">
            <div
              className="border-2 border-dashed border-gray-100 h-full rounded-lg cursor-pointer"
              onClick={() => setFile(undefined)}
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
          onDrop={(acceptedFiles) => setFile(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="bg-secondary-200">
              <div {...getRootProps()} className="max-w-5xl h-32 p-3 mx-auto">
                <div className="border-2 border-dashed border-secondary-100 h-full rounded-lg">
                  <input
                    {...getInputProps()}
                    onChange={(e: any) => setFile(e)}
                  />
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
