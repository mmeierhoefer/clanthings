// ===== iQ Middleware File =====


var iQObj =                     {},
    QuickBase =                 require("quickbase"),
    data =                      require('./data/data.js');
    iQObj.quickbase =           new QuickBase({
        realm:          data.iQrealm,
        userToken:      data.iQtoken
    });

// ===== ===== Functions ===== =====
// ** PreRegister Lookup **
var preRegParams = {
    dbid: data.iQdbidUsers,
    clist: data.clistUsers,
    options: "num-5",
    fmt: "structured"
    };
iQObj.preRegParams = preRegParams;


// ===== Dashboard Functions =====




// ** Survey Search Page **
var searchSurveyParams = {
    dbid: data.iQdbidSurvey,
    clist: data.clistSurveyList,
    slist: "291",
    options: "sortorder-D.num-100", 
    fmt: "structured"
    };
iQObj.searchSurveyParams = searchSurveyParams;

// ** Survey Show Page **
var showSurveyParams = {
    dbid: data.iQdbidSurvey,
    clist: data.clistSurvey,
    fmt: "structured"
    };
iQObj.showSurveyParams = showSurveyParams;

// ** Survey Results Search Page **
var searchSurveyResultsParams = {
    dbid: data.iQdbidSurveyResults,
    clist: data.clistSurveyResults,
    slist: "100",
    options: "sortorder-D", 
    fmt: "structured"
    };
iQObj.searchSurveyResultsParams = searchSurveyResultsParams;

// ** React Ticket search page
var searchReactParams = {
    dbid: data.iQdbidReact,
    clist: data.clistReactList,
    slist: "6.7",
    options: "sortorder-DD.num-100", 
    fmt: "structured"
    };
iQObj.searchReactParams = searchReactParams;

// ** React Ticket show page
var showReactParams = {
    dbid: data.iQdbidReact,
    clist: data.clistReact,
    fmt: "structured"
    };
iQObj.showReactParams = showReactParams;

// ** Asset search page
var searchAssetParams = {
    dbid: data.iQdbidAsset,
    clist: data.clistAssetList,
    slist: "3",
    options: "num-100.sortorder-D", 
    fmt: "structured"
    };
iQObj.searchAssetParams = searchAssetParams;

// ** Asset show page
var showAssetParams = {
    dbid: data.iQdbidAsset,
    clist: data.clistAsset,
    fmt: "structured"
    };
iQObj.showAssetParams = showAssetParams;



module.exports = iQObj;

// ===== Query Strings - Assets =====
// Pending Orders
// {'204'.XEX.'Return'}AND{'204'.XEX.'Info Change (Nothing shipped)'}AND{'204'.XEX.'Cancelled'}AND{'33'.EX.''}
// Recent Shipments
// {'33'.XEX.''}AND{'204'.XEX.'Return'}
// All Assets (needs a query...)
// 
// Pending Returns
// {'204'.EX.'Return'}AND{'33'.EX.''}

// ----- Proposed username (email) is in Quickbase ----- Didn't work but keeping it around in case I find a need
// var records;
// var iQname;
// var iQcompany;
// middlewareObj.inQB = function(req, res, next) {
//         var username=req.query.username;
//         middlewareObj.quickbase.api('API_DoQuery', {
//             dbid: middlewareObj.dbidUsers,
//             clist: middlewareObj.clistUsers,
//             options: "num-5",
//             query: "{'7'.EX.'" + username + "'}",
//             fmt: "structured",
//         }, function(err, result) {
//             if(err) {
//             console.log(err);
//             } else {
//                 records = result.table.records;
//                 console.log("from MW start");
//                 console.log(iQname);
//                 console.log(iQcompany);
//                 console.log("from MW end");
//                 iQname = records[0][6];
//                 iQcompany = records[0][8];
//                 if(records.length > 0) {
//                     next();
//                 } else {
//                     res.send("That email address is not authorized to use this system.");
//                     res.redirect("/preRegister");
//                     console.log("not in iQ");
//                 }
//             }
//         });
//     };
// middlewareObj.records =     records;
