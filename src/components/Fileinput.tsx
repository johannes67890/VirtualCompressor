import React, { useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { UploadIcon } from "@heroicons/react/outline";
const Fileinput = () => {
  const [file, setFile] = useState<any>();
  const [previewLink, setPreviewLink] = useState<string>();

  useDropzone({
    accept: "image/jpeg,image/png",
  });

  useEffect(() => {
    // create the preview
    const objectUrl = URL.createObjectURL(new Blob(file));
    setPreviewLink(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <>
      {/* <label htmlFor="fileinput"></label>
      <input type="file" id="fileinput" /> */}
      <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="bg-secondary-200">
            <div {...getRootProps()} className="max-w-5xl h-32 p-3 mx-auto">
              <div className="border-2 border-dashed border-secondary-100 h-full rounded-lg">
                <input {...getInputProps()} onChange={(e: any) => setFile(e)} />
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
      {file !== undefined ? (
        <img className="w-44 h-44" id="preview" src={previewLink} alt="" />
      ) : null}
    </>
  );
};

// function previewImg(image: File) {
//   console.log(image);

//   const imgFile = image;
//   const preview = document.getElementById("preview");
//   if (imgFile && preview) {
//     preview.src = URL.createObjectURL(imgFile);
//   }
// }

export default Fileinput;
