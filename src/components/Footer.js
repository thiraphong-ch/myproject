import React from "react";

//Call Action
import { getVersion } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();
  const versionRedux = useSelector((state) => state.authReducer.versionR);

  React.useEffect(() => {
    // console.log("footer useEffect")
    dispatch(getVersion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <footer className="container">
        <p>
          © Company Posuto 2020-{new Date().getFullYear()} API Version:
          {versionRedux}
        </p>
      </footer>
    </>
  );
};

export default Footer;
