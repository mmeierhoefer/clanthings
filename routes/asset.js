// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    iQ =                require('../middleware/iQ.js'),
    moment =            require("moment");
    

// ===== Index Route =====
// Currently displays the last 250 asset records - no filters other than 
var route = {
    module: 'Assets',
};
var records;
var query;

router.get("/assets", aaa.isLoggedIn, function(req, res){
    route.name = 'assets';
    route.REST = 'index';
    query = req.query.search;
    function search1(userCo, query1) {
        if(req.user.company != 'GNCI') { 
            userCo = "{'200'.SW.'" + req.user.company + "'}";
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
    var params = iQ.searchAssetParams;
    if(search1){
        params.query = search1() + " AND {'200'.XCT.'Return'}";
    }
    iQ.quickbase.api('API_DoQuery', params, function(err, result) {
        if(err) {
            req.flash('error', err);
        } else {
            records = result.table.records;
            res.render("assets/assets", {
                records: records,
                query: query,
                moment: moment,
                route: route
            });
        }
    });    
});

// ===== Show Route =====
router.get("/assets/:assetID", aaa.isLoggedIn, function(req, res) {
    route.name = 'assets';
    route.REST = 'show';
    var rid = req.params.assetID;
    var iQparams = iQ.showAssetParams;
    iQparams.query = "{'3'.EX.'" + rid + "'}";
    iQ.quickbase.api('API_DoQuery', iQparams, function(err, result) {
        if(err) {
            req.flash('error', err);
        } else {
            records = result.table.records;
    var params = gMaps.params;
        params.center = records[0][366];
        params.markers[0].location = records[0][366];
    var mapURL = gMaps.gmAPI.staticMap(params);
        res.render("assets/asset", {
            records: records,
            mapURL: mapURL, 
            moment: moment,
            route: route
            });
        }
    });    
});

router.get("/pendingOrders", aaa.isLoggedIn, function(req, res) {
    route.name = 'pendingOrders';
    var pendingOrders;
    function search1(userCo, pending) {
        pending = "({'204'.EX.'New Order'} OR {'204'.EX.'Support Replacement'}) AND {'33'.EX.''}";
        if(req.user.company != 'GNCI') { 
            userCo = "{'200'.SW.'" + req.user.company + "'}";
        } if (userCo) {
            return(pending + "AND" + userCo);
        } else {
            return(pending);
        } 
    }
    var poParams = iQ.searchAssetParams;
    poParams.query = search1();
    poParams.options = 'sortorder-D';
    iQ.quickbase.api('API_DoQuery', poParams, function(err, result) {
        if(err){
            req.flash('error', err);
        } else {
            pendingOrders = result.table.records;
            res.render('assets/pendingOrders', {
                pendingOrders: pendingOrders,
                route: route,
                moment: moment
            });
        }
    });
});

router.get("/pendingReturns", aaa.isLoggedIn, function(req, res) {
    route.name = 'pendingReturns';
    var pendingReturns;
    function search1(userCo, pendingRet) {
        pendingRet = "{'204'.EX.'Return'} AND {'33'.EX.''}";
        if(req.user.company != 'GNCI') { 
            userCo = "{'200'.SW.'" + req.user.company + "'}";
        } if (userCo) {
            return(pendingRet + "AND" + userCo);
        } else {
            return(pendingRet);
        } 
    }
    var prParams = iQ.searchAssetParams;
    prParams.query = search1();
    prParams.options = 'sortorder-D';
    iQ.quickbase.api('API_DoQuery', prParams, function(err, result) {
        if(err){
            req.flash('error', err);
        } else {
            pendingReturns = result.table.records;
            res.render('assets/pendingReturns', {
                pendingReturns: pendingReturns,
                route: route,
                moment: moment
            });
        }
    });
});

module.exports = router; 