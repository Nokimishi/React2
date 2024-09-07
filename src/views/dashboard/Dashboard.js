import React, { useEffect, useState } from 'react';
import { CButton, CCol, CInput, CLabel, CRow, CSelect, CImg } from '@coreui/react';
import { useHistory } from 'react-router';
import { ApiRequest } from '../common/ApiRequest';
import Loading from "../common/Loading";
import SuccessError from "../common/SuccessError";
import NPagination from '../common/pagination/NPagination';


const Dashboard = () => {
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState(false); // for loading condition
  const [employeeList, setEmployeeList] = useState([]); // for user list table data
  const [currentPage, setCurrentPage] = useState(1); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [genderData, setGenderData] = useState([
    { id: "0", name: "Male" },
    { id: "1", name: "Female" },
    { id: "2", name: "Other" },
  ]);
  const [selectGender, setSelectGender] = useState("");
  const [userName, setUserName] = useState("");
  const [total, setTotal] = useState(""); // total rows
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  let history = useHistory();

  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`);
    if (flag === "true") {
      console.log("Login process success");
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
      await search();
      setLoading(false);
    })();
  }, []);

  const search = async (page = 1) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: userName,
        gender: selectGender,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setEmployeeList([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setEmployeeList(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
        setError([]);
      } else {
        setError([response.data.message]);
        setEmployeeList([]);
      }
    }
  };

  const tempSearch = async (page) => {
    let search = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: userName,
        gender: selectGender,
      },
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setEmployeeList([]);
    } else {
      if (response.data.status === "OK") {
        setEmployeeList(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        setEmployeeList([]);
      }
    }
  };

  const searchClick = () => {
    search();
  };

  const pagination = (i) => {
    setCurrentPage(i);
    tempSearch(i);
  };

  const delClick = async (deleteId) => {
    setDeleteId(deleteId);
    setShowConfirm(true);
  };

  const handleConfirm = async (confirmed) => {
    setShowConfirm(false);
    if (confirmed) {
      setLoading(true);
      let obj = {
        method: "delete",
        url: `employee/delete/${deleteId}`,
      };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setSuccess([]);
        setError(response.message);
      } else {
        if (response.data.status === "OK") {
          let page = currentPage;
          setSuccess([response.data.message]);
          if (employeeList.length - 1 === 0) {
            page = currentPage - 1;
          }
          tempSearch(page);
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <SuccessError success={success} error={error} />
      <CRow className='mt-5'>
        <CCol>
          {employeeList.length > 0 && (
            <>
              <p style={{ textAlign: 'right' }}  className='mb-0 font-weight-bold '>Total : {total} row(s)</p>
              <div className='overflow'>
              <table className='table table-bordered table-hover dashboard-table'>
      <thead>
        <tr>
          <th className="text-center" width="50">No</th>
          <th className='text-center' width="180">UserName</th>
          <th className='text-center' width="250">Email</th>
          <th className='text-center' width="200">Date Of Birth</th>
          <th className='text-center' width="150">Gender</th>
          <th className='text-center' width="230">English Skill</th>
          <th className='text-center' width="150">Japanese Skill</th>
        </tr>
      </thead>
      <tbody>
        {employeeList.map((data, index) => {
          return (
            <tr key={index}>
              <td className="text-center">{(currentPage - 1) * 10 + index + 1}</td>
              <td className="text-center">{data.name}</td>
              <td className="text-center">{data.email}</td>
              <td className='text-center'>{data.date_of_birth}</td>
              <td className='text-center'>{data.gender}</td>
              <td className="text-center">{data.english_skill}</td>
              <td className="text-center">{data.japanese_skill}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
              </div>
            </>

          )}

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
      </div>
  );
};

export default Dashboard;
