// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    iQ =                require('../middleware/iQ.js'),
    moment =            require("moment");


// ===== Index Route =====
// Currently displays the last 100 React records - no filters other than 
var route = {
    module: 'React',
};
var records;
var query;
router.get("/tickets", aaa.isLoggedIn, function(req, res){
    route.name = 'tickets';
    route.REST = 'index';
    query = req.query.search;
    function search1(userCo, query1) {
        if(req.user.company != 'GNCI') { 
            userCo = "{'511'.SW.'" + req.user.company + "'}";
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
    var params = iQ.searchReactParams;
    if(search1){
        params.query = search1();
    }
    iQ.quickbase.api('API_DoQuery', params, function(err, result) {
        if(err) {
        req.flash('error', err);
        } else {
            records = result.table.records;
            res.render("react/tickets", {
                records: records, 
                query: query, 
                moment: moment,
                route: route
            });
        }
    });    
});

// ===== Show Route =====
router.get("/tickets/:ticketID", aaa.isLoggedIn, function(req, res) {
    route.name = 'tickets';
    route.REST = 'show';
    var rid = req.params.ticketID;
    var iQparams = iQ.showReactParams;
    iQparams.query = "{'3'.EX.'" + rid + "'}";
    iQ.quickbase.api('API_DoQuery', iQparams, function(err, result) {
        if(err) {
         req.flash('error', err);
        } else {
            records = result.table.records;
    var params = gMaps.params;
        params.center = records[0][545];
        params.markers[0].location = records[0][545];
    var mapURL = gMaps.gmAPI.staticMap(params);
            res.render("react/ticket", {
                records: records,
                mapURL: mapURL, 
                moment: moment,
                route: route
            }); 
        }    
    });        
});

module.exports = router; 