// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    iQ =                require('../middleware/iQ.js'),
    moment =            require("moment");
    

// ===== Index Route =====
// Currently displays the last 25 asset records - no filters other than 
var route = {
        module: 'Dashboard',
    };
var pendingOrder;
var pendingReturn;
// var orders
// var tickets;
// var pendingSurveys;
// var surveys;




router.get("/dashboard", aaa.isLoggedIn, function(req, res) {
    var pendingOrder;
    function orderPending() {
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
        poParams.options = 'sortorder-D.num-15';
        console.log(poParams);
        iQ.quickbase.api('API_DoQuery', poParams, function(err, result) {
            if(err){
                // req.flash('error', err);
                console.log(err);
            } else {
                pendingOrder = result.table.records;
                console.log('pendingOrder inside function: ' + pendingOrder);
            }
        });
    }
    function returnPending() {
        function search1(userCo, pending) {
            pending = "{'204'.EX.'Return'} AND {'33'.EX.''}";
            if(req.user.company != 'GNCI') { 
                userCo = "{'200'.SW.'" + req.user.company + "'}";
            } if (userCo) {
                return(pending + "AND" + userCo);
            } else {
                return(pending);
            } 
        }
        var params = iQ.searchAssetParams;
        params.query = search1();
        params.options = 'sortorder-D.num-10';
        console.log(params);
        iQ.quickbase.api('API_DoQuery', params, function(err, result) {
            if(err){
                // req.flash('error', err);
                console.log(err);
            } else {
                pendingReturn = result.table.records;
            }
        });
    }
    
    console.log('pendingOrder outside function: ' + pendingOrder);
    returnPending();
    res.render('dashboard/dashboard',{
        pendingOrder: pendingOrder,
        pendingReturn: pendingReturn,
        // orders:orders,
        // tickets: tickets,
        // pendingSurveys: pendingSurveys,
        // surveys:surveys,
        moment: moment
    });
});



module.exports = router; 