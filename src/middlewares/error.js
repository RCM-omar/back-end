const errorHandler = (err, req, res, next) => {
    //! add status to error instance if u eant to display it 
    if (err.status) {
      res.status(err.status).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: err.message });
    }
  };
  
  export default errorHandler;