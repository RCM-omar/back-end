import * as PersonModel from "../Models/personModel.js";

export const getPersons = async (req, res, next) => {
  console.log('hi');
  
  const queryParams = req.query ; 
  const wantToSearch =  !!(Object.keys( queryParams ).length)
 
  try {
    if(wantToSearch) {
      const persons = await PersonModel.searchPerson(queryParams);
      return res.status(200).json({msg :"Success" ,  data: persons , numOfPersons : persons.length } );
    }
    const persons = await PersonModel.getPersons();
    res.status(200).json({msg :"Success" ,  data: persons , numOfPersons : persons.length } );
  } catch (err) {
    let error = new Error(
      "field to get persons , msg from dataBase " + err.message
    );
    next(error);
  }
};
export const getPerson = async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await PersonModel.getPersonById(id);
    if (!person) {
      let error = new Error("Person not found");
      return next(error);
    }

    res.status(200).json({msg :"Success" ,  data: person });
  } catch (err) {
    let error = new Error(
      "field to get this person , msg from dataBase " + err.message
    );
    next(error);
  }
};
export const addPerson = async (req, res, next) => {
  try {
    const person = await PersonModel.insertPerson(req.body);
    res.status(201).json({msg :"Success" ,  data: person });
  } catch (err) {
    let error = new Error(
      "field to add person , msg from dataBase " + err.message
    );
    next(error);
  }
};

export const deletePerson = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPerson = await PersonModel.deletePerson(id);
    if (!deletedPerson) {
      let error = new Error("Person not found");
      error.status = 404 ;
      return next(error);
    }
    const persons = await PersonModel.getPersons();
    res.status(200).json({ message: 'Success' ,data:  persons });
  } catch (error) {
    next(error);
  }
};

export const updatePerson = async (req, res , next) => {
  const { id } = req.params;
  
  try {
    const updatedPerson = await PersonModel.updatePerson(id, req.body);
    if (!updatedPerson) {
      let error = new Error("Person not found");
      error.status = 404 ;
      return next(error);
    }
    res.status(200).json({msg: "Success" , data : updatedPerson});
  } catch (error) {
    next(error);
  }
};
