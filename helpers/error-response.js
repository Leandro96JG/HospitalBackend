

const validatorResponse = (status,msg)=>{
     const err = new Error(msg);
    err.status = status;
    throw err;
}

module.exports = {
    validatorResponse
}