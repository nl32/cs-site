import { Params } from "next/dist/server/router";
import { useMemo } from "react";
import { useTable } from "react-table"
export default function Admin(props:Params){
/*   const columns = useMemo(
    () => [
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Author",
            accessor: "author"
        }
    ],[]
  )
  const tableInstance = useTable({ columns,})
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
 */
  return (
    <>
      <h1>guide management portal</h1>
      <p>Page for managing and editing posts</p>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
