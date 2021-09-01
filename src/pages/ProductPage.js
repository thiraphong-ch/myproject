import React from "react";
// import Table from 'react-bootstrap/Table'
import { Table, Image, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

//redux
import { addToCart } from "../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";

const ProductPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  //redux
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cartReducer.cartR);
  const totalRedux = useSelector((state) => state.cartReducer.totalR);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course",
        {
          cancelToken: cancelToken.current.token,
        }
      );
      /* const resp = await axios.get(
        "https://api.codingthailand.com/api/course2222"
      ); */
      // ใช้ทำ error
      //   console.log(resp.data.data);
      setProduct(resp.data.data);
      //   setLoading(true)
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
      //   console.log("Exit product page");
      cancelToken.current.cancel();
    };
  }, []);

  if (loading === true) {
    return (
      <div className="text-center mt-5">
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

  const addCart = (p) => {
    // console.log(p);

    const productP = {
      id: p.id,
      name: p.title,
      price: p.view, //สมมติ ว่า p.view คือ ราคา
      qty: 1,
    };
    //call action
    dispatch(addToCart(productP, cartRedux));
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h1>สินค้า</h1>
          {
            totalRedux > 0 && <h2>อยู่ในตะกร้า {totalRedux} ชิ้น</h2>
          }
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>ชื่อคอร์ส</th>
                <th>รายละเอียด</th>
                <th>วันที่สร้าง</th>
                <th>view</th>
                <th>รูปภาพ</th>
                <th>เครื่องมือ</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p, index) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.detail}</td>
                    {/* <th>{format(new Date(p.date), "dd MM yyyy")}</th> */}
                    <td>
                      {format(new Date(p.date), "dd MMM yyyy", { locate: th })}
                    </td>
                    <td>
                      <Badge variant="success">{p.view}</Badge>
                    </td>
                    <td>
                      <Image
                        src={p.picture}
                        rounded
                        alt={p.title}
                        width={100}
                      />
                    </td>
                    <td className="text-center">
                      <Link to={`/detail/${p.id}/title/${p.title}`}>
                        <GoEye />
                      </Link>
                      <button
                        onClick={() => addCart(p)}
                        className="btn btn-outline-success ml-2"
                      >
                        หยิบใส่ตะกร้าสินค้า
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
