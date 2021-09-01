import React from "react";

import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { clearAllCart } from "../redux/actions/cartAction";

//

const CartPage = () => {
  //redux
  const cartRedux = useSelector((state) => state.cartReducer.cartR);
  const totalRedux = useSelector((state) => state.cartReducer.totalR);
  const dispatch = useDispatch(); //call Action

  //react hooks
  const history = useHistory();
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>ตะกร้าสินค้า ซื้อไปแล้ว {totalRedux} ชิ้น</h2>
          <button
            onClick={() => {
              dispatch(clearAllCart());
              history.push("/");
            }}
            className="btn btn-danger btn-sm mb-3"
          >
            ล้างตะกร้า
          </button>

          <button
            onClick={() => {
              history.push("/pdf");
            }}
            className="btn btn-info btn-sm mb-3 ml-3"
          >
            รายการ PDF
          </button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รหัสสินค้า</th>
                <th>ชื่อสินค้า</th>
                <th>ราคา</th>
                <th>จำนวนที่ซื้อ</th>
                <th>รวมทั้งหมด</th>
              </tr>
            </thead>
            <tbody>
              {cartRedux.map((c, index) => {
                return (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.price}</td>
                    <td>{c.qty}</td>
                    <td>{c.price * c.qty}</td>
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

export default CartPage;
