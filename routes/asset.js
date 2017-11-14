// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    moment =            require("moment");
    

// ===== Index Route =====
// Currently displays the last 250 asset records - no filters other than 
var route = {
    module: 'Assets',
};
var records;
var query;

router.get("/assets", /*aaa.isLoggedIn,*/ function(req, res){
    route.name = 'assets';
    route.REST = 'index';
    query = req.query.search;
    res.render("assets/assets", {
        records: records,
        query: query,
        moment: moment,
        route: route
    });

    // function search1(userCo, query1) {
    //     if(req.user.company != 'GNCI') { 
    //         userCo = "{'200'.SW.'" + req.user.company + "'}";
    //     } if (query) {
    //         query1 = "{'a'.CT.'" + query + "'}";
    //     } if(userCo && query1) {
    //         return(userCo + " AND " + query1);
    //     } if(userCo && !query1){
    //         return(userCo);
    //     } if(!userCo && query1){
    //         return(query1);
    //     }
    // }
});    

// ===== Show Route =====
router.get("/assets/:assetID", /*aaa.isLoggedIn,*/ function(req, res) {
    route.name = 'assets';
    route.REST = 'show';
    var rid = req.params.assetID;
    // var params = gMaps.params;
    // params.center = records[0][366];
    // params.markers[0].location = records[0][366];
    // var mapURL = gMaps.gmAPI.staticMap(params);
    res.render("assets/asset", {
        // mapURL: mapURL, 
        moment: moment,
        route: route
    });
});

router.get("/pendingOrders", /*aaa.isLoggedIn,*/ function(req, res) {
    route.name = 'pendingOrders';
    res.render('assets/pendingOrders', {
        route: route,
        moment: moment
    });
});

router.get("/pendingReturns", /*aaa.isLoggedIn,*/ function(req, res) {
    route.name = 'pendingReturns';
    res.render('assets/pendingReturns', {
        pendingReturns: pendingReturns,
        route: route,
        moment: moment
    });
});

module.exports = router; 