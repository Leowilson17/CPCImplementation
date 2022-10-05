import * as React from 'react';
import styles from './StorageList.module.scss';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

// import FolderIcon from '@material-ui/icons/Folder';


// Declarations
const docIcon = require('../../../ExternalRef/icons/RaggruppaText@2x.png');


// Variables
const col = [{
    name:'Archive'
},
{
    name:'Template'
}]

const data = [
  {
  fileName:"Template Document_1.ppt",
  modified:"Loremipsum.its.@jnj.com",
  modifiedBy:"Loremipsum.its.@jnj.com"
  },
  {
    fileName:"Template Document_2.ppt",
    modified:"Loremipsum.its.@jnj.com",
    modifiedBy:"Loremipsum.its.@jnj.com"
    },
    {
      fileName:"Template Document_1.ppt",
      modified:"Loremipsum.its.@jnj.com",
      modifiedBy:"Loremipsum.its.@jnj.com"
      },
]



const App = (props) => {

    return(
<div>
<div className={styles.header}>
        <img src={`${docIcon}`} alt="" />
        <span>Storage</span>
      </div>

      {/* Table creation */}
      <Table className={`${'customTable'}`}>
          <TableHead>
            <TableRow>
              <TableCell  style={{minWidth:100,fontWeight:600,color:'#63666A',borderBottom:'none'}}>
                <div style={{display:'flex'}}>
                <InsertDriveFileOutlinedIcon style={{width:'9px',height:'13px'}} /> Name <ExpandMoreIcon />
                </div>
              </TableCell>

               <TableCell style={{minWidth:100,fontWeight:600,color:'#63666A',borderBottom:'none'}}>
                {" "}
                <div style={{display:'flex'}}>
                Modified <ExpandMoreIcon />
                </div>
              </TableCell> 

              <TableCell style={{minWidth:100,fontWeight:600,color:'#63666A',borderBottom:'none'}}>
                 {" "}
                <div style={{display:'flex'}}>
                 Modified By
                 <ExpandMoreIcon/>
                 </div>
               </TableCell>  
            </TableRow>
          </TableHead>


          {/* table body */}

          <TableBody>
            {col.map((data) => {
                return(
                    <TableRow >
                    <TableCell  style={{fontSize:'14px',minWidth:100}}>  {/* <FolderIcon style={{color:'#F89406'}}/> */}
                    {data.name}</TableCell>
                    </TableRow>
                  
                )
            })}
           
            
          </TableBody>
          </Table>



          {/* charter list design */}
          <Table className={`${'customTableCharterList'}`} style={{margin:'20px 0px'}}>
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
            {data.map((value) => (
              <TableRow key={value.fileName}>
                <TableCell  className={`${'tableCell'}`} style={{minWidth:200,fontSize:'14px',fontWeight:'500',color:'#63666A',borderBottom:'none',textDecoration:'underline'}}>
                    {/* <PictureAsPdfIcon style = {{color:'red'}}/> */}
                    {value.fileName}</TableCell>
                <TableCell style={{minWidth:200,fontSize:'14px',fontWeight:'500',color:'#63666A',borderBottom:'none'}}>{value.modified}</TableCell>
                <TableCell style={{minWidth:200,fontSize:'14px',fontWeight:'500',color:'#63666A',borderBottom:'none'}}>{value.modifiedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

</div>

    )
}
export default App;