import { Line } from "react-konva";
import { LineType } from "./types";
import { theme } from "../../../style";

type DrawerProps = {
  line: LineType | null;
};

const Drawer: React.FC<DrawerProps> = ({ line }) => {
  const strokeWidth = line && line.points.length > 30 ? 1 : 0;

  return (
    line && (
      <Line
        points={line.points}
        stroke={theme.color.dark || "#000"}
        strokeWidth={strokeWidth}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        dash={[4, 4]}
        globalCompositeOperation="source-over"
        draggable
      />
    )
  );
};

export default Drawer;
