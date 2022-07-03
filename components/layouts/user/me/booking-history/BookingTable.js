import React, { useMemo } from 'react'
import NumberFormat from 'react-number-format'
import { useTable, useGlobalFilter } from 'react-table'
import BookingFilter from './BookingFilter'
import { COLUMNS } from './columns'

export default function BookingTable ({ data, getBookingInfo }) {
  const columns = useMemo(() => COLUMNS, [])

  const tableInstance = useTable({
    columns,
    data
  }, useGlobalFilter)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter } = state

  return (
    <>
      <BookingFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        className='styled-table'
        {...getTableProps()}
      >
        <thead className='booking-title'>
          {
            headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map((column, index) => (
                    <th key={index} {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr
                  onClick={(() => {
                    getBookingInfo(row.original._id)
                  }
                )} key={i} {...row.getRowProps()}
                >
                  <td>{i + 1}</td>
                  <td>{row.values.hotelName}</td>
                  <td>{new Date(`${row.values.createdAt}`).toLocaleDateString('vi-VI')}</td>
                  <td>{row.values.checkinDate}</td>
                  <td>
                    <NumberFormat
                      thousandsGroupStyle='thousand'
                      value={row.values.totalPrice}
                      decimalSeparator='.'
                      displayType='text'
                      thousandSeparator
                      allowNegative
                      suffix=' VND'
                    />
                  </td>
                  <td className={row.values.checking ? 'text-gray-500' : 'text-red-400'}>
                    {row.values.checking ? 'Đã nhận phòng' : 'Chưa nhận phòng'}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}
