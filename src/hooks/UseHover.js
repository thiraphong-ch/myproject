import React from "react";

// Costume Hook
function useHover() {
  const [hover, setHover] = React.useState(false);
  //   เมื่อเอา เมาส์ ไปวาง ที่รูป ของ Components นี้ รูปจะแสดงข้อความ
  const mouseOver = () => {
    setHover(true);
  };
  //  เมื่อเอา เมาส์ ออกจาก รูป ของ Components นี้ ข้อความจะหายไป
  const mouseOut = () => {
    setHover(false);
  };
  //   แบบ 1 จะซ่อนบรรทัด Property Object นี้ไป
  //  แบบที่ 2 เป็นการจัดกลุ่ม ก่อนส่งค่า ออกไป (ประกาศ Property Object)
  const attrs = {
    onMouseOver: mouseOver,
    onMouseOut: mouseOut,
  };

  //  แบบ 1 return [hover, mouseOver, mouseOut];
  return [hover, attrs];
}
export default useHover;
