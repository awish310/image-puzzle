import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import styled from "styled-components";

type ImageUploaderProps = {
  handleFile: (file?: File) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ handleFile }) => {
  const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUploaded = event?.target?.files?.[0];
    if (imageUploaded) {
      handleFile(imageUploaded);
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <GrAdd size={isHover ? "28" : "24"} />
      </Button>
      <HiddenFileInput
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        accept="image/png, image/jpg, image/jpeg"
      />
    </Wrapper>
  );
};

export default ImageUploader;

const Wrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 14px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Button = styled.button``;
