import React from "react";
import axios from "axios";

import { Spinner, Table, Button } from "react-bootstrap";
import { GoPencil, GoTrashcan } from "react-icons/go";
import { useHistory } from "react-router-dom";

const CategoryIndexPage = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const history = useHistory();

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      // ใช้ทำ error
      //   console.log(resp.data.data);
      setCategory(resp.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData();

    return () => {
      cancelToken.current.cancel();
    };
  }, []);

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
        <p>{JSON.stringify(errors)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h1>หมวดหมู่ข่าว</h1>
            <Button
              className="btn mb-3"
              variant="success"
              onClick={() => history.push("/category/create")}
            >
              เพิ่มข้อมูล
            </Button>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {category.map((c, index) => {
                  return (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>
                        {" "}
                        <Button
                          className="btn ml-2"
                          variant="outline-info"
                          size="sm"
                          onClick={() => history.push(`/category/edit/${c.id}`)}
                        >
                          <GoPencil />
                        </Button>{" "}
                        <Button
                          className="btn ml-2"
                          variant="outline-danger"
                          size="sm"
                          onClick={async () => {
                            const isConfirm = window.confirm(
                              `แน่ใจว่าต้องการลบข้อมูล${c.name}?`
                            );
                            if (isConfirm === true) {
                              const resp = await axios.delete(
                                `https://api.codingthailand.com/api/category/${c.id}`
                              );
                              alert(resp.data.message);
                              history.go(0);
                            }
                          }}
                        >
                          <GoTrashcan />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryIndexPage;
