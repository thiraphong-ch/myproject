import React from "react";

// เป็นตัวอย่าง ก่อนที่จะทำ Custom Hook
const Menu = () => {
  const [hover, setHover] = React.useState(false);
//   เมื่อเอา เมาส์ ไปวาง ที่รูป ของ Components นี้ รูปจะแสดงข้อความ
  const mouseOver = () => {
    setHover(true);
  };
  //  เมื่อเอา เมาส์ ออกจาก รูป ของ Components นี้ ข้อความจะหายไป
  const mouseOut = () => {
    setHover(false);
  };
  return (
    <div>
      <h1>Menu</h1>
      {/* หรืออยากทำ Pop ลองทำด้วยตัวเองดู */}
      {hover ? <h3>เมนูหลัก</h3> : null}
      <img
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        src="./logo192.png"
        alt="logo"
      />
    </div>
  );
};

export default Menu;
