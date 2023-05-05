import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";
import { useMemo, useState, useEffect, use, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosExit } from "react-icons/io";
import { BiSkipPrevious } from "react-icons/bi";
import { BiSkipNext } from "react-icons/bi";
import Result from "@/pages/session-results";
import UserInfoContext from '@/pages/api/user_info-conntext';


function Table({ columns, data }){
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize =5,
    state: { pageIndex, pageSize },
  } = useTable(
    { 
      columns, 
      data, 
      initialState: { pageIndex: 0, pageSize: 8 },
    }, 
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead className="bg-cyan-600 text-white">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()} className={`px-4 py-2 font-bold border-b-2 border-blue-800`}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`}>
                {row.cells.map((cell, val) => {
                  if (cell.column.Header === 'Action') {
                    // Render the custom cell component with the button
                    return <td className="px-4 py-2 items-center text-center">
                      {/* <button >
                        <IoIosExit className="text-slate-900 lg:text-xl"/>
                      </button> */}
                      <button onClick={()=>console.log(row.cells[val].row.original.studid)}>
                        <MdDelete className="text-red-600 lg:text-xl"/>
                      </button>
                      </td>;
                  }
                  if (cell.column.Header === 'Result') {
                    // Render the custom cell component with the button
                    let style = "";
                    if(cell.value=="Vigorous Activity"){
                      style = 'text-red-400';
                    }else if(cell.value=="Moderate Activity"){
                      style = 'text-sky-400';
                    }else if(cell.value=="Light Activity"){
                      style = 'text-emerald-400'
                    }
                    return <td className={`px-4 py-2 items-center text-center ${style}`}>{cell.render('Cell')}</td>;
                  }
                  return (
                    <td {...cell.getCellProps()} className="px-4 py-2 items-center text-center">
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination flex flex-row justify-center items-center">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="text-center text-cyan-500 flex justify-center align-center py-3">
          <BiSkipPrevious className="lg:text-4xl"/>
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage} className="text-center text-cyan-500 flex justify-center align-center py-3">
          <BiSkipNext className="lg:text-4xl text-center"/>
        </button>{' '}
        <span >
          <strong className="text-center flex justify-center align-middle py-3">
            Page {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>{' '}
      </div>
    </>
  )
}

function RecordsTable(props){
  const { info } = useContext(UserInfoContext);

  const data_array = info.records;

  const data = data_array || []

  const columns = useMemo(
      () => [
        // Cell: ({ value }) => <div className="px-4 py-2 items-center text-center">{value}</div>,
        { Header: 'Date', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleString(), },
        { Header: 'Exercise Type', accessor: 'extype', },
        { Header: 'Calories Burned', accessor: 'calburn', },
        { Header: 'Reps', accessor: 'reps', },
        { Header: 'Avg. Reps Speed', accessor: 'avgreps', },
        { Header: 'Session Duration', accessor: 'duration', },
        { Header: 'Result', accessor: 'result', },
        { Header: 'Action', accessor: 'test', }
      ],
      []
  );
  
  return(
    <Table columns={columns} data={data} />
  )
}

export default RecordsTable;