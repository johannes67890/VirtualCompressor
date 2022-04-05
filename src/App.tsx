import { useState } from "react";
import Fileinput from "./components/Fileinput";
import Options from "./components/Options";

const App = () => {
  const [previewLink, setPreviewLink] = useState<string>();
  return (
    <>
      <Fileinput setPreviewLink={setPreviewLink} />
      <Options previewLink={previewLink} />
    </>
  );
};

export default App;
