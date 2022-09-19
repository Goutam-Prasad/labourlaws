import React, { useState } from "react";
import PtTaxForm from "./pttax/pttaxform";
import BonusPage from "./bonus/bonuspage";
import EsicPage from "./esic/esicpage";
import LwfPage from "./lwf/lwfPage";
import MinWagePage from "./minwage/minwagepage";
import axios from "axios";
import MinWageResult from "./minwage/minwageresult";
import PTResult from "./pttax/pttaxresult";
import EsicResultData from "./esic/esicresult";
import BonusResult from "./bonus/bonussResult";
import LwfResultData from "./lwf/lwfresult";
import { baseUrl } from "../../api/baseurl";

const MainForm = () => {
  const [ptpageshow, setptpageshow] = useState(false);
  const [showbonuspage, setshowbonuspage] = useState(false);
  const [showesicpage, setshowesicpage] = useState(false);
  const [showminwagepage, setshowminwagepage] = useState(false);
  const [showlwfpage, setshowlwfpage] = useState(false);
  const [WageResult, setWageResult] = useState(false); //object type
  const [BonusResultData, setBonusResultData] = useState(false);
  const [EsicResult, setEsicResult] = useState(false);
  const [PtResult, setPtResult] = useState(false);
  const [LwfResult, setLwfResult] = useState(false);
  const [requestData, setrequestData] = useState({});

  const clickHandler = (event) => {
    const name = event.target.name;
    try {
      if (name === "PtTax") {
        if (ptpageshow === false) {
          setptpageshow(true);
          setrequestData({ ...requestData, ptTax: {} });
        } else {
          if ("ptTax" in requestData) {
            // const updatedData=Object.assign({},requestData);
            const updatedData = { ...requestData };
            delete updatedData.ptTax;
            setrequestData(updatedData);
          }
          setptpageshow(false);
          setPtResult(false);
        }
      }

      if (name === "bonus") {
        if (showbonuspage === false) {
          setrequestData({ ...requestData, bonus: {} });
          setshowbonuspage(true);
        } else {
          if ("bonus" in requestData) {
            const updatedData = { ...requestData };
            delete updatedData.bonus;
            setrequestData(updatedData);
          }
          setBonusResultData(false);
          setshowbonuspage(false);
        }
      }

      if (name === "esic") {
        if (showesicpage === false) {
          setrequestData({ ...requestData, esic: {} });
          setshowesicpage(true);
        } else {
          if ("esic" in requestData) {
            const updatedData = { ...requestData };
            delete updatedData.esic;
            setrequestData(updatedData);
          }
          setshowesicpage(false);
          setEsicResult(false);
        }
      }

      if (name === "minwage") {
        if (showminwagepage === false) {
          setshowminwagepage(true);
          setrequestData({ ...requestData, minwage: {} });
        } else {
          if ("minawge" in requestData) {
            const updatedData = { ...requestData };
            delete updatedData.minwage;
            setrequestData(updatedData);
          }
          setshowminwagepage(false);
          setWageResult(false);
        }
      }

      if (name === "lwf") {
        if (showlwfpage === false) {
          setshowlwfpage(true);
          setrequestData({ ...requestData, lwf: {} });
        } else {
          if ("lwf" in requestData) {
            const updatedData = { ...requestData };
            delete updatedData.lwf;
            setrequestData(updatedData);
          }

          setshowlwfpage(false);
          setLwfResult(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Helpers to get result
  const getMinWageResult = async (statename, options) => {
    try {
      console.log("Statename,option", statename, options);
      const res = await axios.post(
        `${baseUrl}/minimumwage/${statename}/result`,
        { statename: statename, option: options }
      );
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getptTaxResult = async ({ state, gender, salaryType, salary }) => {
    try {
      const res = await axios.post(`${baseUrl}/ptinputs`, {
        state: state,
        gender: gender,
        salaryType: salaryType,
        salary: salary,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getLwfResult = async ({
    state,
    gross_salary,
    employment_class,
    employee_count,
  }) => {
    try {
      const res = await axios.post(`${baseUrl}/lwf/${state}`, {
        gross_salary: gross_salary,
        employment_class: employment_class,
        employee_count: employee_count,
        state: state,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const getBonusResult = async ({ basicSalary }) => {
    try {
      console.log("bonus salary", basicSalary);
      const res = await axios.post(`${baseUrl}/bonusinput/result`, {
        basicSalary: basicSalary,
      });

      console.log(res);
      return res.data.toString();
    } catch (error) {
      console.log(error);
    }
  };
  const getEsicResult = async ({ grossSalary }) => {
    try {
      console.log("bonus salary", grossSalary);
      const res = await axios.post(`${baseUrl}/esicinput/output`, {
        grossSalary: grossSalary,
      });

      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const resetHandler = () => {
    setptpageshow(false);
    setshowbonuspage(false);
    setshowesicpage(false);
    setshowlwfpage(false);
    setshowminwagepage(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(requestData);
    try {
      if (requestData.minwage) {
        console.log(requestData.minwage);

        // console.log(true);
        const options = { ...requestData.minwage };
        delete options.state;
        // console.log(options);

        const res = await getMinWageResult(requestData.minwage.state, options);
        // console.log("result in submit ", res.data);
        setWageResult(res.data);
      }
      if (requestData.bonus) {
        console.log(requestData.bonus);
        const res = await getBonusResult(requestData.bonus);
        console.log("Inside submit Handler", res);
        setBonusResultData(res.toString());
      }
      if (requestData.esic) {
        console.log(requestData.esic);
        const res = await getEsicResult(requestData.esic);
        console.log("Inside submit Handler", res);
        setEsicResult(res);
      }
      if (requestData.ptTax) {
        const res = await getptTaxResult(requestData.ptTax);
        console.log("pttax result", res);
        setPtResult(res);
      }
      if (requestData.lwf) {
        const res = await getLwfResult(requestData.lwf);
        setLwfResult(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      name="mainform"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ display: "flex", border: "7px solid black" }}>
        <input type="checkbox" name="PtTax" id="PtTax" onClick={clickHandler} />
        <label htmlFor="PtTax">PtTax</label>
        {ptpageshow && (
          <PtTaxForm
            setrequestData={setrequestData}
            requestData={requestData}
          />
        )}
        {ptpageshow && PtResult && <PTResult PtResult={PtResult} />}
      </div>
      {/**______________________________________________BONUSPAGE______________________________________ */}
      <div style={{ display: "flex", border: "7px solid black" }}>
        <input type="checkbox" name="bonus" id="bonus" onClick={clickHandler} />
        <label htmlFor="bonus">Bonus</label>
        {showbonuspage && (
          <BonusPage
            requestData={requestData}
            setrequestData={setrequestData}
          />
        )}
        {showbonuspage && BonusResultData && (
          <BonusResult BonusResultData={BonusResultData} />
        )}
      </div>

      {/**______________________________________________________________ESIC_________________________________________ */}
      <div style={{ display: "flex", border: "7px solid black" }}>
        <input type="checkbox" name="esic" id="esic" onClick={clickHandler} />
        <label htmlFor="esic">Esic</label>
        {showesicpage && (
          <EsicPage setrequestData={setrequestData} requestData={requestData} />
        )}
        {showesicpage && EsicResult && (
          <EsicResultData EsicResult={EsicResult} />
        )}
      </div>

      {/**_____________________________---------MinWAge ______________________________________________________________________________ */}
      <div style={{ display: "flex", border: "7px solid black" }}>
        <input
          type="checkbox"
          name="minwage"
          id="minwage"
          onClick={clickHandler}
        />
        <label htmlFor="minwage">Min Wage Act</label>
        {showminwagepage && (
          <MinWagePage
            requestData={requestData}
            setrequestData={setrequestData}
            setWageResult={setWageResult}
          />
        )}
        {showminwagepage && WageResult && (
          <MinWageResult WageResult={WageResult} />
        )}
      </div>

      {/** -----------------------------------Lwf----------------------------------------------- */}
      <div style={{ display: "flex", border: "7px solid black" }}>
        <input type="checkbox" name="lwf" id="lwf" onClick={clickHandler} />
        <label htmlFor="lwf">LWF</label>
        {showlwfpage && (
          <LwfPage requestData={requestData} setrequestData={setrequestData} />
        )}
        {showlwfpage && LwfResult && <LwfResultData LwfResult={LwfResult} />}
      </div>
      <input type="submit" value="Submit" />
      <input type="reset" value="Reset" onClick={resetHandler} />
    </form>
  );
};

export default MainForm;
