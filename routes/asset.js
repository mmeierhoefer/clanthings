// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    Asset =             require('../models/assetModel'),
    moment =            require("moment");
    

// ===== Index Route =====
var route = {
    module: 'Assets',
};

router.get("/assets", /*aaa.isLoggedIn,*/ function(req, res){
    route.name = 'assets';
    route.REST = 'index';
    var query = req.query.search;
    res.render("assets/indexAsset", {
        query: query,
        moment: moment,
        route: route
    });
});

router.get("/assets/new", /*aaa.isLoggedIn,*/ function(req, res){
    route.name = 'assets';
    route.REST = 'index';
    var query = req.query.search;
    res.render("assets/newAsset", {
        query: query,
        moment: moment,
        route: route
    });
});

router.post('/assets', function(req, res){
    var title = req.body.title,
        owner = {
            id: req.user._id,
            username: req.user.username
        },
        image = req.body.image,
        description = req.body.description,
        assetType = req.body.assetType;
    var newAsset = {
        title: title,
        owner: owner,
        image: image,
        description: description,
        assetType: assetType
    }
    Asset.create(newAsset, function(err, newlyCreated){
        if(err){
            req.flash('error', 'You got some sort of error: ' + err);
        } else {
            res.redirect('/assets');
        }
    })
})

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

module.exports = router; 