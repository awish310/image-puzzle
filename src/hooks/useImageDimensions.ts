import { useEffect, useState } from "react";

const useImageDimensions = (
  image?: HTMLImageElement,
  canvasWidth?: number,
  canvasHeight?: number
) => {
  const [width, setWidth] = useState(canvasWidth);
  const [height, setHeight] = useState(canvasHeight);
  const [x, setX] = useState(0);

  useEffect(() => {
    if (!image || !canvasWidth || !canvasHeight) return;
    const ratio = image.height / image.width;

    setHeight(canvasHeight);
    setWidth(canvasHeight / ratio);
    setX((canvasWidth - canvasHeight / ratio) / 2);
  }, [image, canvasWidth, canvasHeight]);

  return {
    height,
    width,
    x,
  };
};

export default useImageDimensions;
