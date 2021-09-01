import React from "react";
import useHover from "../hooks/UseHover";

// เป็นตัวอย่าง ก่อนที่จะทำ Custom Hook
const Menu = () => {
  // แบบที่ 1 const [hover, mouseOver, mouseOut] = useHover();
  const [hover, attrs] = useHover();
  return (
    <div>
      <h1>Menu</h1>
      {/* หรืออยากทำ Pop ลองทำด้วยตัวเองดู */}
      {hover ? <h3>เมนูหลัก</h3> : null}
      {/* แบบที่ 1 <img onMouseOver={mouseOver} onMouseOut={mouseOut}{...attrs} src="./logo192.png" alt="logo" /> */}
      {/* แบบที่ 2  <img onMouseOver={attrs.onMouseOver} onMouseOut={attrs.onMouse}{...attrs} src="./logo192.png" alt="logo" /> */}
      {/* แบบที่ 3 Spent Operator */}
      <img {...attrs} src="./logo192.png" alt="logo" />
    </div>
  );
};

export default Menu;
