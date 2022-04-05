import { useState } from "react";
import Fileinput from "./components/Fileinput";
import Options from "./components/Options";

const App = () => {
  const [preview, setPreview] = useState<string>();
  const [CompressedPreview, setCompressedPreview] = useState<string>();
  return (
    <>
      <Fileinput
        setPreview={setPreview}
        setCompressedPreview={setCompressedPreview}
      />
      <Options preview={preview} CompressedPreview={CompressedPreview} />
    </>
  );
};

export default App;
