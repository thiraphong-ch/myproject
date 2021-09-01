import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import Menu from "./components/Menu";

function AppV1() {
  return (
    <div className="logo">
      <Logo />
      <Header />
      <Header></Header>

      <Footer title="Google" website="www.google.com" postcode={10500} isOpen />
      <hr />
      <Sidebar />
      <hr />
      <Menu />
    </div>
  );
}

export default AppV1;
