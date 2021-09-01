import React from "react";
import PropTypes from "prop-types";

// การเขียนแบบที่ 1
// const Footer = (props) => {
//   return (
//     <div>
//       <h3>{props.title} &copy; {new Date().getFullYear()}</h3>
//       {/* props = property props.title คือ กำหนดให้ property title รับค่ามาจาก App.js ต้องเขียนใน Components ที่จะส่งค่ากลับมา กรณีนี้คือ Footer */}
//       {/* new Date().getFullYear() Function จาก javascript */}
//       <p>{props.website} {props.postcode}</p>
//       {/* การเขียนแบบนี้ จะทำให้ดู Code รก ตาหน่อย */}
//     </div>
//   );
// };
// การเขียนแบบที่ 2
// const Footer = (props) => {
//   const {title , website , postcode} = props;
//   return (
//     <div>
//       <h3>{title} &copy; {new Date().getFullYear()}</h3>
//       <p>{website} {postcode}</p>
//     </div>
//   );
// };
/*{ เป็นการเขียนที่เริ่มจะ Clean สายตาขึ้นมาหน่อย }*/
// การเขียนแบบที่ 3
const Footer = ({ title, website, postcode, isOpen }) => {
  // const {title , website , postcode} = props;
  return (
    <div>
      <h1 style={Styles.titles}>
        {title} &copy; {new Date().getFullYear()}
      </h1>
      {/* CSS แบบ Inline ไม่ค่อยแนะนำถ้าต้องทำหลายๆบรรทัด */}
      <p style={{ color: "green", fontSize: 40 }}>
        {website} {postcode} isOpen:{isOpen.toString()} 
        {/* ถ้าเราเป็นคนสร้าง เราควร เช็ค Type Data ที่ส่งเข้ามาด้วย เช่น ตัวแปรนี้ ต้องรับค่า ตัวเลข  */}
      </p>
      <p style={Styles.titles}>Posuto Coding</p>
    </div>
  );
};
// ประกาศตัวแปร เป็น Object ขึ้นมาใช้งาน
const Styles = {
  titles: {
    color: "red",
    fontSize: 30,
  },
};

Footer.propTypes = {
  title: PropTypes.string,
  website: PropTypes.string,
  postcode: PropTypes.number,
  isOpen: PropTypes.bool,
};

export default Footer;
