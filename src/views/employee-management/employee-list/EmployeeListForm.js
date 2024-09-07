import { CButton, CCol, CInput, CLabel, CRow, CSelect, CImg } from '@coreui/react'
import React from 'react';
import NPagination from '../../common/pagination/NPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen,faTrashCan} from '@fortawesome/free-solid-svg-icons';

function EmployeeListForm(props) {
  let { userName, userNameChange, genderData, selectGender, selectGenderChange,
    searchClick, employeeList, total,
    currentPage, lastPage, pagination,
    editClick, delClick } = props;

  return (
    <div className='mt-4'>
      <CRow alignHorizontal="center" className="mb-4"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchClick();
        }
      }}
      >
        <CCol lg="6">
          <CRow className="align-items-center">
            <CCol lg="1"></CCol>
            <CCol lg="3">
              <p className="mt-2 mb-0 font-weight-bold">UserName</p>
            </CCol>
            <CCol lg="7">
              <CInput
                type="text"
                value={userName}
                onChange={userNameChange}
                className="form-control rounded"
              />
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
        <CCol lg="6">
          <CRow className="align-items-center">
            <CCol lg="1"></CCol>
              <CCol lg="3">
                <p className="mt-2 mb-0 font-weight-bold">Gender</p>
              </CCol>
              <CCol lg="7">
                <CSelect
                  value={selectGender}
                  onChange={selectGenderChange}
                  className="form-select rounded"
                >
                  <option value="">-- All --</option>
                  {genderData.map((data, index) => (
                    <option key={index} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        </CCol>
      </CRow>

      <CRow alignHorizontal="center" className="mt-5">
        <CButton className="emp-btn-search" onClick={searchClick}>
          Search
        </CButton>
      </CRow>
      <CRow className='mt-5'>
        <CCol>
          {employeeList.length > 0 && (
            <>
              <p style={{ textAlign: 'right' }}  className='mb-0 font-weight-bold '>Total : {total} row(s)</p>
              <div className='overflow'>
                <table className='emp-list-table'>
                  <thead>
                    <tr>
                      <th className="text-center" width={50} >No</th>
                      <th className='text-center' width={180}>UserName</th>
                      <th className='text-center' width={250}>Email</th>
                      <th className='text-center' width={200}>Date Of Birth</th>
                      <th className='text-center' width={150}>Gender</th>
                      <th className='text-center' width={230}>English Skill</th>
                      <th className='text-center' width={150}>Japanese Skill</th>
                      <th className='text-center' width={80} colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td width={50} className="text-center">{(currentPage - 1) * 10 + index + 1}</td>
                          <td className="text-center">{data.name}</td>
                          <td className="text-center"> {data.email}</td>
                          <td className='text-center' >{data.date_of_birth}</td>
                          <td className='text-center'>{data.gender}</td>
                          <td className="text-center">{data.english_skill}</td>
                          <td className="text-center">{data.japanese_skill}</td>
                            <td style={{  textAlign:"center"}}>
                              <div className="icon-edit-hover">
                                <FontAwesomeIcon
                                  icon={faUserPen}
                                  size="xl"
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                />
                              </div>
                            </td>

                            <td style={{ textAlign:"center"}}>
                              <div className="icon-del-hover">
                               
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
  )
}

export default EmployeeListForm
