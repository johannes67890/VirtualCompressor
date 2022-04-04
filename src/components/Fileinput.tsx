import React from "react";
import Dropzone, { useDropzone } from "react-dropzone";

const Fileinput = () => {
  useDropzone({
    accept: "image/jpeg,image/png",
  });

  return (
    <>
      {/* <label htmlFor="fileinput"></label>
      <input type="file" id="fileinput" /> */}
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="bg-secondary-300">
            <div {...getRootProps()} className="max-w-6xl h-32 p-3">
              <div className="border-2 border-dashed border-secondary-100 h-full">
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default Fileinput;
