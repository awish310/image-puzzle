import { useState } from "react";
import { styled } from "styled-components";
import Editor from "./Editor/Index";
import Gallery from "./Gallery";
import { ShapeType } from "./Editor/types";

const Playground = () => {
  const [images, setImages] = useState<string[]>([]);
  const [shapes, setShapes] = useState<Array<ShapeType> | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <Wrapper>
      <Gallery
        images={images}
        setImages={setImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        shapes={shapes}
      />
      <Editor
        selectedImage={selectedImage}
        shapes={shapes}
        setShapes={setShapes}
      />
    </Wrapper>
  );
};

export default Playground;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.height.header}px);
`;
