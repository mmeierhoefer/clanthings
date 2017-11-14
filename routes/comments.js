var express =       require("express"),
router =        express.Router({mergeParams: true}),
Campground =    require("../models/campground"),
middleware =    require("../middleware/index.js"), //  If the field is called 'index' you can leave the filename off - but I kept it
Comment =       require("../models/comment");

// ===== Comments New =====
router.get("/new", middleware.isLoggedIn, function(req, res){
Campground.findById(req.params.id, function(err, campground) {
    if(err) {
        console.log(err);
    } else {
        res.render("comments/new.ejs", {campground: campground});
    }
});
});

// ===== Comments Create =====
router.post("/", middleware.isLoggedIn, function(req, res) {
Campground.findById(req.params.id, function(err, campground) {
    if(err) {
        req.flash("error", "Something went horribly wrong");
        res.redirect("/campgrounds");
    } else {
        Comment.create(req.body.comment, function(err, comment) {
            if(err) {
                console.log(err);
            } else {
                // add username and ID to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // Save the comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                console.log(comment);
                req.flash("success", "Well done!  You added a Comment :)");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    }
});
});

// ===== Edit Route =====
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
Comment.findById(req.params.comment_id, function(err, foundComment) {
   if(err) {
       res.redirect("back");
   } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
   }
});
});

// ===== Update Route =====
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
        res.redirect("back");
    } else {
        res.redirect("/campgrounds/" + req.params.id);
    }
});
});

// ==== Destroy Route =====
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
        res.redirect("back");
    } else {
        req.flash("info", "Congratulations - your comment was Destroyed");
        res.redirect("/campgrounds/" + req.params.id);
    }
});
});

module.exports = router; 