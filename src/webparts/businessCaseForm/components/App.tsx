import * as React from "react";
import styles from "./BusinessCaseForm.module.scss";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { useState, useEffect } from "react";

// Declarations
const pencilIcon = require("../../../ExternalRef/icons/edit@2x.png");
const fileEditIcon = require("../../../ExternalRef/icons/fileEdit.png");
const commentIcon = require("../../../ExternalRef/icons/commentIcon@2x.png");
const searchIcon = require("../../../ExternalRef/icons/searchIcon@2x.png");

interface IBusCas {
  BusCase: string;
  State: string;
  Department: string;
  ReviewForm: string;
  BusType: string;
  summary: string;
  DateSlot: string;
  StartDate: Date | string;
  EndDate: Date | string;
  Amount: Number;
  Employee: string[];
  Attachments: any;
  Assignee?: any;
  submissionDate?: any;
}

interface IDrop {
  key: null;
  text: string;
  type?: string;
  typeId?: null;
}

let addDatas: IBusCas = {
  BusCase: "",
  State: "",
  Department: "",
  ReviewForm: "",
  BusType: "",
  summary: "",
  DateSlot: "",
  StartDate: null,
  EndDate: null,
  Amount: null,
  Employee: [],
  Attachments: [],
};

let errValidation: IBusCas = {
  BusCase: "",
  State: "",
  Department: "",
  ReviewForm: "",
  BusType: "",
  summary: "",
  DateSlot: "",
  StartDate: null,
  EndDate: null,
  Amount: null,
  Employee: [],
  Attachments: "",
  Assignee: "",
  submissionDate: null,
};

let arrDepart: IDrop[];
let arrReview: IDrop[];
let arrType: IDrop[];
let modArrType: IDrop[];
let arrDateSlot: IDrop[];
let arrChoice: IDrop[];
let peopleId: any[];
let curUserName: string;
let curDate: Date | string;
let arrAttachments: any[];
let locFileArray = [];
let RequestorArr: string[];
let RequestorIdArr: any[];

export const App = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDatas, setFormDatas] = useState<IBusCas>(addDatas);
  const [peopleData, setPeopleData] = useState(peopleId);
  const [formError, setFormError] = useState<IBusCas>(errValidation);

  // files get the folder
  const getFiles = (e) => {
    arrAttachments = e.target.files;
    for (let i = 0; i < arrAttachments.length; i++) {
      locFileArray.push({
        name: arrAttachments[i].name,
        content: arrAttachments[i],
        Index: i,
      });
    }
    formDatas.Attachments = locFileArray;
    setFormDatas({ ...formDatas });
  };

  // files remove the array
  const fileDelete = (index) => {
    locFileArray.splice(index, 1);
    locFileArray = locFileArray.map((row, i) => {
      return {
        name: row.name,
        content: row.content,
        Index: i,
      };
    });
    formDatas.Attachments = locFileArray;
    setFormDatas({ ...formDatas });
  };

  // get current user details
  const getCurUser = () => {
    props.sp.web
      .currentUser()
      .then((res) => {
        curUserName = "";
        curUserName = res.Email;
        getCurDate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get current date formate
  const getCurDate = () => {
    let curMonth = new Date().getMonth() + 1;
    curDate = `${new Date().getFullYear()}-${
      curMonth < 10 ? "0" + curMonth : new Date().getMonth() + 1
    }-${
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()
    }`;
  };

  // get by master list datas
  const getMasterListData = async () => {
    // get by state choice datas
    await props.sp.web.lists
      .getByTitle("Business cases")
      .fields.getByInternalNameOrTitle("CPCState")
      .get()
      .then(async (response: any) => {
        let arrState = [];
        response.Choices.forEach((choice: string) => {
          if (choice) {
            arrState.push({
              key: choice,
              text: choice,
            });
          }
        });
        arrChoice = arrState;
        // get by departments datas
        await props.sp.web.lists
          .getByTitle("Departments")
          .items.top(4000)
          .get()
          .then(async (data: any) => {
            arrDepart = data.map((val: any) => {
              return {
                key: val.ID,
                text: val.Title,
              };
            });
            // get by review form datas
            await props.sp.web.lists
              .getByTitle("Review forms")
              .items.top(4000)
              .get()
              .then(async (row: any) => {
                arrReview = row.map((val: any) => {
                  return {
                    key: val.ID,
                    text: val.Title,
                  };
                });
                // get by busness case type datas
                await props.sp.web.lists
                  .getByTitle("Business case types")
                  .items.select("*, ReviewType/Title, ReviewType/Id")
                  .expand("ReviewType")
                  .top(4000)
                  .get()
                  .then(async (res: any) => {
                    arrType = res.map((row: any) => {
                      return {
                        key: row.ID,
                        text: row.Title,
                        type: row.ReviewType.Title,
                        typeId: row.ReviewType.Id,
                      };
                    });
                    // get by cpc date slot datas
                    await props.sp.web.lists
                      .getByTitle("CPC Date slots")
                      .items.top(4000)
                      .get()
                      .then((response: any) => {
                        arrDateSlot = response.map((value: any) => {
                          let date =
                            new Date(value.CPCStartDate).getMonth() + 1;
                          return {
                            key: value.ID,
                            text: `${
                              new Date(value.CPCStartDate).getDate() < 10
                                ? "0" + new Date(value.CPCStartDate).getDate()
                                : new Date(value.CPCStartDate).getDate()
                            }/${
                              new Date(value.CPCStartDate).getMonth() + 1 < 10
                                ? "0" + date
                                : new Date(value.CPCStartDate).getMonth() + 1
                            }/${new Date(value.CPCStartDate).getFullYear()}`,
                          };
                        });
                      })
                      .catch((err: any) => {
                        console.log(err);
                      });
                  })
                  .catch((err: any) => {
                    console.log(err);
                  });
              })
              .catch((err: any) => {
                console.log(err);
              });
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // get validation function
  const getvalidation = () => {
    let error = {
      BusCase: "",
      State: "",
      Department: "",
      ReviewForm: "",
      BusType: "",
      summary: "",
      DateSlot: "",
      StartDate: null,
      EndDate: null,
      Amount: null,
      Employee: [],
      Attachments: "",
      Assignee: "",
      submissionDate: null,
    };
    if (!formDatas.BusCase) {
      error.BusCase = "Please set Business Case Name";
      setFormError({ ...error });
    } else if (!formDatas.Department) {
      error.Department = "Please select Department";
      setFormError({ ...error });
    } else if (!formDatas.ReviewForm) {
      error.ReviewForm = "Please select Review form";
      setFormError({ ...error });
    } else if (!curUserName) {
      error.Assignee = "Please set Assignee";
      setFormError({ ...error });
    } else if (!formDatas.BusType) {
      error.BusType = "Please select Business case type";
      setFormError({ ...error });
    } else if (!formDatas.summary) {
      error.summary = "Please set Business case summary";
      setFormError({ ...error });
    } else if (!curDate) {
      error.submissionDate = "Please set submission date";
      setFormError({ ...error });
    } else if (!formDatas.DateSlot) {
      error.DateSlot = "Please select CPC Date";
      setFormError({ ...error });
    } else if (formDatas.Attachments.length == 0) {
      error.Attachments = "Please select Attachments files";
      setFormError({ ...error });
    } else {
      getAddDatas();
    }
  };

  // function of Add Data
  const getAddDatas = async () => {
    await props.sp.web.lists
      .getByTitle("Business cases")
      .items.add({
        Title: formDatas.BusCase,
        CPCState: formDatas.State,
        CPCDepartmentId: formDatas.Department,
        CPCReviewFormId: formDatas.ReviewForm,
        CPCTypeId: formDatas.BusType,
        CPCSummary: formDatas.summary,
        CPCDateId: formDatas.DateSlot,
        CPCStartDate: formDatas.StartDate,
        CPCEndDate: formDatas.EndDate,
        CPCAmount: formDatas.Amount,
        CPCEmployeeId: { results: peopleData },
      })
      .then((event: any) => {
        event.item.attachmentFiles.addMultiple(formDatas.Attachments);
        setFormDatas({
          BusCase: "",
          State: "",
          Department: "",
          ReviewForm: "",
          BusType: "",
          summary: "",
          DateSlot: "",
          StartDate: null,
          EndDate: null,
          Amount: null,
          Employee: [],
          Attachments: [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // life cycle running on onload
  useEffect(() => {
    // getCurUser();
    getCurDate();

    getMasterListData();
  }, []);

  return (
    <div className={`${styles.mainContainer} customForm`}>
      {/* first section */}
      <div className={styles.header}>
        <img src={`${pencilIcon}`} alt="" />
        <span>New Business Case Submission</span>
      </div>
      <div className={styles.formFirstPart}>
        <div style={{ display: "flex" }}>
          <div>
            <img
              src={`${fileEditIcon}`}
              style={{ height: "13px", width: "12px" }}
              alt=""
            />
          </div>
          <div style={{ width: "98%" }}>
            <div className={styles.formHeader} style={{ fontSize: "10px" }}>
              <div className={styles.headerContent}> General Instructions</div>
              <div className={styles.headerLine}> </div>
            </div>
          </div>
        </div>

        <div>
          {/* first row */}
          <div className={styles.formFlex} style={{ marginBottom: "30px" }}>
            {/* Business Case Name section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Business Case Name
              </InputLabel>
              <TextField
                placeholder="Insert Business Case Name"
                variant="outlined"
                className={styles.inputLG}
                type="text"
                value={formDatas.BusCase}
                onChange={(data) => {
                  formDatas.BusCase = data.target.value;
                  setFormDatas({ ...formDatas });
                }}
              />
              <div style={{ color: "red" }}>{formError.BusCase}</div>
            </div>

            {/* Status section */}
            <div
              className={`${styles.formContainer} borderInput`}
              style={{ width: "30%" }}
            >
              <InputLabel htmlFor="name">State</InputLabel>
              <TextField
                className={styles.inputsm}
                variant="outlined"
                type="text"
                disabled={true}
                // value={"Draft"}
              />
            </div>

            {/* Department section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Department
              </InputLabel>
              <Select
                variant="outlined"
                label="Select Department from list"
                className={styles.inputsm}
                style={{ height: "40px" }}
                value={formDatas.Department}
                onChange={(data) => {
                  formDatas.Department = data.target.value as null;
                  setFormDatas({ ...formDatas });
                }}
              >
                {arrDepart != undefined &&
                  arrDepart.map((row) => {
                    return <MenuItem value={row.key}>{row.text}</MenuItem>;
                  })}
              </Select>
              <div style={{ color: "red" }}>{formError.Department}</div>
            </div>
          </div>

          {/* second row */}
          <div className={styles.formFlex}>
            {/* Review form section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Review form
              </InputLabel>
              <Select
                variant="outlined"
                placeholder="Select Department from list"
                className={styles.inputsm}
                defaultValue={formDatas.ReviewForm}
                onChange={(data) => {
                  let selRevData: string;
                  selRevData = data.target.value as string;
                  modArrType = arrType.filter((row) => row.type == selRevData);
                  formDatas.ReviewForm = modArrType[0].typeId;
                  setFormDatas({ ...formDatas });
                }}
              >
                {arrReview != undefined &&
                  arrReview.map((row) => {
                    return <MenuItem value={row.text}>{row.text}</MenuItem>;
                  })}
              </Select>
              <div style={{ color: "red" }}>{formError.ReviewForm}</div>
            </div>

            {/* Assignee section */}
            <div
              className={`${styles.formContainer} assigneeInput`}
              style={{ width: "30%" }}
            >
              <InputLabel htmlFor="name">Assignee</InputLabel>
              <PeoplePicker
                // styles={{
                //   height: "40px",
                //   borderRadius: "4px",
                //   outline: "none",
                //   border: "1px solid",
                // }}
                context={props.context}
                placeholder={`Insert employee person`}
                personSelectionLimit={1}
                showtooltip={true}
                ensureUser={true}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
                defaultSelectedUsers={[curUserName]}
                required={true}
              />
              <div style={{ color: "red" }}>{formError.Assignee}</div>
            </div>

            {/* Employee section */}
            <div
              className={`${styles.formContainer} employeeInput`}
              style={{ width: "30%" }}
            >
              <InputLabel htmlFor="name"> Employee</InputLabel>
              <PeoplePicker
                context={props.context}
                placeholder={`Insert employee person`}
                personSelectionLimit={10}
                showtooltip={true}
                ensureUser={true}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
                onChange={(data) => {
                  RequestorArr = [];
                  RequestorIdArr = [];
                  data.length > 0
                    ? (data.forEach((row) => {
                        RequestorArr.push(row.secondaryText);
                        RequestorIdArr.push(row.id);
                      }),
                      setPeopleData(RequestorIdArr))
                    : setPeopleData(RequestorIdArr);
                  formDatas.Employee = data.length > 0 ? RequestorArr : [];
                  setFormDatas({ ...formDatas });
                }}
                defaultSelectedUsers={formDatas.Employee}
                required={true}
              />
            </div>
            {/* 
                        <div className={styles.formContainer} style={{ width: "25%" }}>
                          <InputLabel htmlFor="name">Delegate Person</InputLabel>
                          <Select
                            variant="outlined"
                            placeholder="Select Department from list"
                            // className={styles.inputmd}
                            className={styles.inputsm}
                            style={{ height: "56px" }}
                          ></Select>
                        </div> */}
            {/* <div
                          className={styles.formContainer}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <button className={styles.primaryBtn}>delegate</button>
                        </div> */}
          </div>
        </div>
      </div>

      {/* Details Instructions section */}
      <div className={styles.formFirstPart}>
        <div style={{display:'flex'}}>
          <img
            src={`${searchIcon}`}
            style={{ height: "15px", width: "15px" }}
            alt=""
          />
        <div style={{ width: "98%" }}>
          <div className={styles.formHeader} style={{ fontSize: "10px" }}>
            <div className={styles.headerContent}> Details Instructions</div>
            <div className={styles.headerLine}> </div>
          </div>
        </div>
        </div>
        <div>
          {/* first row */}
          <div className={styles.formFlex} style={{ marginBottom: "30px" }}>
            {/* Business case type section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Business case type
              </InputLabel>
              <Select
                variant="outlined"
                placeholder="Select Department from list"
                className={styles.inputsm}
                value={formDatas.BusType}
                onChange={(data) => {
                  formDatas.BusType = data.target.value as null;
                  setFormDatas({ ...formDatas });
                }}
              >
                {modArrType != undefined &&
                  modArrType.map((row) => {
                    return <MenuItem value={row.key}>{row.text}</MenuItem>;
                  })}
              </Select>
              <div style={{ color: "red" }}>{formError.BusType}</div>
            </div>

            {/* Business case summary section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Business case summary
              </InputLabel>
              <TextField
                className={styles.inputLG}
                variant="outlined"
                type="text"
                multiline
                value={formDatas.summary}
                onChange={(data) => {
                  formDatas.summary = data.target.value;
                  setFormDatas({ ...formDatas });
                }}
              />
              <div style={{ color: "red" }}>{formError.summary}</div>
            </div>

            {/* Date sections */}
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* start date section */}
              <div className={styles.formContainer} style={{ width: "48%" }}>
                <InputLabel htmlFor="name">Start date</InputLabel>
                <TextField
                  variant="outlined"
                  id="datetime-local"
                  type="date"
                  placeholder="00/00/0000"
                  className={styles.inputsm2}
                  defaultValue={
                    formDatas.StartDate ? formDatas.StartDate : null
                  }
                  onChange={(data) => {
                    let selStartDate: Date | string;
                    selStartDate = new Date(data.target.value);
                    formDatas.StartDate = selStartDate.toISOString();
                    setFormDatas({ ...formDatas });
                  }}
                />
              </div>

              {/* end date section */}
              <div className={styles.formContainer} style={{ width: "48%" }}>
                <InputLabel htmlFor="datetime-local">End date</InputLabel>
                <TextField
                  variant="outlined"
                  id="datetime-local"
                  type="date"
                  className={styles.inputsm2}
                  defaultValue={formDatas.EndDate ? formDatas.EndDate : null}
                  onChange={(data) => {
                    let selEndDate: Date | string;
                    selEndDate = new Date(data.target.value);
                    formDatas.EndDate = selEndDate.toISOString();
                    setFormDatas({ ...formDatas });
                  }}
                />
              </div>
            </div>
          </div>

          {/* second row */}
          <div className={styles.formFlex}>
            {/* Amount section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Amount
              </InputLabel>
              <TextField
                variant="outlined"
                className={styles.currencySymbolLg}
                placeholder="0000,00"
                type="number"
                value={formDatas.Amount}
                onChange={(data) => {
                  formDatas.Amount = +data.target.value;
                  setFormDatas({ ...formDatas });
                }}
              />
            </div>

            {/* Submission date section */}
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={`${styles.formContainer} borderInput`}
                style={{ width: "48%" }}
              >
                <InputLabel htmlFor="name" required>
                  Submission date
                </InputLabel>
                <TextField
                  variant="outlined"
                  id="datetime-local"
                  type="date"
                  className={styles.inputsm2}
                  value={curDate}
                />
                <div style={{ color: "red" }}>{formError.submissionDate}</div>
              </div>

              {/* CPC date section */}
              <div className={styles.formContainer} style={{ width: "48%" }}>
                <InputLabel htmlFor="name" required>
                  CPC date
                </InputLabel>
                <Select
                  variant="outlined"
                  className={styles.inputsm2}
                  value={formDatas.DateSlot}
                  onChange={(data) => {
                    formDatas.DateSlot = data.target.value as null;
                    setFormDatas({ ...formDatas });
                  }}
                >
                  {arrType != undefined &&
                    arrDateSlot.map((row) => {
                      return <MenuItem value={row.key}>{row.text}</MenuItem>;
                    })}
                </Select>
                <div style={{ color: "red" }}>{formError.DateSlot}</div>
              </div>
            </div>

            {/* Attachments section */}
            <div className={styles.formContainer} style={{ width: "30%" }}>
              <InputLabel htmlFor="name" required>
                Attachments
              </InputLabel>
              <div className={styles.customUpload}>
                <TextField
                  onChange={(e) => getFiles(e)}
                  type="file"
                  style={{ marginRight: "20px", display: "none" }}
                  className={styles.inputsm}
                  inputProps={{
                    multiple: true,
                  }}
                  id="customUpload"
                />
                <label htmlFor="customUpload">Select file to upload</label>
              </div>
              <div style={{ color: "red" }}>{formError.Attachments}</div>
              <div className={styles.selectedFiles}>
                {locFileArray != undefined &&
                  formDatas.Attachments.map((row: any) => {
                    return (
                      <div className={styles.fileInfo}>
                        <IconButton>
                          <ClearIcon
                            onClick={() => fileDelete(row.Index)}
                            style={{ cursor: "pointer", color: "#01357a" }}
                          />
                        </IconButton>
                        <div className={styles.fileName}>{row.name}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* comments section */}
      <div className={styles.formFirstPart}>
      <div style={{display:'flex'}}>
          <img
            src={`${commentIcon}`}
            style={{ height: "15px", width: "15px" }}
            alt=""
          />
        <div style={{ width: "98%" }}>
          <div className={styles.formHeader} style={{ fontSize: "10px" }}>
            <div className={styles.headerContent}>Comments</div>
            <div className={styles.headerLine}> </div>
          </div>
        </div>
        </div>
          </div>
      <p className={styles.messageText}>Nothing message here</p>

      {/* footerButton */}
      <div className={styles.footer}>
        <div className={styles.btnFlex}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIosIcon style={{ fontSize: "12px" }} />}
            style={{
              backgroundColor: "white",
              padding: "15px 40px",
              fontSize: "18px !important",
              height: "25px",
              width: "110px",
              textTransform: "capitalize",
              fontWeight: "700",
            }}
          >
            Back
          </Button>
          <div>
            <Button
              variant="contained"
              style={{
                marginRight: "20px",
                backgroundColor: "white",
                padding: "8px 25px",
              }}
            >
              Save As A Draft
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#de1b7c",
                color: "white",
                height: "25px",
                width: "110px",
                padding: "15px 35px",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
{
  /* <div className={styles.navigator}>
        <a>
          Homepage <span>{`>`}</span> Business Case List
        </a>
      </div> */
}
