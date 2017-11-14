// ===== Google Maps API Middleware =====
var gmObj =                     {},
    data =                      require('./data/data.js'),
    GoogleMapsAPI =             require("googlemaps"),
    gmAPI =                     new GoogleMapsAPI({
        key:                data.gmKey,
        stagger_time:       1000,
        encode_polylines:   false,
        secure:             true
    });
    gmObj.gmAPI =           gmAPI;
    
var params = {                              //  Add constant parameters to API call
        size: '400x400',
        zoom: 16,
        maptype: "roadmap",
        markers: [{
            icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600',
        }],
        style: [{
                feature: "road",
                element: "all",
                rules: {hue: '0x00ff00'}
                }]
    };
    gmObj.params =          params;

module.exports = gmObj;