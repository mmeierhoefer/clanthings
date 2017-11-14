// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    iQ =                require('../middleware/iQ.js'),
    moment =            require("moment");
    

// ===== Index Route =====
// Currently displays the last 100 survey records - no filters other than 
var route = {
    module: 'Surveys',
};    
var records;
var results;
var query;
router.get("/surveys", aaa.isLoggedIn, function(req, res){
    route.name = 'surveys';
    route.REST = 'index';
    query = req.query.search;
    function search1(userCo, query1) {
        if(req.user.company != 'GNCI') {
        // if(!aaa.isAdmin) {
            userCo = "{'202'.SW.'" + req.user.company + "'}";
        } if (query) {
            query1 = "{'a'.CT.'" + query + "'}";
        } if(userCo && query1) {
            return(userCo + " AND " + query1);
        } if(userCo && !query1){
            return(userCo);
        } if(!userCo && query1){
            return(query1);
        }
    }
    var params = iQ.searchSurveyParams;
    if(search1){
        params.query = search1() + " AND {'271'.EX.'true'}";
    }
    iQ.quickbase.api('API_DoQuery', params, function(err, result) {
        if(err) {
            req.flash('error', err);
        } else {
            records = result.table.records;
            res.render("surveys/surveys", {
                records: records,
                query: query,
                moment: moment,
                route: route
            });
        }
    });    
});

router.get("/pendingSurveys", aaa.isLoggedIn, function(req, res){
    route.name = 'pendingSurveys';
    route.REST = 'index';
    query = req.query.search;
    function search1(userCo, query1) {
        if(req.user.company != 'GNCI') {
        // if(!aaa.isAdmin) {
            userCo = "{'202'.SW.'" + req.user.company + "'}";
        } if (query) {
            query1 = "{'a'.CT.'" + query + "'}";
        } if(userCo && query1) {
            return(userCo + " AND " + query1);
        } if(userCo && !query1){
            return(userCo);
        } if(!userCo && query1){
            return(query1);
        }
    }
    var params = iQ.searchSurveyParams;
    if(search1){
        params.query = search1() + " AND {'87'.CT.'Plann'}";
    }
    iQ.quickbase.api('API_DoQuery', params, function(err, result) {
        if(err) {
            req.flash('error', err);
        } else {
            records = result.table.records;
            res.render("surveys/pendingSurveys", {
                records: records,
                query: query,
                moment: moment,
                route: route
            });
        }
    });    
});

// ===== Show Route =====
router.get("/surveys/:surveyID", aaa.isLoggedIn, function(req, res){
    route.name = 'surveys';
    route.REST = 'show';
    var rid = req.params.surveyID;
    var iQparams = iQ.showSurveyParams;
    var iQparamsResults = iQ.searchSurveyResultsParams;
    iQparams.query = "{'3'.EX.'" + rid + "'}";
    iQparamsResults.query = "{'31'.EX.'" + rid + "'}";
    iQ.quickbase.api('API_DoQuery', iQparams, function(err, result) {
        if(err) {
         req.flash('error', err);
        } else {
            records = result.table.records;
    var params = gMaps.params;
        params.center = records[0][175];
        params.markers[0].location = records[0][175];
    var wellBg = '';
        if(records[0][213] == 'Exercise Caution') {
            wellBg = 'yellow';
        } else if(records[0][213] == 'Recommended for Wireless') {
            wellBg = 'green';
        } else {
            wellBg = 'red';
        }
    var accessories = (records[0][505]).split(';');
    console.log('Before: ' + accessories);
    accessories.splice(0, 0, records[0][349]);
    console.log('After: ' + accessories);
    var mapURL = gMaps.gmAPI.staticMap(params);
        res.render("surveys/survey", {
            results: results,
            records: records,
            mapURL: mapURL, 
            moment: moment,
            route: route,
            wellBg: wellBg,
            accessories: accessories
            });
        }
    });
    iQ.quickbase.api('API_DoQuery', iQparamsResults, function(err, result){
        if(err){
            req.flash('error', err);
        } else {
            results = result.table.records;
        }
    });
});

module.exports = router; 