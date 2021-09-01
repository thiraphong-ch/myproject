import React from "react";
// import PropTypes from "prop-types";
import { logo, title } from "../styles/style";
import useHover from "../hooks/UseHover";

const Logo = () => {
  // แบบที่ 1 const [hover, mouseOver, mouseOut] = useHover();
  const [hover, attrs] = useHover();
  const logoImage = {
    url: "./logo512.png",
  };
  return (
    <div>
      {/* <img src="./logo192.png" width="100" alt="logo" /> */}
      <h3 style={title}>Logo</h3>
      {hover ? <p>Hello logo</p> : null}
      {/* แบบที่ 1 */}
      {/* <img onMouseOver={mouseOver} onMouseOut={mouseOut} style={logo} src={logoImage.url} width="100" alt="logo" /> */}
      {/* แบบที่ 2  */}
      {/* <img onMouseOver={attrs.onMouseOver} onMouseOut={attrs.onMouseOut} style={logo} src={logoImage.url} width="100" alt="logo" /> */}
      {/* แบบที่ 3 สเป็ท operator วิธีการเขียนให้สั้นอีก เพื่อให้คำนำไปใช้ได้ง่ายอีก ไม่ต้องเขียนยาว */}
      <img {...attrs} style={logo} src={logoImage.url} width="100" alt="logo" />
    </div>
  );
};
export default Logo;
