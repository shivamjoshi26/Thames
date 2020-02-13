var queryHandler = require("../helpers/query.js")
var response = require("../helpers/sendResponse.js")

async function getSite(req,res) {
    try {

       
        let sql = `SELECT * from site`;
        let data =  await queryHandler.runQuery(sql);
        
            response.sendResponse(res, response.responseStatus.success, response.responseMessage.success, data)
    } catch (error) {
        console.log(error);
        response.sendResponse(res, response.responseStatus.somethingWentWrong, response.responseMessage.somethingWentWrong, error)
    }
}

async function getFunc(req,res) {
    try {

       
        let sql = `SELECT * from function`;
        let data =  await queryHandler.runQuery(sql);
        
            response.sendResponse(res, response.responseStatus.success, response.responseMessage.success, data)
    } catch (error) {
        console.log(error);
        response.sendResponse(res, response.responseStatus.somethingWentWrong, response.responseMessage.somethingWentWrong, error)
    }
}
async function getProcs(req,res) {
    try {
        let sql = `SELECT * FROM process
        where code in(
        SELECT process FROM code 
        where Func='${req.query.func}'
        )`;
        let data =  await queryHandler.runQuery(sql);
        
            response.sendResponse(res, response.responseStatus.success, response.responseMessage.success, data)
    } catch (error) {
        console.log(error);
        response.sendResponse(res, response.responseStatus.somethingWentWrong, response.responseMessage.somethingWentWrong, error)
    }
}

async function getEqiup(req,res) {
    try {
        let sql = `SELECT * FROM equipment
        where codeq in(
        SELECT equipment FROM code 
        where process='${req.query.process}'
        )`;
        let data =  await queryHandler.runQuery(sql);
        
            response.sendResponse(res, response.responseStatus.success, response.responseMessage.success, data)
    } catch (error) {
        console.log(error);
        response.sendResponse(res, response.responseStatus.somethingWentWrong, response.responseMessage.somethingWentWrong, error)
    }
}
async function Savedata(req,res) {
    try {
        let sql = `INSERT into Floc (
                 
               Site,Function,Process,Equipment,eId
                 )
                 values('${req.body.Site}','${req.body.Function}','${req.body.Process}','${req.body.Equipment}','${req.body.eId}')`;
        let data =  await queryHandler.runQuery(sql);
        
            response.sendResponse(res, response.responseStatus.success, response.responseMessage.success, data)
    } catch (error) {
        console.log(error);
        response.sendResponse(res, response.responseStatus.somethingWentWrong, response.responseMessage.somethingWentWrong, error)
    }
}

module.exports = {
    getSite,
    getFunc,
    getProcs,
    getEqiup,
    Savedata
}