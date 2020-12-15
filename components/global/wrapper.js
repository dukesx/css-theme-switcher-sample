import useDarkMode from "use-dark-mode";
import Nav from "./nav";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Layout } from "antd";

const Wrapper = (props) => {
  const { currentTheme, status } = useThemeSwitcher();
  if (status === "loading") {
    return null;
  }
  return (
    <>
      <Nav theme={currentTheme} />
      <Layout.Content className="">{props.children}</Layout.Content>
    </>
  );
};

export default Wrapper;
