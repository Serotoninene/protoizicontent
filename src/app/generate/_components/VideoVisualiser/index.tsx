import React from "react";
import type { AIAnswer } from "types";

type Props = {
  prompts?: AIAnswer;
  updateState?: (object: any) => void;
};

const VideoVisualiser = (_: Props) => {
  return <div>VideoVisualiser</div>;
};

export default VideoVisualiser;
