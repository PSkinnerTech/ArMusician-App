import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useEffect, useState } from "react";

const promptOptions = [
  { label: "this is the time when...", value: "this is the time when " },
  { label: "today i...", value: "today i " },
  { label: "yesterday i...", value: "yesterday i " },
  { label: "i...", value: "i " },
  { label: "write anything", value: "write anything " },
];

let timer: NodeJS.Timeout | string | number | undefined = undefined;
const usePrompt = () => {
  const [prompt, setPrompt] = useState(0);
  const [placeholder, setPlaceholder] = useState(promptOptions[0].label);
  const { description, setDescription } = useZoraCreateProvider();

  const rotatePrompt = () => {
    clearInterval(timer);
    timer = setInterval(
      () =>
        setPrompt((prev) => {
          const promptIndex = (prev + 1) % promptOptions.length;
          setPlaceholder(promptOptions[promptIndex].label);
          return promptIndex;
        }),
      1500,
    );
  };

  const onActive = () => {
    clearInterval(timer);
    if (description) return;
    setDescription(promptOptions[prompt].value);
  };

  useEffect(() => {
    if (!description) rotatePrompt();
  }, [description]);

  return {
    placeholder,
    onActive,
  };
};

export default usePrompt;
