import React from "react";

import { Link } from "react-router-dom";

import { BsFillBagFill } from "react-icons/bs";
import { Spinner } from "react-bootstrap";

import { useQuery } from "react-query";

const HomePage = () => {
  // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  //   fetch("https://api.codingthailand.com/api/news?page=1&per_page=3").then(
  //     (res) => res.json()
  //   )
  // );

  const query = useQuery("getData", () => {
    const controller = new AbortController();
    const signal = controller.signal;

    // const promise = fetch(
    //   "https://api.codingthailand.com/api/news?page=1&per_page=3",{
    //     method: 'get' ,
    //     signal
    //   }
    const promise = fetch(
      "https://api.codingthailand.com/api/news?page=1&per_page=2",
      {
        method: "get",
        signal: signal,
      }
    ).then((res) => res.json());

    //cancel request
    promise.cancel = () => controller.about();

    return promise;
  });

  const { isLoading, error, data, isFetching } = query;

  if (isLoading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>เกิดข้อผิดพลาดจาก Server กรุณาลองใหม่</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Welcome to Project React API</h1>
            <p>
              This web design by React Bootstrap <BsFillBagFill color="blue" />
            </p>
            <p>
              <b>(function ตะกร้าสินค้า ระบบล็อคอินสมาชิก PDF รายการสินค้า เมนู
              สินค้า เลือกสินค้าแล้วไปที่ตะกร้าสินค้าจะมี ตารางข้อมูลที่สามารถ
              Save เป็น PDF ได้)</b>
            </p>
            <p>
              <b>- เมนู ตะกร้าสินค้า</b> จะไม่สามารถคลิกเข้าไปทั้งๆที่ไม่มีข้อมูล
              เนื่องจาก เป็น บัค จาก function .map
              จึงไม่แสดงตารางข้อมูลที่ได้เขียนเอาไว้
            </p>

            <p>
              <b>- เมนู Workshop</b> มีระบบ 1. แบ่งหน้าแสดงข้อมูลรายชื่อโรงพยาบาลจาก
              API 2. Create , Read , Upload , Delete ข้อมูล ที่ส่งคำสั่งจาก
              Front-End ไป Back-End โดยตรง{" "}
            </p>
            <p>
              <b>- เมนู อัปโหลดไฟล์</b> เป็นการอัพโหลดรูปภาพตามที่กำหนดเงื่อนไขสกุลไฟล์เอาไว้ ซึ่งก็คือ .jpg
              ถ้าไม่ใช่จะมีการแจ้งเตือนไม่สามารถอัปโหลดไฟล์ได้
            </p>
            <p>
              <b>- เมนูสมาชิก</b> เมื่อสมัครสมาชิกแล้ว log-in
              จะมีเมนูที่สามารถเข้าได้เฉพาะ บัญชีที่ login แล้ว โผล้ขึ้นมา
              ให้สามารถเข้าถึงได้
            </p>
            <p>
              <b>"ข้อมูลที่แสดงในช่องเนื้อหาข้างล่างที่แสดง (หลักสูตร PHP OOP)
              เป็นข้อมูลที่ดึงมาจาก API Servers (Back-End)"</b>
            </p>
            <p>
              <Link
                to="/product"
                className="btn btn-primary btn-lg"
                role="button"
              >
                สินค้าทั้งหมด
              </Link>
            </p>
          </div>
        </div>
        <div className="container">
          {/* Example row of columns */}
          <div className="row">
            <div className="text-center">
              {isFetching ? "กำลังอัพเดท..." : null}
            </div>
            {data.data.map((news, index) => {
              return (
                <div className="col-md-4" key={news.id}>
                  <h2>{news.topic}</h2>
                  <p>{news.detail}</p>
                  <p>หมวดหมู่ข่าว : {news.name}</p>
                </div>
              );
            })}
          </div>
          <hr />
        </div>{" "}
        {/* /container */}
      </main>
    </>
  );
};
export default HomePage;
