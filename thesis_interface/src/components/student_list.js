import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";
import { useMemo, useState, useEffect, use, useContext } from "react";
import Result from "@/pages/session-results";
import UserInfoContext from '@/pages/api/user_info-conntext';
import { Button } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import StudentRecordsContext from "@/pages/api/stud_records-context";
import { Modal } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Table({ columns, data }){

  const {selectedStudent, setSelectedStudent, selectedName, setSelectedName, selectedUsername, setSelectedUsername, studentRecord, setstudentRecord} = useContext(StudentRecordsContext);
  const {info,updatedb,setupdatedb} = useContext(UserInfoContext);
  const [isActive, setIsActive] = useState();
  const [deleteBtnToggled, setDeleteBtnToggled] = useState(false);
  const [removeStudentID, setRemoveStudentID] = useState();

  let curcoach = info._id
  let counter = updatedb;
  let id = 0;

  const currentcoach = async(e) =>{
    //console.log(info.id)
    try {
        const res = await fetch('/api/findstudentrecord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({curcoach,id}),
        });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
    }

    // store the token in a cookie
    const { coachinfo } = await res.json();
    //console.log(coachinfo);
    //const fcoachinfo = coachinfo;
    //setCoach(fcoachinfo);
    //setUserHaveCoach(true);
    //setstudents(coachinfo);
    setstudentRecord(coachinfo);

    } catch (error) {
        console.log(error);
        //setUserHaveCoach(false)

    }
  }

  const deletecoach = async (studid) => {
    const coach = {coachid: curcoach, studid: studid}
    //console.log(coach.studid);
    try {
      const response = await fetch('/api/deletestudents', {
        method: 'POST',
        body: JSON.stringify(coach),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setDeleteBtnToggled(false);
        toast.info('Remove student success.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        //console.log(data.message);
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    setupdatedb(counter += 1);
  };
  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
      <>
        <table {...getTableProps()} className="w-full h-full border-collapse">
          <tbody {...getTableBodyProps()} className="">
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="grid grid-cols-5 bg-cyan border-t-2 border-blue-800">
                  {row.cells.map((cell, val) => {
                    {if(cell.column.Header=="StudentName"){
                        return (
                            <td {...cell.getCellProps()} className="text-center text-cyan-blue grid col-span-4">
                                <button className={`py-4 truncate ${isActive === row.id ? 'bg-sky-500 text-white font-medium' : 'bg-white'}`} onClick={()=>{
                                  setIsActive(row.id);

                                  // GET THE SELECTED STUDENT DATA HERE BY ACCESSING row OBJECT

                                  setSelectedName(row.values.StudentName);
                                  //console.log(row.values)
                                  //console.log(row.id)
                                  id = row.id;
                                  currentcoach();
                                }
                                }>
                                    {cell.render('Cell')}
                                </button>
                            </td>
                        )
                    }
                    if(cell.column.Header=="Action"){
                        return (
                            <td {...cell.getCellProps()} className={`${isActive === row.id ? 'bg-sky-500 text-white' : 'bg-white text-cyan-blue'} flex justify-center items-center col-span-1`}>
                                <button className="" onClick={()=>{setDeleteBtnToggled(true); setRemoveStudentID(row.values._id)}}>
                                    <RxCross2/>
                                </button>
                            </td>
                        )
                    }}
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <Modal
          show={deleteBtnToggled}
          size="md"
          popup={true}
          onClose={()=>setDeleteBtnToggled(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to remove your access to the records of {selectedName}?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={()=>deletecoach(removeStudentID)}
                >
                  Yes
                </Button>
                <Button
                  color="gray"
                  onClick={()=>setDeleteBtnToggled(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <ToastContainer/> 
      </>
    )
}

function StudentList(props){
  // FETCH USERS STUDENT HERE AND SET THE data TO USER STUDENT COLLECTIONS OBJECT

  const columns = useMemo(
        () => [
          {
            Header: 'StudentName',
            accessor: row => `${row.firstName} ${row.lastName}`, // accessor is the "key" in the data
          },
          {
            Header: 'Action',
            accessor: '_id',
          },
        ],
        []
  )
  
  const datas = useMemo(()=>props.data)

  return (
    <Table columns={columns} data={datas} />
  )
}

export default StudentList;