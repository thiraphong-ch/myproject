import React from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const schema = yup.object().shape({
  name: yup.string().required("ชื่อ-สกุล ห้ามว่าง"),
  email: yup
    .string()
    .required("อีเมล์ ห้ามว่าง")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่าน ห้ามว่าง")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

const RegisterPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const apiUrl = "https://api.codingthailand.com/api/register";
      const resp = await axios.post(apiUrl, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      addToast(resp.data.message, {
        appearance: "success",
      }); //บันทึกข้อมูลเรียบร้อย
      history.replace("/login");
    } catch (error) {
      addToast(error.response.data.errors.email[0], {
        appearance: "error",
      });
    }
  };

  return (
    <Container fluid className="mt-4">
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>ชื่อ-สกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                {...register("name")}
                isInvalid={!!errors.name}
                // className={`from-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}

              <Form.Text className="text-muted">
                We'll never share your data with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                {...register("email")}
                isInvalid={!!errors.email}
                // className={`from-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}

              <Form.Text className="text-muted">
                We'll never share your data with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password")}
                isInvalid={!!errors.password}
                // className={`from-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}

              <Form.Text className="text-muted">
                We'll never share your data with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              สมัครสมาชิก
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
