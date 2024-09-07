import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CInput,
  CRow,
  CSelect
} from '@coreui/react'
import { useHistory } from 'react-router'
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import NPagination from '../../common/pagination/NPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret,faKey ,faUserPen,faTrashCan} from '@fortawesome/free-solid-svg-icons';

const AdminRegAndListIndex = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin,setAdmin]=useState([])
  const [totalRow, setTotalRow] = useState(""); // for user list table rows
  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [updateID, setUpdateID] = useState(localStorage.getItem(`Update`));
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [total, setTotal] = useState(""); // total rows
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);


  useEffect(()=> {
    let flag = localStorage.getItem(`LoginProcess`)
    if (flag == "true") {
      console.log("Login process success")
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
        await search();
      setLoading(false);
    })();


  },[])
 

  const search = async (page = 1)=> {
    
    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
          setAdmin(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotal(response.data.data.total);
        
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }

  }

  const tempSearch = async (page) => {
    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
          setAdmin(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotal(response.data.data.total);
        
      } else {
        setAdmin([]);
      }
    }
  };

  const pagination = (i) => {
    setCurrentPage(i);
    tempSearch(i);
  };

  const validatePassword = (password) => {
    const minLength = 12;
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

    if (password.length < minLength) {
      return "Password must be at least 12 characters long.";
    } else if (!strongPasswordPattern.test(password)) {
      return "Password must include uppercase, lowercase, number, and special character.";
    }
    return null;
  };


  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const reset = () => {
    setUserName("");
    setPassword("");
  }

  const saveClick = () => {
    setShowConfirm(true); // Show the confirmation dialog
  };

  const handleConfirm = async (confirm) => {
    setShowConfirm(false);
    if (!confirm) return; // If user clicked "No", do nothing

    setLoading(true);
    setUpdateStatus(false);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError([passwordError]);
      setSuccess([]);
      setLoading(false);
      return;
    }

    let saveData = {
    
      method: "post",
      url: `admin/save`,
      params: {
       name : userName,
      password: password,
      },
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        reset();
        search();
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  }




  const editClick = async(id) => {
    setUpdateStatus(true);
    setUpdateID(id);
    let saveData = {
      method: "get",
      url: `admin/edit/${id}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setPassword(response.data.data.password);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);

  }

  const delClick = async (id) => {
    setShowConfirmDelete(true);
    setAdminToDelete(id);
  };

  const handleConfirmDelete = async (confirm) => {
    setShowConfirmDelete(false);
    if (!confirm) return; // If user clicked "No", do nothing

    setLoading(true);
    let deleteData = {
      method: "delete",
      url: `admin/delete/${adminToDelete}`,
    };
    let response = await ApiRequest(deleteData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        search(); // Call the search function to refresh the admin list
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  const updateClick = async () => {
    setShowConfirmUpdate(true);
  };
  
  const handleConfirmUpdate = async (confirm, updateID) => {
    setShowConfirmUpdate(false);
    if (!confirm) return; // If user clicked "No", do nothing
  
    setLoading(true);
    let saveData = {
      method: "post",
      url: `admin/update/${updateID}`,
      params: {
        name: userName,
        password: password,
      },
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([response.data.message]);
        reset();
        search();
        setError([]);
        setUpdateStatus(false); // Add this line to update the updateStatus state
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
        <SuccessError success={success} error={error} />
          <CCard className="adm-reg-cardbody">
            <CCardHeader className="adm-reg-cardh">
              <h4 className='adm-reg-h m-0 text-center'>Admin Registeration</h4>
            </CCardHeader>
            <CCardBody
            >
              
              <CRow style={{ marginTop: "10px" }} 
               onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (updateStatus === false) {
                    saveClick();
                  } else {
                    updateClick();
                  }
                }
              }}>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 adm-reg-text'>UserName</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={userName} onChange={userNameChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
               

                </CCol>


                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 adm-reg-text'>Password</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="password" value={password} onChange={passwordChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                 
                </CCol>

              </CRow>
              <CRow style={{ justifyContent: "center" }} className="mt-4">
              { updateStatus == false && (
    <CButton className="admin-btn" onClick={saveClick}>
      Save
    </CButton>
  )}
 {
  updateStatus == true && (
    <CButton className="admin-btn" onClick={updateClick}>
      Update
    </CButton>
  )}

      {showConfirm && (
        <div className="confirm-dialog">
          <p  className="text-center">Are you sure you want to save this data?</p>
          <CButton className="yes-btn" onClick={() => handleConfirm(true)}>Yes</CButton>
          <CButton className="no-btn" onClick={() => handleConfirm(false)}>No</CButton>
        </div>
      )}
      {
  showConfirmUpdate && (
    <div className="confirm-dialog">
      <p className="text-center">Are you sure you want to update this admin?</p>
      <CButton className="yes-btn" onClick={() => handleConfirmUpdate(true, updateID)}>Yes</CButton>
      <CButton className="no-btn" onClick={() => handleConfirmUpdate(false, updateID)}>No</CButton>
    </div>
  )
}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h4 className='m-0 text-center'>Admin List</h4>
            </CCardHeader>
            <CCardBody>
            <CRow>
        <CCol>
        {admin.length > 0 && (
          <>
          <p style={{ textAlign: 'right' }} className='mb-0 font-weight-bold'>Total : {total} row(s)</p>
          <div className='overflow'>
            <table className='emp-list-table'>
              <thead>
                <tr>
                  <th className="text-center" width={50} >No</th>
                  <th className='text-center' width={120}>UserName</th>
                  <th className='text-center' width={120}>UserCode</th>
                  <th className='text-center' width={120}>Password</th>
                  <th className='text-center' width={40} colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {admin.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td width={50} className="text-center">{(currentPage - 1) * 10 + index + 1}</td>
                      <td className="text-center" width={120}>{data.name}</td>
                      <td className="text-center" width={120}>{data.user_code}</td>
                      <td className="text-center" width={120}> {data.password}</td>
                            <td style={{  textAlign:"center"}} width={20}>
                              <div className="icon-edit">
                                <FontAwesomeIcon
                                  icon={faUserPen}
                                  size="xl"
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                />
                              </div>
                            </td>

                            <td style={{ textAlign:"center"}} width={20}>
                              <div className="icon-del">
                               
                                <FontAwesomeIcon icon={faTrashCan} size="xl"
                                onClick={() => delClick(data.id)}
                                />
                              </div>
                            </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          </>
        )}
        </CCol>
        {showConfirmDelete && (
              <div className="confirm-dialog">
                <p className="text-center text-danger">Are you sure you want to delete this admin?</p>
                <CButton className="yes-btn" onClick={() => handleConfirmDelete(true)}>Yes</CButton>
                <CButton className="no-btn" onClick={() => handleConfirmDelete(false)}>No</CButton>
              </div>
            )}
      </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <br></br>
      {total > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }

    </>
  )
}

export default AdminRegAndListIndex