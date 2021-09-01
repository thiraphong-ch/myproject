import React from "react";

const Sidebar = () => {
  //   let fullname = "John Witch";
  const [fullname, setFullname] = React.useState("John Witch");
  //   useState Booleen
  const [isShow, setIsShow] = React.useState(true);
  // useState Number + 1 ดูได้ที่ PDF ตัวอย่าง
  const changeName = () => {
    // fullname = "mary Rose";
    setFullname("Mary Rose");
    // setIsShow(false) แบบ set ค่าตายตัว
    setIsShow(!isShow); //เป็นการทำแบบ toggle คลิก1ครั้งจะสลับ true/false คลิกอีกครั้งจะ สลับกลับ
  };
  // การเขียนแบบนี้คือ ถ้าต้องการให้ทำงานเสมอ ทุกๆครั้งที่มีการ Re-render จะทำงานซ้ำ
  React.useEffect(() => {
    console.log("sidebar useEffect");
    // ถ้าเขียนแบบนี้ คือ จะดึงข้อมูลจาก Database ทุกรอบที่ Re-render อาจทำให้ Memory เต็มได้
  });
  // เคส อยากให้ทำงาน ครั้งเดียว
  React.useEffect(() => {
    console.log("sidebar useEffect one time only");
  },[]);
// การเขียนแลลนี้คือ ทำครั้งเดียวตอนเข้ามา และจะทำอีกก็ต่อเมื่อน fullname มีการ change ค่า ครับ
  React.useEffect(() => {
    console.log("sidebar useEffect = > " + fullname);
  },[fullname]);
  // ใช้สำหรับงานบางงานที่เราอยากจะ Run เฉพาะที่มีการเปลี่ยนแปลงจริงๆ เช่น ID บางตัว ที่มีการเปลี่ยนค่า ก็จะส่งไป query ค้นหา ฐานข้อมูล

  return (
    <>
      <h3>Sidebar</h3>

      {isShow ? <p>Time</p> : <p>JOJO SAWARUDO!!</p>}

      <p>Hello {fullname}</p>
      <button onClick={changeName}>เปลี่ยนชื่อ</button>
    </>
  );
};

export default Sidebar;
