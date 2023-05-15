import { SetStateAction, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { styled } from "styled-components";

type ImagePreview = {
  image: string;
  isSelected: boolean;
  setImageToSelect: React.Dispatch<SetStateAction<string>>;
};

const ImagePreview: React.FC<ImagePreview> = ({
  image,
  isSelected,
  setImageToSelect,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Wrapper>
      <Image
        src={image}
        $isSelected={isSelected}
        onClick={() => {
          setImageToSelect(image);
        }}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <LoaderWrapper>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="56"
            visible={true}
          />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

export default ImagePreview;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img<{ $isSelected: boolean }>`
  width: 210px;
  aspect-ratio: 4/3;
  object-fit: contain;
  margin-bottom: 8px;
  opacity: ${({ $isSelected }) => ($isSelected ? 0.6 : 1)};

  &:hover {
    opacity: 0.6;
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
`;
