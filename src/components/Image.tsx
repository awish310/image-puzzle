import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useImageDimensions } from "../hooks";
import { theme } from "../style";

type ImageProps = {
  imageUrl: string;
  canvasWidth?: number;
  canvasHeight?: number;
};

const Image: React.FC<ImageProps> = ({
  imageUrl,
  canvasWidth,
  canvasHeight,
}) => {
  const [image] = useImage(imageUrl);
  const { width, height, x } = useImageDimensions(
    image,
    canvasWidth,
    canvasHeight
  );

  const shouldHaveBorderRadius =
    width &&
    canvasWidth &&
    width >= canvasWidth &&
    height &&
    canvasHeight &&
    height >= canvasHeight;

  return (
    <KonvaImage
      cornerRadius={shouldHaveBorderRadius ? theme.borderRadius : 0}
      width={width}
      height={height}
      image={image}
      x={x}
    />
  );
};

export default Image;
