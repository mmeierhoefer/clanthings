// ===== Consolidated Middleware File =====

// ===== ===== Global Variables ===== =====
var aaaObj =             {};
// var aaaBool =           false;

// ===== User AAA =====
// ----- Logged in to the site -----
aaaObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

// aaaBool.isAdmin = function(req, res) {
//     if(req.user.company === 'GNCI'){
//         console.log('Middleware:  Admin=true');
//         return true;
//     } else {
//         console.log('Middleware:  Admin=false');
//         return false;
//     }
// };

module.exports = aaaObj;
// module.exports = aaaBool;