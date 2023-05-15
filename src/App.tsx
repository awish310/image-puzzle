import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./style";
import { Playground } from "./views";
import { Header } from "./components";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <>
        <Header />
        <Playground />
      </>
    </ThemeProvider>
  );
};

export default App;
