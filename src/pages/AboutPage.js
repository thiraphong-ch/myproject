import React from "react";

import axios from "axios";

const AboutPage = () => {
  const [version, setVersion] = React.useState("");
  const getData = async () => {
    const resp = await axios.get("https://api.codingthailand.com/api/version");
    setVersion(resp.data.data.version);
  };

  React.useEffect(() => {
    // async function getData() {
    //   const resp = await axios.get(
    //     'https://api.codingthailand.com/api/version'
    //   );
    //   // console.log(resp.data)
    //   // console.log(resp.data.message)
    //   // console.log(resp.data.status_code)
    //   // console.log(resp.data.data.version)
    //   // setVersion(resp.data.data.status_code);
    //   setVersion(resp.data.data.version);
    // }
    getData();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>ประวัติผู้พัฒนาเว็บ</h2>
          <p>
            สวัสดีครับ ผมชื่อเล่นว่า โพส เว็บนี้พัฒนาโดย React DOM หรือก็คือ React Web ครับ
          </p>
          <p>
            นักศึกษาจบใหม่ที่ได้เก็บเกี่ยวประสบการณ์จาก ฝึกงาน 3 เดือน และทำงานจริง 4 เดือน
            ซึ่งผมได้สัมภาษณ์ test code นั้นได้ทราบว่า ตัวผม อ่อนใน ลอจิก(Logic) การเขียน code นั้นยังน้อยนิด
            จึงอยากพัฒนาตัวเองให้เก่งมากขึ้นและสามารถกล้าที่จะท้าทายอีกครั้งครับ
          </p>
          {/* <p>
          ปัจจุบันกำลังศึกษา Node.js ควบคู่ไปด้วยเพื่อให้สามารถเข้าใจในการแก้ปัญหาทั้ง Front-End และ Back-End ครับ
          </p> */}
          {version && <p> BackEnd API Version : {version}</p>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
