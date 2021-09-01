import React from "react";

import { Col, Row, Container, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const Supported_Image_Format = ["image/jpg", "image/jpeg"];

const UploadPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    try {
      let fileUpload = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (event) => {
        let base64Image = event.target.result;
        const urlAPI = "https://api.codingthailand.com/api/upload";
        const resp = await axios.post(urlAPI, {
          picture: base64Image,
        });
        // alert(resp.data.data.message);
        addToast(resp.data.data.message, {
          appearance: "success",
          // autoDismiss: true,
          // autoDismissTimeout: 3000,
        });
        console.log(resp.data.data.url);
        history.replace("/");
      };
    } catch (error) {
      // console.log(error);
      addToast(JSON.stringify(error), {
        appearance: "error",
      });
    }
    const imageAPI =
      "https://api.codingthailand.com/storage/images/612f1a6bd9565.jpeg";
  };
  //or
  //   const onSubmit = data => console.log(data);
  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <h1>อัปโหลดรูปภาพ</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                เลือกไฟล์ภาพที่นี้
              </label>
              <input
                type="file"
                {...register("picture", {
                  required: "กรุณาเลือกไฟล์ภาพก่อน",
                  validate: {
                    CheckFileType: (value) => {
                      return (
                        value && Supported_Image_Format.includes(value[0].type)
                      );
                    },
                  },
                })}
                className={`form-control-file ${
                  errors.picture ? "is-invalid" : ""
                }`}
                id="exampleFormControlFile1"
              />
              {errors.picture && errors.picture.type === "required" && (
                <div className="invalid-feedback">{errors.picture.message}</div>
              )}
              {errors.picture && errors.picture.type === "CheckFileType" && (
                <div className="invalid-feedback">
                  ไฟล์ภาพรองรับเฉพาะนามสกุล .jpg หรือ .jpeg เท่านั้น
                </div>
              )}
            </div>
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
