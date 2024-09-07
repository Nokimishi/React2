import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSelect
} from '@coreui/react'
import { useHistory } from 'react-router'
import DatePicker from '../../common/datepicker/DatePicker';
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import moment from "moment";

const EmployeeRegistrationIndex = () => {
  const history = useHistory();
  
  // Initial state variables
  const [genderData, setGenderData] = useState([
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ]);
  const [englishSkillData, setEnglishSkill] = useState([
    { id: "1", name: "Elementary" },
    { id: "2", name: "Intermediate" },
    { id: "3", name: "Advanced" },
    { id: "4", name: "Proficient" },
  ]);
  const [japaneseSkill, setJapaneseSkill] = useState([
    { id: "1", name: "N1" },
    { id: "2", name: "N2" },
    { id: "3", name: "N3" },
    { id: "4", name: "N4" },
    { id: "5", name: "N5" },
  ]);

  // Form fields state
  const [fromDate, setFromDate] = useState(null); 
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectJapan, setSelectJapan] = useState("");
  const [selectEng, setSelectEng] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // State for handling update functionality
  const [updateID, setUpdateID] = useState(localStorage.getItem(`Update`));
  const [loading, setLoading] = useState(false); 
  const [updateStatus, setUpdateStatus] = useState(false);
  const [error, setError] = useState([]); 
  const [success, setSuccess] = useState([]); 
  const [isUpdateAction, setIsUpdateAction] = useState(false); // New state to differentiate between save and update

  // Form load logic
  useEffect(()=> {
    let flag = localStorage.getItem(`LoginProcess`);
    let updateFrom = localStorage.getItem(`Update`);
    localStorage.removeItem('Update');
    setUpdateID(updateFrom);
    if (flag === "true") {
       if(updateFrom != null){
          formload();
          setUpdateStatus(true);
       }
    } else {
      history.push(`/Login`);
    }
  },[])

  // Form field change handlers
  const userNameChange = (e) => setUserName(e.target.value);
  const emailChange = (e) => setEmail(e.target.value);
  const selectJapanChange = (e) => setSelectJapan(e.target.value);
  const selectEngChange = (e) => setSelectEng(e.target.value);
  const selectGenderChange = (e) => setSelectGender(e.target.value);
  const fromDateChange = (e) => setFromDate(moment(e).format("YYYY-MM-DD"));

  // Form load function for edit
  const formload = async() => {
    setLoading(true);
    let saveData = {
      method: "get",
      url: `employee/edit/${updateID}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {  
      setError(response.message);
      setSuccess([]);
    } else {
      if (response.data.status === "OK") {
        setUserName(response.data.data.name);
        setEmail(response.data.data.email);
        setSelectJapan(response.data.data.japanese_skill);
        setSelectEng(response.data.data.english_skill);
        setFromDate(response.data.data.date_of_birth);
        setSelectGender(response.data.data.gender);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
   }

  // Reset form fields
  const reset = () => {
    setUserName("");
    setEmail("");
    setSelectJapan("");
    setSelectEng("");
    setFromDate(null);
    setSelectGender("");
  }

  // Validation logic
  const validateForm = () => {
    const errors = [];
    if (!userName) errors.push("User Name is required.");
    if (!email) errors.push("Email is required.");
    if (!selectJapan) errors.push("Japanese Skill is required.");
    if (!selectEng) errors.push("English Skill is required.");
    if (!selectGender) errors.push("Gender is required.");
    if (!fromDate) errors.push("Date of Birth is required.");

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
    errors.push("Wrong email format.");
    }
    setError(errors);
    return errors.length === 0;
  }

  // Save Click handler with validation
  const saveClick = () => {
    if (!validateForm()) return;
    setIsUpdateAction(false); // Indicate that it's a save action
    setShowConfirm(true);
  };

  // Update Click handler with validation
  const updateClick = () => {
    if (!validateForm()) return;
    setIsUpdateAction(true); // Indicate that it's an update action
    setShowConfirm(true);
  }

  // Handle confirmation dialog
  const handleConfirm = async (confirmed) => {
    if (confirmed) {
      setLoading(true);
      let saveData = {
        method: "post",
        url: isUpdateAction ? `employee/update/${updateID}` : `employee/save`, // Use update URL if updating
        params: {
          name: userName,
          email: email,
          japanese_skill: selectJapan,
          english_skill: selectEng,
          gender: selectGender,
          date_of_birth: fromDate,
        }
      };
      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError(response.message);
        reset();
        setSuccess([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess([response.data.message]);
          reset();
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
      setLoading(false);
    }
    setShowConfirm(false);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          <CCard  className="emp-reg-cardbody">
            <CCardHeader className="emp-reg-cardh">
              <h4 className='emp-reg-h m-0 text-center'>Employee Registration</h4>
            </CCardHeader>
            <CCardBody  
            onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                  if (updateStatus === false) {
                    e.preventDefault();
                    saveClick();
                  } else {
                    e.preventDefault();
                    updateClick();
                  }
                }
                  }} >
              <CRow style={{ marginTop: "10px" }} >
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 emp-reg-text'>UserName</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={userName} onChange={userNameChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 emp-reg-text'>Gender</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectGender}
                        onChange={selectGenderChange}
                      >
                        <option value="">-- Select --</option>
                        {genderData.map((data, index) => (
                          <option
                            key={index}
                            value={data.name}
                          >
                            {data.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 emp-reg-text'>English Skill</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectEng}
                        onChange={selectEngChange}
                      >
                        <option value="">-- Select --</option>
                        {englishSkillData.map((data, index) => (
                          <option
                            key={index}
                            value={data.name}
                          >
                            {data.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                </CCol>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 emp-reg-text'>Email</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={email} onChange={emailChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 emp-reg-text'>Date of Birth</p>
                    </CCol>
                    <CCol lg="7">
                      <DatePicker value={fromDate} change={fromDateChange} 
                        maxDate={new Date()}
                      />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2 emp-reg-text'>Japanese Skill</p>
                    </CCol>
                    <CCol lg="7">
                      <CSelect
                        value={selectJapan}
                        onChange={selectJapanChange}
                      >
                        <option value="">-- Select --</option>
                        {japaneseSkill.map((data, index) => (
                          <option
                            key={index}
                            value={data.name}
                          >
                            {data.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                  <br />
                </CCol>
              </CRow>
              <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
                  {updateStatus === false && (
                    <CButton className="emp-btn-save" onClick={saveClick}>
                      Save
                    </CButton>
                  )}
                  {updateStatus === true && (
                    <CButton className="emp-btn-up" onClick={updateClick}>
                      Update
                    </CButton>
                  )}
                  {showConfirm && (
                  <div className="confirm-dialog">
                    <p className="text-center">Are you sure you want to {isUpdateAction ? "update" : "save"}?</p>
                    <CButton  className="yes-btn " onClick={() => handleConfirm(true)}>Yes</CButton>
                    <CButton  className="no-btn " onClick={() => handleConfirm(false)}>No</CButton>
                  </div>
                  )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Loading start={loading} />
    </>
  )
}

export default EmployeeRegistrationIndex;
