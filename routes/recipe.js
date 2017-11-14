// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    iQ =                require('../middleware/iQ.js'),
    moment =            require("moment");
    

// ===== Index Route =====
var route = {
        module: 'Dashboard',
    };
var pendingOrder;
var pendingReturn;
// var orders
// var tickets;
// var pendingSurveys;
// var surveys;




router.get("/recipe", /*aaa.isLoggedIn,*/ function(req, res) {
    res.render('dashboard/dashboard',{
        // pendingOrder: pendingOrder,
        // pendingReturn: pendingReturn,
        // orders:orders,
        // tickets: tickets,
        // pendingSurveys: pendingSurveys,
        // surveys:surveys,
        moment: moment
    });
});



module.exports = router; 