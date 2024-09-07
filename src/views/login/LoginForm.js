import { CButton, CCard, CCardBody, CCol, CImg, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import React from "react";
import SuccessError from '../common/SuccessError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret,faKey } from '@fortawesome/free-solid-svg-icons';


const LoginForm = (props) => {
  let {loginClick, passwordChange, password, userCodeChange, userCode, success, error, zoomSize} = props;

  return (
      <>
          {zoomSize < 170 && (  
              <div className="min-vh-100 flex-row align-items-center login-bg">
                  {/* PC View Code */}
                  <CRow>
                      <CCol lg="3"></CCol>
                      <CCol lg="6">
                          <CCard className="login" style={{ marginTop: "100px" }}>
                              <CCardBody
                                  onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                          loginClick();
                                      }
                                  }}
                              >
                                  <CRow alignHorizontal='center'>
                                      <CImg src='./image/main-logo.png' width={150} height={100}></CImg>
                                  </CRow>
                                  <CRow alignHorizontal='center' className="mb-3">
                                      <h3 className='login-title'>Registration System</h3>
                                  </CRow>
                                  <SuccessError success={success} error={error} />
                                  <CRow className="mt-4 align-items-center">
                                      <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                                      <CCol lg="8">
                                          <CInputGroup>
                                              <CInputGroupPrepend>
                                                  <CInputGroupText>
                                                    <FontAwesomeIcon icon={faUserSecret} size="xl" style={{color: "#B197FC",}} />
                                                  </CInputGroupText>
                                              </CInputGroupPrepend>
                                              <CInput className="login-input" placeholder='Enter User Code' type='text'
                                                  autoFocus value={userCode} onChange={userCodeChange}
                                              ></CInput>
                                          </CInputGroup>
                                      </CCol>
                                  </CRow>
                                  <br />
                                  <br />
                                  <CRow className="align-items-center">
                                      <CCol lg="4"><CLabel className="form-label">Password</CLabel></CCol>
                                      <CCol lg="8">
                                          <CInputGroup>
                                              <CInputGroupPrepend>
                                                  <CInputGroupText>
                                                    <FontAwesomeIcon icon={faKey} size="xl" style={{color: "#B197FC",}} />
                                                  </CInputGroupText>
                                              </CInputGroupPrepend>
                                              <CInput className="login-input" placeholder='Enter Password' type='password'
                                                  value={password} onChange={passwordChange}
                                              ></CInput>
                                          </CInputGroup>
                                      </CCol>
                                  </CRow>
                                  <br />
                                  <br />
                                  <CRow alignHorizontal='center' className="mb-4">
                                      <CButton id="login" className=' login-btn' type="submit"
                                          onClick={loginClick}
                                      >Login</CButton>
                                  </CRow>
                              </CCardBody>
                          </CCard>
                      </CCol>
                      <CCol lg="3"></CCol>
                  </CRow>
              </div>
          )}
          {zoomSize >= 170 && (
              <div className="min-vh-100 flex-row align-items-center login-bg-small">
                  {/* Mobile View Code */}
                  <CRow>
                      <CCol lg="2"></CCol>
                      <CCol lg="8">
                          <CCard className="login" style={{ marginTop: "50px" }}>
                              <CCardBody
                                   onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        loginClick();
                                    }
                                }}>
                                  <CRow alignHorizontal='center'>
                                      <CImg src='./image/main-logo.png' width={100} height={100}></CImg>
                                  </CRow>
                                  <CRow alignHorizontal='center' className="mb-3">
                                      <h3 className='login-title-small'>Registration System</h3>
                                  </CRow>
                                  <SuccessError success={success} error={error} />
                                  <CRow className="mt-4 align-items-center">
                                      <CCol lg="4"><CLabel className="form-label-small">User Code</CLabel></CCol>
                                      <CCol lg="8">
                                          <CInputGroup>
                                              <CInputGroupPrepend>
                                                  <CInputGroupText>
                                                    <FontAwesomeIcon icon={faUserSecret} size="xl" style={{color: "#2158bd",}} />
                                                  </CInputGroupText>
                                              </CInputGroupPrepend>
                                              <CInput className="login-input" placeholder='Enter User Code' type='text'
                                                  autoFocus value={userCode} onChange={userCodeChange}
                                              ></CInput>
                                          </CInputGroup>
                                      </CCol>
                                  </CRow>
                                  <br />
                                  <br />
                                  <CRow className="align-items-center">
                                      <CCol lg="4"><CLabel className="form-label-small">Password</CLabel></CCol>
                                      <CCol lg="8">
                                          <CInputGroup>
                                              <CInputGroupPrepend>
                                                  <CInputGroupText>
                                                    <FontAwesomeIcon icon={faKey} size="xl" style={{color: "#2158bd",}} />
                                                  </CInputGroupText>
                                              </CInputGroupPrepend>
                                              <CInput className="login-input" placeholder='Enter Password' type='password'
                                                  value={password} onChange={passwordChange}
                                              ></CInput>
                                          </CInputGroup>
                                      </CCol>
                                  </CRow>
                                  <br />
                                  <br />
                                  <CRow alignHorizontal='center' className="mb-4">
                                      <CButton id="login" className=' login-btn-small' type="submit"
                                          onClick={loginClick}
                                      >Login</CButton>
                                  </CRow>
                              </CCardBody>
                          </CCard>
                      </CCol>
                      <CCol lg="2"></CCol>
                  </CRow>
              </div>
          )}
      </>
  );
}

export default LoginForm;

