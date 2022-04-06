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
  const [CompressedFile, setCompressedFile] = useState<any>();

  const handleCompressedUpload = (e: any) => {
    const image = e.target.files[0];
    console.log(image);

    new Compressor(image, {
      quality: 0.1, // 0.6 can also be used, but its not recommended to go below.
      strict: false,
      convertSize: 20000,
      success: (result: any) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        const CompressedObjectUrl = URL.createObjectURL(
          new File([result], "Compressed Image")
        );
        setCompressedPreview(CompressedObjectUrl);
        console.log(result, "done");
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  useEffect(() => {
    // create the preview
    const OriginalObjectUrl = URL.createObjectURL(new Blob(file));
    setPreview(OriginalObjectUrl);
    //setCompressedPreview(CompressedFile);
    console.log(file, CompressedFile);

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
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles);
            handleCompressedUpload(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="bg-secondary-200">
              <div {...getRootProps()} className="max-w-5xl h-32 p-3 mx-auto">
                <div className="border-2 border-dashed border-secondary-100 h-full rounded-lg">
                  <input
                    {...getInputProps()}
                    // onChange={(e: any) => handleCompressedUpload(e)}
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

/// Sandbox vanilla JS working eksample
/*

import React, { useState, useEffect } from "react";
import Compressor from "compressorjs";

const Upload = () => {
  const [compressedFile, setCompressedFile] = useState();

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.1, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        const CompressedObjectUrl = URL.createObjectURL(
          new File([compressedResult], "test")
        );
        setCompressedFile(CompressedObjectUrl);
        console.log(compressedFile, "test");
      },
      error(err) {
        console.log(err.message);
      }
    });
  };

  return (
    <div>
      <input
        accept="image/*,capture=camera"
        capture="”camera"
        type="file"
        onChange={(event) => handleCompressedUpload(event)}
      />

      <img id="preview" src={compressedFile} alt="" />
    </div>
  );
};

export default Upload;


*/
