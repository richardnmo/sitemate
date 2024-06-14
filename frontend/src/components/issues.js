import * as React from "react";
import Table from "react-bootstrap/Table";
// import PerformanceRow from "./PerformanceRow";

// layer 1= overview: portfolio name
// layer 2 = stocks: code,name, buyprice, current price, change %, units, value, pro/loss

const IssuesTable = ({ issues }) => {
  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    // const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    setSelected(newSelected);
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Issue</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {this.issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.id}</td>
            <td>{issue.name}</td>
            <td>{issue.desc}</td>
          </tr>
        ))}
      </tbody>
    </Table>

    // <TableContainer component={Paper}>
    //   <Table aria-label="collapsible table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell />
    //         <TableCell />
    //         <TableCell align="left" style={{ fontWeight: "bold" }}>
    //           Portfolio Name
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {portfolios &&
    //         portfolios.map((info) => {
    //           const isItemSelected = isSelected(info.pid);
    //           return (
    //             <PerformanceRow
    //               key={info.name}
    //               pid={info.pid}
    //               rowName={info.name}
    //               stocks={info.stocks}
    //               isItemSelected={isItemSelected}
    //               handleClick={handleClick}
    //             />
    //           );
    //         })}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default IssuesTable;
