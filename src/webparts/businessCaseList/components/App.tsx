import * as React from "react";
import styles from "./BusinessCaseList.module.scss";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useState, useEffect } from "react";
import * as moment from "moment";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence,
} from "office-ui-fabric-react/lib/Persona";

// Declarations
const TextIcon = require("../../../ExternalRef/icons/Textbox@2x.png");
const sortIcon = require("../../../ExternalRef/icons/sortIcon.png");
const bellIcon = require("../../../ExternalRef/icons/bell@2x.png");
const successIcon = require("../../../ExternalRef/icons/SuccessIcon@2x.png");
const failureIcon = require("../../../ExternalRef/icons/failureIcon@2x.png");
const textIcon = require("../../../ExternalRef/icons/DocIcon@2x.png");
const peopleIcon = require("../../../ExternalRef/icons/PeopleIcon@2x.png");
const searchIcon = require('../../../ExternalRef/icons/searchIcon.png');
const displayIcon = require("../../../ExternalRef/icons/DisplayIcon@2x.png");
const menImage = require("../../../ExternalRef/images/menImg.jpg");
const businessMenImage = require("../../../ExternalRef/images/menImg2.jpg");
const businessWomenImage = require("../../../ExternalRef/images/womenImg2.jpg");
const womenImage = require("../../../ExternalRef/images/womenImg.jpg");

interface IBusiness {
  ID: Number | string;
  RequestState: string;
  BusinessCase: string;
  subDate: Date | string;
  CPCDate: Date | string;
  Attachments?: any;
  ReviewForm?: string;
  Assignee?: any;
  Employees?: any;
}

let arrMasDatas: IBusiness[];
let arrBusData: IBusiness[];
let arrEmploy: any = [];
let arrAttach: any = [];
let arrMaster: any = [];

let objSorted: IBusiness = {
  ID: "",
  RequestState: "",
  BusinessCase: "",
  subDate: "",
  CPCDate: "",
};

let arrFilterDatas: IBusiness[];

export const App = (props) => {
  const [arrMasterDatas, setArrMasterDatas] =
  useState<IBusiness[]>(arrMasDatas);

function createData(id, status, businessName, subDate, CpcDate, mins, form) {
  return { id, status, businessName, subDate, CpcDate, mins, form };
}

const row = [
  createData(
    101,
    "yes",
    "Name Business Name",
    "12/02/2022",
    "22/09/2022",
    "docs",
    "people"
  ),
  createData(
    101,
    "No",
    "Name Business Name",
    "12/02/2022",
    "22/09/2022",
    "docs",
    "display"
  ),
  createData(
    101,
    "No",
    "Name Business Name",
    "12/02/2022",
    "22/09/2022",
    "docs",
    "display"
  ),
  createData(
    101,
    "No",
    "Name Business Name",
    "12/02/2022",
    "22/09/2022",
    "docs",
    "display"
  ),
  createData(
    101,
    "No",
    "Name Business Name",
    "12/02/2022",
    "22/09/2022",
    "docs",
    "display"
  ),
];

// get On Change values
const getOnChange = (value) => {
  arrFilterDatas = [];
  let data = value.toLowerCase();
  console.log(data);
  arrFilterDatas = arrMasterDatas.filter((item) => {
    let loc =   item.Employees.filter((eData) => {
      return eData.toLowerCase().startsWith(data);
    })
    return (
      item.ID.toString().startsWith(data) ||
      item.RequestState.toLowerCase().startsWith(data) ||
      item.BusinessCase.toLowerCase().startsWith(data) ||
      item.subDate.toString().startsWith(data) ||
      item.CPCDate.toString().startsWith(data) ||
      item.ReviewForm.toLowerCase().startsWith(data) ||
      loc.length > 0
    );
  });
  setArrMasterDatas(arrFilterDatas);
};

// get the Business case datas
const getBusCaseDatas = async () => {
  await props.sp.web.lists
    .getByTitle("Business cases")
    .items.select(
      "*, CPCDate/CPCStartDate, CPCReviewForm/Title, CPCEmployee/EMail, Author/EMail"
    )
    .expand("CPCDate, CPCReviewForm, CPCEmployee, Author")
    .top(4000)
    .get()
    .then((res) => {
      arrBusData = res.map((row) => {
        arrEmploy = row.CPCEmployee.map((data) => {
          return data.EMail.toLowerCase();
        });
        let submissionDate = moment(row.Created).format("MM/DD/YY");
        let CPCDate = moment(row.CPCDate.CPCStartDate).format("MM/DD/YY");
        return {
          ID: row.ID,
          RequestState: row.CPCState,
          BusinessCase: row.Title,
          subDate: submissionDate,
          CPCDate: CPCDate,
          ReviewForm: row.CPCReviewForm.Title,
          Assignee: row.Author.EMail.toLowerCase(),
          Employees: arrEmploy,
        };
      });
    })
    .then(() => {
      arrBusData.forEach(async (row) => {
        await props.sp.web.lists
          .getByTitle("Business cases")
          .items.getById(row.ID)
          .attachmentFiles()
          .then(async (val) => {
            await arrAttach.push({ ID: row.ID, file: val });
            if (arrBusData.length == arrAttach.length) {
              arrMaster = arrBusData.map((e) => {
                return {
                  ID: e.ID,
                  RequestState: e.RequestState,
                  BusinessCase: e.BusinessCase,
                  subDate: e.subDate,
                  CPCDate: e.CPCDate,
                  Attachments: arrAttach.filter((data) => data.ID == e.ID)[0]
                    .file,
                  ReviewForm: e.ReviewForm.toLowerCase(),
                  Assignee: e.Assignee,
                  Employees: e.Employees,
                };
              });
              setArrMasterDatas(arrMaster);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// life cycle of onload
useEffect(() => {
  getBusCaseDatas();
}, []);

  return (
    <div className={styles.mainContainer}>
      {/* Header section */}
      {/* left side */}
      <div className={styles.headerFlex}>
        <div className={styles.header}>
          <img src={`${TextIcon}`} alt="" />
          <span>Business Case List</span>
        </div>

        {/* right side */}
        <div style={{display:'flex'}}>
          <div style={{marginRight:'20px'}}>
          <TextField
            variant="outlined"
            type="text"
            placeholder="Search Contents"
            className={`${styles.searchBox} formCustomStyles`}
            style={{borderRadius:'20px'}}
            onChange={(e) => {
              getOnChange(e.target.value);
            }}
          />
          <img src={`${searchIcon}`} className={styles.searchIcon}/>
          </div>
          <button className={styles.bellContainer}>
            <img alt="" src={`${bellIcon}`}></img>
          </button>
        </div>
      </div>

      {/* filter section */}
      {/* <div className={styles.selectBox}>
<Select variant='outlined' className={styles.selectBoxOne}>
  <MenuItem value={'One'}>Sample 1</MenuItem>
  <MenuItem value={'Two'}>Sample 2</MenuItem>
</Select>
<Select variant='outlined' className={styles.selectBoxOne}>
<MenuItem value={'Three'}>Sample 3</MenuItem>
  <MenuItem value={'Two'}>Sample 4</MenuItem>
</Select>
</div> */}

      {/* Table creation */}
      <div>
        <Table style={{ marginTop: "20px" }}>
             {/* Table Header */}
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell style={{ minWidth: 100 }} align="center"
              onClick={() => {
                objSorted.ID == "ascending" || objSorted.ID == ""
                  ? (objSorted = {
                      ID: "descending",
                      RequestState: "",
                      BusinessCase: "",
                      subDate: "",
                      CPCDate: "",
                    })
                  : (objSorted = {
                      ID: "ascending",
                      RequestState: "",
                      BusinessCase: "",
                      subDate: "",
                      CPCDate: "",
                    });
                setArrMasterDatas([
                  ...arrMasterDatas.sort((a: any, b: any) =>
                    objSorted.ID == "ascending" || objSorted.ID == ""
                      ? b.ID - a.ID
                      : a.ID - b.ID
                  ),
                ]);
              }}
              >
                <div style={{ display: "inline-table" }}>
                  ID
                  <img
                    src={`${sortIcon}`}
                    style={{ width: "6px", height: "10px", marginLeft: "3px" }}
                  />
                </div>
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align="center"
              onClick={() => {
                objSorted.RequestState == "ascending" ||
                objSorted.RequestState == ""
                  ? (objSorted = {
                      ID: "",
                      RequestState: "descending",
                      BusinessCase: "",
                      subDate: "",
                      CPCDate: "",
                    })
                  : (objSorted = {
                      ID: "",
                      RequestState: "ascending",
                      BusinessCase: "",
                      subDate: "",
                      CPCDate: "",
                    });
                setArrMasterDatas([
                  ...arrMasterDatas.sort((a: any, b: any) =>
                    objSorted.RequestState == "ascending" ||
                    objSorted.RequestState == ""
                      ? b.RequestState.toLowerCase().localeCompare(
                          a.RequestState.toLowerCase()
                        )
                      : a.RequestState.toLowerCase().localeCompare(
                          b.RequestState.toLowerCase()
                        )
                  ),
                ]);
              }}
              >
                <div style={{ display: "inline-table" }}>
                  Request State
                  <img
                    src={`${sortIcon}`}
                    style={{ width: "6px", height: "10px", marginLeft: "3px" }}
                  />
                </div>
              </TableCell>
              <TableCell style={{ minWidth: 100 }} 
               onClick={() => {
                objSorted.BusinessCase == "ascending" ||
                objSorted.BusinessCase == ""
                  ? (objSorted = {
                      ID: "",
                      RequestState: "",
                      BusinessCase: "descending",
                      subDate: "",
                      CPCDate: "",
                    })
                  : (objSorted = {
                      ID: "",
                      RequestState: "",
                      BusinessCase: "ascending",
                      subDate: "",
                      CPCDate: "",
                    });
                setArrMasterDatas([
                  ...arrMasterDatas.sort((a: any, b: any) =>
                    objSorted.BusinessCase == "ascending" ||
                    objSorted.BusinessCase == ""
                      ? b.BusinessCase.toLowerCase().localeCompare(
                          a.BusinessCase.toLowerCase()
                        )
                      : a.BusinessCase.toLowerCase().localeCompare(
                          b.BusinessCase.toLowerCase()
                        )
                  ),
                ]);
              }}>
                <div style={{ display: "inline-table" }}>
                  Name Business Case
                  <img
                    src={`${sortIcon}`}
                    style={{ width: "6px", height: "10px", marginLeft: "3px" }}
                  />
                </div>
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align="right"
               onClick={() => {
                objSorted.subDate == "ascending" || objSorted.subDate == ""
                  ? (objSorted = {
                      ID: "",
                      RequestState: "",
                      BusinessCase: "",
                      subDate: "descending",
                      CPCDate: "",
                    })
                  : (objSorted = {
                      ID: "",
                      RequestState: "",
                      BusinessCase: "",
                      subDate: "ascending",
                      CPCDate: "",
                    });
                setArrMasterDatas([
                  ...arrMasterDatas.sort((a: any, b: any) =>
                    objSorted.subDate == "ascending" ||
                    objSorted.subDate == ""
                      ? Date.parse(a.subDate) - Date.parse(b.subDate)
                      : Date.parse(b.subDate) - Date.parse(a.subDate)
                  ),
                ]);
              }}
              >
                <div style={{ display: "inline-table" }}>
                  Submission date
                  <img
                    src={`${sortIcon}`}
                    style={{ width: "6px", height: "10px", marginLeft: "3px" }}
                  />
                </div>
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align="center" 
               onClick={() => {
                objSorted.CPCDate == "ascending" || objSorted.CPCDate == ""
                  ? (objSorted = {
                      ID: "",
                      RequestState: "",
                      BusinessCase: "",
                      subDate: "",
                      CPCDate: "descending",
                    })
                  : (objSorted = {
                      ID: "",
                      RequestState: "",
                      BusinessCase: "",
                      subDate: "",
                      CPCDate: "ascending",
                    });
                setArrMasterDatas([
                  ...arrMasterDatas.sort((a: any, b: any) =>
                    objSorted.CPCDate == "ascending" ||
                    objSorted.CPCDate == ""
                      ? Date.parse(a.CPCDate) - Date.parse(b.CPCDate)
                      : Date.parse(b.CPCDate) - Date.parse(a.CPCDate)
                  ),
                ]);
              }}
              >
                <div style={{ display: "inline-table" }}>
                  CPC date
                  <img
                    src={`${sortIcon}`}
                    style={{ width: "6px", height: "10px", marginLeft: "3px" }}
                  />
                </div>
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align="center">
                Attachments
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align="center">
                Review Form
              </TableCell>
              <TableCell style={{ minWidth: 100 }} align="center">
                Requestor
              </TableCell>
              <TableCell style={{ minWidth: 100 }}>Assignee</TableCell>
            </TableRow>
          </TableHead>

          {/* table body */}
<TableBody className={`${'listTable'}`}>
            {arrMasterDatas != undefined
              ? arrMasterDatas.map((value) => {
                  return (
                    <TableRow>
                      <TableCell
                        style={{ minWidth: 100, fontSize: "20px" }}
                        align="center"
                      >
                        {" "}
                        {value.ID}{" "}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 100 }}>
                        {value.RequestState ? (
                          <img
                            src={`${successIcon}`}
                            alt=""
                            style={{ height: "24px", width: "24px" }}
                          />
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {" "}
                        {value.BusinessCase}{" "}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }} align="right">
                        {" "}
                        {value.subDate}{" "}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }} align="center">
                        {" "}
                        {value.CPCDate}{" "}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }} align="center">
                        {value.Attachments.length > 0 ? (
                          <img
                            src={`${textIcon}`}
                            style={{ height: "18px", width: "13px" }}
                          />
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }} align="center">
                        {value.ReviewForm == "face to face/zoom" ? (
                          <img
                            src={`${peopleIcon}`}
                            style={{ height: "18px", width: "27px" }}
                          />
                        ) : (
                          <img
                            src={`${displayIcon}`}
                            alt=""
                            style={{ height: "24px", width: "24px" }}
                          />
                        )}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }} align="center" className={`${'reviewerImg'}`}>
                        <Persona
                          styles={{
                            root: {
                              width: 50,
                              margin: "auto",
                            },
                          }}
                          imageUrl={
                            "/_layouts/15/userphoto.aspx?size=S&username=" +
                            value.Assignee
                          }
                          size={PersonaSize.size72}
                        />
                      </TableCell>
                      <div style={{position:'relative'}}>
                      <TableCell style={{ minWidth: 100 }} className={`${`assignee`}`}>
                        {value.Employees.length > 0
                          ? value.Employees.map((profile) => {
                              return (
                      
                                <Persona
                                  styles={{
                                    root: {
                                      width: 50,
                                      margin: "auto",
                                    },
                                  }}
                                  imageUrl={
                                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                                    profile
                                  }
                                  size={PersonaSize.size72}
                                />
                              );
                            })
                          : ""}
                      </TableCell>
                      </div>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </div>

      {/* page footer */}
      <div className={styles.footerContainer}>
        <div className={styles.footerFlex}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIosIcon style={{ fontSize: "12px" }} />}
            style={{
              backgroundColor: "white",
              padding: "5px 40px",
              fontSize: "18px !important",
              textTransform: "capitalize",
              fontWeight: "700",
            }}
          >
            Back
          </Button>

          <div style={{ display: "flex" }}>
            <button
              style={{
                display: "flex",
                backgroundColor: "white",
                borderRadius: "20px",
                border: "none",
                boxShadow:
                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                padding: "9px 35px",
                fontWeight: "500",
                textTransform: "capitalize",
                marginRight: "20px",
              }}
            >
              <img
                src={require("../../../ExternalRef/icons/InboxArrow Up@2x.png")}
                alt=""
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Export File
            </button>

            <Button
              variant="contained"
              style={{
                padding: "5px 25px",
                textTransform: "capitalize",
                background:
                  "linear-gradient(273.66deg, #0557A6 2.62%, #05B0E9 96.99%)",
                color: "white",
                // height: "25px",
                // width: "110px",
                // fontSize: "8px !important",
              }}
              startIcon={
                <AddIcon
                  style={{ margin: "0px !important", fontSize: "12px !important" }}
                />
              }
            >
              {" "}
              Business Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
