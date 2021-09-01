import React from "react";
import Pagination from "react-js-pagination";
import axios from "axios";

import { Spinner, Table } from "react-bootstrap";

const pageSize = 15;

const HospitalPage = () => {
  const [hospital, setHospital] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  //pagination
  const [page, setPage] = React.useState(1);
  const [itemtotal, setItemTotal] = React.useState(0);

  const getData = async (page) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      // ใช้ทำ error
      //   console.log(resp.data.data);
      setHospital(resp.data.data);
      setItemTotal(resp.data.meta.pagination.total);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData(page);

    return () => {
      cancelToken.current.cancel();
    };
  }, [page]);

  if (loading === true) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  if (errors) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>เกิดข้อผิดพลาดจาก Server กรุณาลองใหม่</p>
        <p>{errors.response.data.message}</p>
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h1>สถานพยาบาล</h1>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>code</th>
                  <th>ชื่อสถานพยาบาล</th>
                </tr>
              </thead>
              <tbody>
                {hospital.map((h, index) => {
                  return (
                    <tr key={h.id}>
                      <td>{h.id}</td>
                      <td>{h.code}</td>
                      <td>{h.h_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* <br /> */}
            <Pagination
              activePage={page}
              itemsCountPerPage={pageSize}
              totalItemsCount={itemtotal}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-link"
              prevPageText="ก่อนหน้า"
              nextPageText="ถัดไป"
              firstPageText="หน้าแรก"
              lastPageText="หน้าสุดท้าย"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalPage;
