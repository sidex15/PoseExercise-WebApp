import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";
import { useMemo, useState, useEffect, use, useContext } from "react";
import Result from "@/pages/session-results";
import UserInfoContext from '@/pages/api/user_info-conntext';
import { Button } from "flowbite-react";
import { RxCross1 } from "react-icons/rx";
import StudentRecordsContext from "@/pages/api/stud_records-context";
function Table({ columns, data }){

  const {selectedStudent, setSelectedStudent, selectedName, setSelectedName, selectedUsername, setSelectedUsername, studentRecord, setstudentRecord} = useContext(StudentRecordsContext);
  const {info,updatedb,setupdatedb} = useContext(UserInfoContext);
  const [isActive, setIsActive] = useState();
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
        <table {...getTableProps()} className="w-full h-full border-collapse">
          <tbody {...getTableBodyProps()} className="">
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="grid grid-cols-5 bg-cyan border-t-2">
                  {row.cells.map((cell, val) => {
                    {if(cell.column.Header=="StudentName"){
                        return (
                            <td {...cell.getCellProps()} className="text-center text-cyan-blue grid col-span-4">
                                <button className={`py-4 truncate ${isActive === row.id ? 'bg-sky-500' : ''}`} onClick={()=>{
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
                            <td {...cell.getCellProps()} className={`${isActive === row.id ? 'bg-sky-500' : ''} flex justify-center items-center col-span-1`}>
                                <button className="" onClick={()=>deletecoach(row.values._id)}>
                                    <RxCross1/>
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