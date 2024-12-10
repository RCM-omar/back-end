import axios from "axios";
import pool from "../config/db.js";

export const checkinsurance = async (req, res) => {
  let v_api_trans_id;
  try {
    //! request insert into api_transactions (api_trans_id, JSON_req, Service_name )
    const {
      rows: [{ nextval }],
    } = await pool.query("select nextval('api_transaction_api_trans_id_seq')");
    v_api_trans_id = nextval;

    const vReq = `http://176.105.150.83:9012/checkinsurance?PatientKey=${req.query.patientId}&SystemType=1`;

//    console.log("hi", v_api_trans_id);

    const insertQuery = await pool.query(
      `insert into nphies.api_transaction(api_trans_id, api_name, request) 
        OVERRIDING SYSTEM VALUE  
        values (${v_api_trans_id}, 'checkInsurance', '${vReq}')`
    );
    console.log(insertQuery);

    const result = await axios.get(vReq);

    //! update  api_transactions with response using inserted (api_trans_id)
    await pool.query(
      `update nphies.api_transaction set response = '${JSON.stringify(
        result.data
      )}' where api_trans_id= ${v_api_trans_id}`
    );
    const {
      PolicyNumber,
      InsuranceCompanyEN,
      InsuranceCompanyAR,
      InsuranceCompanyID,
      ExpiryDate,
      ClassName,
      DeductibleRate,
      MaxLimit,
      BeneficiaryNumber,
      NetworkID,
      IssueDate,
      SponsorNumber,
      PolicyHolder,
    } = result.data.Insurance[0];
    /*
    const insertElig = await pool.query(
      `insert into nphies.coverage (api_trans_id, policy_number, policy_holder)
       values (${v_api_trans_id},  '${PolicyNumber}', '${PolicyHolder}')`
    );
*/
    const insertElig = await pool.query(
      `insert into nphies.coverage (api_trans_id, policy_number, payer_name, 
          payer_name_ar, Insurance_Company_ID, coverage_period_end, Class_Name, 
          copay_percent, copay_max, member_id, network, 
          coverage_period_start, Sponsor_Number, policy_holder)
   values (${v_api_trans_id},  '${PolicyNumber}', '${InsuranceCompanyEN}', 
          '${InsuranceCompanyAR}', 
          '${InsuranceCompanyID}', 
          '${ExpiryDate}', 
          '${ClassName}', 
          '${DeductibleRate}', 
          '${MaxLimit}', 
          '${BeneficiaryNumber}', 
          '${NetworkID}', 
          '${IssueDate}', 
          '${SponsorNumber}', 
          '${PolicyHolder}')` );
    res.json(result.data);
    // insert into nphies.coverage valuse of response items
  } catch (err) {
    console.log(err);

    //! update api_transactions with err for the inserted req(api_trans_id)
    await pool.query(
      `update nphies.api_transaction set status = "FAILED", error_message = ${err} where api_trans_id= ${v_api_trans_id}`
    );
    res.status(500).json({ message: "Error fetching checkinsurance", err });
  }
};
