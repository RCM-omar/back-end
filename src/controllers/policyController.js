import * as PolicyModel from "../Models/policyModel.js";

export const getPolicies = async (req, res, next) => {
  const queryParams = req.query;
  const wantToSearch = !!Object.keys(queryParams).length;

  try {
    if (wantToSearch) {
      const policies = await PolicyModel.searchPolicy(queryParams);
      return res
        .status(200)
        .json({ msg: "Success", data: policies, numOfpolicies: policies.length });
    }
    const policies = await PolicyModel.getPolicies();
    res
      .status(200)
      .json({ msg: "Success", data: policies, numOfpolicies: policies.length });
  } catch (err) {
    let error = new Error(
      "field to get policies , msg from dataBase " + err.message
    );
    next(error);
  }
};
export const getPolicy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const policy = await PolicyModel.getPolicyById(id);
    if (!policy) {
      let error = new Error("Policy not found");
      return next(error);
    }

    res.status(200).json({ msg: "Success", data: policy });
  } catch (err) {
    let error = new Error(
      "field to get this policy , msg from dataBase " + err.message
    );
    next(error);
  }
};