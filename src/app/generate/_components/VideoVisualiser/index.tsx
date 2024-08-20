import { useSelectedPromptsContext } from "@/context/SelectedPromptsContext";

const VideoVisualiser = () => {
  const { selectedPrompts } = useSelectedPromptsContext();
  console.log(selectedPrompts);
  return (
    <div>
      {selectedPrompts.map((prompt, idx) => (
        <div key={idx}>{prompt.setup}</div>
      ))}
    </div>
  );
};

export default VideoVisualiser;
