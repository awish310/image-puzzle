import { SceneContext } from "konva/lib/Context";
import { Circle, Group, Text } from "react-konva";
import { theme } from "../../../style";
import { ShapeType } from "./types";
import { KonvaEventObject } from "konva/lib/Node";

type ShapeProps = {
  shape: ShapeType;
  index: number;
  imageComponent: JSX.Element;
  onDelete: (shapeIdx: number) => void;
};

const Shape: React.FC<ShapeProps> = ({
  shape: { points },
  index,
  imageComponent,
  onDelete,
}) => {
  const onClip = (ctx: SceneContext) => {
    ctx.beginPath();
    for (let i = 0; i < points.length; i = i + 2) {
      const x = points[i];
      const y = points[i + 1];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 10;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.closePath();
  };

  const handleCursor = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      if (e.type === "mouseenter") {
        stage.container().style.cursor = "pointer";
      } else {
        stage.container().style.cursor = "crosshair";
      }
    }
  };

  return (
    <Group draggable onMouseEnter={handleCursor} onMouseLeave={handleCursor}>
      <Group clipFunc={onClip}>{imageComponent}</Group>
      <Group onClick={() => onDelete(index)}>
        <Circle
          width={24}
          height={24}
          fill={theme.color.error || "red"}
          x={points[0]}
          y={points[1]}
        />
        <Text text="X" x={points[0] - 4} y={points[1] - 4} />
      </Group>
    </Group>
  );
};

export default Shape;
