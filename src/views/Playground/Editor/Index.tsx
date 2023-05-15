import React, { useEffect, useRef, useState } from "react";
import { usePlaygroundDimensions } from "../../../hooks";
import { LineType, ShapeType } from "./types";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva";
import { Image, Modal } from "../../../components";
import BlankShapes from "./BlankShapes";
import Drawer from "./Drawer";
import Shape from "./Shape";
import { styled } from "styled-components";
import Instructions from "./Instructions";

type EditorProps = {
  selectedImage: string;
  shapes: Array<ShapeType> | null;
  setShapes: React.Dispatch<React.SetStateAction<ShapeType[] | null>>;
};

const Editor: React.FC<EditorProps> = ({
  selectedImage,
  shapes,
  setShapes,
}) => {
  const [line, setLine] = useState<LineType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [shapeIdxToDelete, setShapeIdxToDelete] = useState<number | null>(null);
  const isDrawing = useRef(false);
  const { width, height } = usePlaygroundDimensions();

  useEffect(() => {
    setLine(null);
    setShapes(null);
  }, [selectedImage]);

  const handleOnDeleteClicked = (shapeIdx: number) => {
    setShapeIdxToDelete(shapeIdx);
    setIsDeleteModalOpen(true);
  };

  const deleteShape = () => {
    if (!shapes?.length || shapeIdxToDelete === null) return;

    setShapes([
      ...shapes.slice(0, shapeIdxToDelete),
      ...shapes.slice(shapeIdxToDelete + 1),
    ]);
    setShapeIdxToDelete(null);
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (!selectedImage) return;
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    setLine({ points: [pos.x, pos.y] });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || !line || !selectedImage) return;

    const point = e.target.getStage()?.getPointerPosition();
    if (!point) return;

    const updatedLine = { ...line };
    updatedLine.points = updatedLine.points.concat([point.x, point.y]);
    setLine(updatedLine);
  };

  const handleMouseUp = () => {
    if (!line || !selectedImage) return;

    if (line.points.length > 30) {
      const updatedLine = { ...line };
      setLine(updatedLine);
      const updatedShapes = shapes?.length ? [...shapes, line] : [line];
      setShapes(updatedShapes);
      setLine(null);
    }
    isDrawing.current = false;
  };

  const imageComponent = (
    <Image imageUrl={selectedImage} canvasWidth={width} canvasHeight={height} />
  );

  return (
    <Wrapper height={height} width={width} $isReadyToDraw={!!selectedImage}>
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {imageComponent}
          {selectedImage && (
            <>
              <BlankShapes shapes={shapes} />
              <Drawer line={line} />
              {shapes?.map((shape, i) => (
                <Shape
                  key={`shape-${i}`}
                  shape={shape}
                  index={i}
                  imageComponent={imageComponent}
                  onDelete={handleOnDeleteClicked}
                />
              ))}
            </>
          )}
        </Layer>
      </Stage>
      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Are you sure
            you want to delete this piece?"
        confirmBtnLabel="Delete"
        onConfirm={deleteShape}
        onCancel={() => setShapeIdxToDelete(null)}
      />
      {!shapes && !!selectedImage && <Instructions />}
    </Wrapper>
  );
};

export default Editor;

const Wrapper = styled.div<{
  height: number;
  width: number;
  $isReadyToDraw: boolean;
}>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  background: ${({ theme }) => theme.color.bright || "#FFF"};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  cursor: ${({ $isReadyToDraw }) => ($isReadyToDraw ? "crosshair" : "default")};
  position: relative;
  overflow: hidden;
`;
