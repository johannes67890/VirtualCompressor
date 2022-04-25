import { useState } from "react";
import Fileinput from "./components/Fileinput";
import Options from "./components/Options";

const App = () => {
  const [file, setFile] = useState<File[]>([]);
  const [compressed, setCompressed] = useState<File | undefined>(file[0]);
  const [options, setOptions] = useState<Compressor.Options>({
    quality: 0.6,
    convertSize: 500000,
  });
  return (
    <>
      <Fileinput
        file={file}
        setFile={setFile}
        setCompressed={setCompressed}
        options={options}
      />
      <Options
        file={file}
        compressed={compressed}
        setOptions={setOptions}
        options={options}
      />
    </>
  );
};

export default App;
