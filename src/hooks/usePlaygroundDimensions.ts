import { useEffect, useState } from "react";
import { theme } from "../style";

const usePlaygroundDimensions = () => {
  const { innerWidth, innerHeight } = window;
  const [width, setWidth] = useState(innerWidth);
  const [height, setHeight] = useState(innerWidth * 0.75);

  useEffect(() => {
    if (height > innerHeight - theme.height.header) {
      const _height = innerHeight - theme.height.header;
      const _width = _height * 1.3333;
      setHeight(_height * 0.9);
      setWidth(_width * 0.9);
    }
  }, []);

  return { width, height };
};

export default usePlaygroundDimensions;
