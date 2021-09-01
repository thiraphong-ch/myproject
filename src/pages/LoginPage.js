import React from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// import { UserStoreContext } from "../context/UserContext";

import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("อีเมล์ ห้ามว่าง")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่าน ห้ามว่าง")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

const LoginPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  // const userStore = React.useContext(UserStoreContext);

  //call redux action
  const dispatch = useDispatch();

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
      const apiUrl = "https://api.codingthailand.com/api/login";
      const resp = await axios.post(apiUrl, {
        email: data.email,
        password: data.password,
      });
      // console.log(resp.data)

      //get profile
      const urlProfile = "https://api.codingthailand.com/api/profile";
      const respProfile = await axios.get(urlProfile, {
        headers: { Authorization: "Bearer " + resp.data.access_token },
      });
      // console.log(resProfile.data.data.user);
      localStorage.setItem(
        "profile",
        JSON.stringify(respProfile.data.data.user)
      );

      addToast("เข้าระบบเรียบร้อย", {
        appearance: "success",
      }); //เข้าระบบเรียบร้อย
      // history.replace("/");
      // history.go(0);

      //update profile by context
      const profileValue = JSON.parse(localStorage.getItem("profile"));
      // userStore.updateProfile(profileValue); // Context
      dispatch(updateProfile(profileValue));
      history.replace("/");
    } catch (error) {
      addToast(error.response.data.message, {
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
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
