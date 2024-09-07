import React, { useState } from "react";
import { ApiRequest } from "../common/ApiRequest";
import { checkNullOrBlank } from "../common/CommonValidation";
import Loading from "../common/Loading";
import SuccessError from '../common/SuccessError';
import { CButton, CCard, CCardBody, CCol, CInput, CLabel, CRow } from '@coreui/react';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false); // For Loading
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [userCode, setUserCode] = useState(""); // for username

  const handleForgotPassword = async () => {
    let err = [];

    // Validate input
    if (!checkNullOrBlank(userCode)) {
      err.push("Please enter your username.");
    }

    if (err.length > 0) {
      setError(err);
      setSuccess([]);
    } else {
      setLoading(true);
      setError([]);
      setSuccess([]);

      // Prepare the API request
      let saveData = {
        method: "post",
        url: `admin/forgotpassword`,
        params: {
          user_code: userCode,
        },
      };

      // Send API request
      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError([response.message]);
        setSuccess([]);
      } else {
        setError([]);
        setSuccess([response.data.message]);
      }

      setLoading(false);
    }
  };

  return (
    <>
      <CRow>
        <CCol lg="3"></CCol>
        <CCol lg="6">
          <CCard className="login" style={{ marginTop: "100px" }}>
            <CCardBody>
              <CRow alignHorizontal='center'>
                <h3 className='login-title'>Forgot Password</h3>
              </CRow>
              <SuccessError success={success} error={error} />
              <CRow className="mt-4 align-items-center">
                <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                <CCol lg="8">
                  <CInput placeholder='Enter User Code' type='text'
                    value={userCode} onChange={(e) => setUserCode(e.target.value)}
                  />
                </CCol>
              </CRow>
              <br />
              <CRow alignHorizontal='center'>
                <CButton className='login-btn' type="submit"
                  onClick={handleForgotPassword}
                >Submit</CButton>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg="3"></CCol>
      </CRow>
      <Loading start={loading} />
    </>
  );
};

export default ForgotPasswordForm;
