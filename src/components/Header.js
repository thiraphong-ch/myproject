import React from "react";
import Logo from "./Logo";
import PropTypes from "prop-types";
import Title from "../styles/title/Title";
import { Button } from "../styles/button/Button";

const Header = () => {
  let companyName = "PST"
  const companyAddress = <p>Bangkok</p>
  let num = 100;
  //   ถ้าอยากใช้ แบบ Function ก็มีแบบนี้

  const showMessage = () => {
    return companyName + ".com"
  };
  const isLogin = false;
  //   true จะแสดงข้อความ ถ้า false จะไม่แสดงข้อมความ
  // เริ่มทำหัวข้อ Event Dom
  const showMe = () => {
    alert("Hello React");
  };
  // Array
  const products = [
    { id: 1, name: "Coke" },
    { id: 2, name: "Pepsi" },
  ];

  return (
    // <div>
    <>
    <Title>Hello React PST</Title>
      <h2>Header 2</h2>
      <h1>บริษัท {companyName}</h1>
      {companyAddress}
      {num + 200}
      <br />
      {showMessage()}
      {isLogin === true && (
        /*  {isLogin === true && เป็นการเขียนแบบ ย่อ ใช้ได้เหมือนกัน */
        <>
          <p>ยินดีต้อนรับ</p>
          <p>Here we go again</p>
        </>
      )}
      {
        isLogin && <Logo />
        //   กรณีแบบถ้าเป็นจริงอย่างเดียว ถึงจะแสดง Components Logo
      }
      {/* is else */}
      {
        isLogin ? <Logo /> : <p>ไม่มีสิทธิ์เข้าถึงรูปภาพ</p>
        //   ถ้าเป็น true แสดง Components Logo , else ( โคล่อน :) ไปปรับที่ const isLogin = false;  แสดงข้อความ ที่กำหนดไว้
      }
      {/* isLogin && / isLogin ? เป็นการเขียนแบบ ย่อ ใช้ได้เหมือนกัน */}
      <hr />
      {/* <button onClick={showMe}>Click Me</button> */}
      <Button primary onClick={showMe}>Click Me</Button>
      <br />
      <ul>
        {products.map((product1, index) => {
          return (
            <li key={product1.id}>
              {product1.name} {index + 1}
            </li>
            //  หรือจะใช้ index(callback) เป็น ลำดับ ตัวข้อมูล
          );
        })}
      </ul>
      <hr />
    </>
    // </div>
  );
};
Header.propTypes = {
  products: PropTypes.array,
  website: PropTypes.string,
  postcode: PropTypes.number,
  isOpen: PropTypes.bool,
};
export default Header;
