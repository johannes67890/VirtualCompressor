import { useState } from "react";
import Fileinput from "./components/Fileinput";
import Options from "./components/Options";
import wave from "./static/waves.jpg";

const App = () => {
  const [file, setFile] = useState<File[]>([]);
  const [compressed, setCompressed] = useState<File | undefined>(file[0]);
  return (
    <>
      <Fileinput file={file} setFile={setFile} setCompressed={setCompressed} />
      <Options file={file} compressed={compressed} />
    </>
  );
};

export default App;
