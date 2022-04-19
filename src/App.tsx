import { useState } from "react";
import Fileinput from "./components/Fileinput";
import Options from "./components/Options";
import wave from "./static/waves.jpg";

const App = () => {
  const [file, setFile] = useState<File[]>([]);
  const [compressed, setCompressed] = useState<File | undefined>(file[0]);
  const [options, setOptions] = useState<Compressor.Options>({ quality: 0.1 });
  return (
    <>
      <Fileinput
        file={file}
        setFile={setFile}
        setCompressed={setCompressed}
        options={options}
      />
      <Options file={file} compressed={compressed} setOptions={setOptions} />
    </>
  );
};

export default App;
