import * as React from "react";
import styles from "./CharterList.module.scss";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

// Declaration
const badgeIcon = require("../../../ExternalRef/icons/Raggruppa.png");

const App = (props) => {
  function createData(name, Modified, modifiedBy) {
    return { name, Modified, modifiedBy };
  }

  const row = [
    createData("Charter Document_1.ppt", "Loremipsum.its.@jnj.com", "Loremipsum.its.@jnj.co"),
    createData("Charter Document_2.ppt", "Loremipsum.its.@jnj.com", "Loremipsum.its.@jnj.com"),
    createData("Charter Document_3.ppt", "Loremipsum.its.@jnj.com", "Loremipsum.its.@jnj.com"),
  ];
  return (
    <div>
      <div className={styles.header}>
        <img src={`${badgeIcon}`} alt="" />
        <span>Charter</span>
      </div>

      {/* table creation */}
      <div>
        <Table className={`${'customTableCharterList'}`}>
          <TableHead>
            <TableRow>
              <TableCell style={{minWidth:200,fontWeight:600,color:'#63666A',borderBottom:'none'}}>
                <div style={{display:'flex'}}>
                <InsertDriveFileOutlinedIcon className={`${'fileImg'}`}/> Name <ExpandMoreIcon />
                </div>
              </TableCell>

              <TableCell style={{minWidth:200,fontWeight:600,color:'#63666A',borderBottom:'none'}}>
              <div style={{display:'flex'}}>
                Modified <ExpandMoreIcon />
                </div>
              </TableCell>

              <TableCell style={{minWidth:200,fontWeight:600,color:'#63666A',borderBottom:'none'}}>
                {" "}
                <div style={{display:'flex'}}>
                Modified By
                <ExpandMoreIcon />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* table body */}
          <TableBody>
            {row.map((value) => (
              <TableRow key={value.name}>
                <TableCell  className={`${'tableCell'}`} style={{minWidth:200,fontSize:'14px',fontWeight:'500',color:'#63666A',borderBottom:'none',textDecoration:'underline'}}>
                    {/* <PictureAsPdfIcon style = {{color:'red'}}/> */}
                    {value.name}</TableCell>
                <TableCell style={{minWidth:200,fontSize:'14px',fontWeight:'500',color:'#63666A',borderBottom:'none'}}>{value.Modified}</TableCell>
                <TableCell style={{minWidth:200,fontSize:'14px',fontWeight:'500',color:'#63666A',borderBottom:'none'}}>{value.Modified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default App;
