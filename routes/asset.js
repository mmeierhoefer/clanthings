// ===== Application Variables =====
var express =           require("express"),
    router =            express.Router({mergeParams: true}),
    aaa =               require("../middleware/aaa.js"),
    gMaps =             require("../middleware/gMaps.js"),
    Asset =             require('../models/assetModel'),
    Site =              require('../models/siteModel'),
    moment =            require("moment");
    

// ===== Index Route =====
var route = {
    module: 'Assets',
};

router.get("/assets", /*aaa.isLoggedIn,*/ function(req, res){
    route.name = 'assets';
    route.REST = 'index';
    var query = req.query.search;
    Asset.find({}, function(err, allAssets){
        if(err) {
            req.flash('error', 'You got some sort of error: ' + err);
        } else {
            res.render("assets/indexAsset", {
                assets: allAssets,
                query: query,
                moment: moment,
                route: route
            });
        }
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
    Asset.findById(req.params.assetID, function(err, foundAsset){
        res.render("assets/showAsset", {
            asset: foundAsset
        });
    });
});

// ===== Edit & Update Routes =====
router.get("/assets/:assetID/edit", /*middleware.checkCampgroundOwnership,*/ function(req, res) {
    Asset.findById(req.params.assetID, function(err, foundAsset){
        res.render("assets/editAsset", {
            asset: foundAsset
        });
    });
});
router.put("/assets/:assetID", /*middleware.checkCampgroundOwnership,*/ function(req, res) {
    Asset.findByIdAndUpdate(req.params.assetID, req.body.asset, function(err, updatedAsset){
        if(err){
            req.flash('error', 'You got some sort of error: ' + err);
        } else {
        res.redirect("/assets/" + req.params.assetID);
        }
    });
});

// ===== Destroy Route =====
router.delete("/assets/:assetID", /*middleware.checkCampgroundOwnership,*/ function(req, res) {
    Asset.findByIdAndRemove(req.params.assetID, function(err) {
        if(err){
            req.flash('error', 'You got some sort of error: ' + err);
        } else {
        res.redirect("/assets");
        }
    });
});


module.exports = router; 