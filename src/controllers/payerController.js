import * as PayerModel from "../Models/payerModel.js";

export const getPayers = async (req, res, next) => {
  const queryParams = req.query;
  const wantToSearch = !!Object.keys(queryParams).length;

  try {
    if (wantToSearch) {
      const payers = await PayerModel.searchPayer(queryParams);
      return res
        .status(200)
        .json({ msg: "Success", data: payers, numOfpayers: payers.length });
    }
    const payers = await PayerModel.getPayers();
    res
      .status(200)
      .json({ msg: "Success", data: payers, numOfpayers: payers.length });
  } catch (err) {
    let error = new Error(
      "field to get payers , msg from dataBase " + err.message
    );
    next(error);
  }
};
export const getPayer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payer = await PayerModel.getPayerById(id);
    if (!payer) {
      let error = new Error("Payer not found");
      return next(error);
    }

    res.status(200).json({ msg: "Success", data: payer });
  } catch (err) {
    let error = new Error(
      "field to get this payer , msg from dataBase " + err.message
    );
    next(error);
  }
};
/*
export const addPayer = async (req, res, next) => {
  try {
    const payer = await PayerModel.insertPayer(req.body);
    res.status(201).json({ msg: "Success", data: payer });
  } catch (err) {
    let error = new Error(
      "field to add payer , msg from dataBase " + err.message
    );
    next(error);
  }
};

export const deletePayer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPayer = await PayerModel.deletePayer(id);
    if (!deletedPayer) {
      let error = new Error("Payer not found");
      error.status = 404;
      return next(error);
    }
    const payers = await PayerModel.getpayers();
    res.status(200).json({ message: "Success", data: payers });
  } catch (error) {
    next(error);
  }
};

export const updatePayer = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedPayer = await PayerModel.updatePayer(id, req.body);
    if (!updatedPayer) {
      let error = new Error("Payer not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ msg: "Success", data: updatedPayer });
  } catch (error) {
    next(error);
  }
};
*/