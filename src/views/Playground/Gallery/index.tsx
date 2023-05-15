import { SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";
import { usePlaygroundDimensions } from "../../../hooks";
import FileUploader from "./FileUploader";
import ImagePreview from "./ImagePreview";
import { ShapeType } from "../Editor/types";
import { Modal } from "../../../components";
import { shapes } from "konva/lib/Shape";

const HEADER_HEIGHT = 56;
type GalleryProps = {
  images: string[];
  setImages: React.Dispatch<SetStateAction<string[]>>;
  selectedImage: string;
  setSelectedImage: React.Dispatch<SetStateAction<string>>;
  shapes: Array<ShapeType> | null;
};

const Gallery: React.FC<GalleryProps> = ({
  images,
  setImages,
  selectedImage,
  setSelectedImage,
}) => {
  const { height } = usePlaygroundDimensions();
  const [imageToSelect, setImageToSelect] = useState<string>("");
  const [isSwitchingImageModalOpen, setIsSwitchingImageModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (imageToSelect) {
      if (Object.keys(shapes).length > 1) {
        setIsSwitchingImageModalOpen(true);
      } else {
        setSelectedImage(imageToSelect);
      }
    }
  }, [imageToSelect]);

  const handleFile = (file?: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (!images.length) {
        setSelectedImage(imageUrl);
      }
      setImages([...images, imageUrl]);
    }
  };

  const renderImages = () =>
    images?.map((image, i) => (
      <ImagePreview
        key={`image-card-${i}`}
        image={image}
        isSelected={selectedImage === image}
        setImageToSelect={setImageToSelect}
      />
    ));

  return (
    <>
      <Wrapper height={height}>
        <Header>
          <Title>Gallery</Title>
          <FileUploader handleFile={handleFile} />
        </Header>
        <ImageList height={height - HEADER_HEIGHT}>{renderImages()}</ImageList>
      </Wrapper>
      <Modal
        isOpen={isSwitchingImageModalOpen}
        setIsOpen={setIsSwitchingImageModalOpen}
        title="Changing image will discard your shapes, Are you sure
        you want to change this image?"
        confirmBtnLabel="Change"
        onConfirm={() => setSelectedImage(imageToSelect)}
        onCancel={() => setImageToSelect("")}
      />
    </>
  );
};

export default Gallery;

const Wrapper = styled.div<{ height: number }>`
  width: 250px;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  margin-right: 16px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: ${({ theme }) => theme.color.bright || "#FFF"};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 0 16px;
  position: relative;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 24px;
  color: ${({ theme }) => theme.color.dark || "#000"};
`;

const ImageList = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ height }) => `${height}px` || "auto"};
  padding: 0 16px;
  background: ${({ theme }) => theme.color.bright || "#FFF"};
  overflow-y: auto;
`;
