import { Line } from "react-konva";
import { ShapeType } from "./types";
import { theme } from "../../../style";

type BlankShapesProps = {
  shapes?: Array<ShapeType> | null;
};

const BlankShapes: React.FC<BlankShapesProps> = ({ shapes }) => {
  return (
    <>
      {shapes?.map((shape, i) => (
        <Line
          key={i}
          points={shape.points}
          stroke={theme.color.natural || "gray"}
          strokeWidth={0.5}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          fill={theme.color.natural || "gray"}
          closed
          globalCompositeOperation="source-over"
        />
      ))}
    </>
  );
};

export default BlankShapes;
