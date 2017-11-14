

var dataObj = {};

// ===== Quickbase Stuff =====
// ** API Authentication **
    dataObj.iQrealm =           'globalnetcommerceinc';
    dataObj.iQtoken =           'b2f4yz_4mr_5w5hwybxsqqypc2qqq5pg9e7qv';

// ** Database/Table IDs (dbid) **
    dataObj.iQdbidUsers =                   'bmkh2du8j';
    dataObj.iQdbidSurvey =                  'biwuqbzfr';
        dataObj.iQdbidSurveyResults =       'bjnyaai5u';
    dataObj.iQdbidReact =                   'bhv6wm3vx';
    dataObj.iQdbidAsset =                   'bgtv6npfs';
    
// ** Grabbed Fields (clist) **
    dataObj.clistUsers =            '6.7.8.9.10.11';
    dataObj.clistSurveyList =       '202.48.529.291.173.175.213.228.349.338.473.147';
    dataObj.clistSurvey =           '48.529.291.173.175.588.593.213.228.349.338.473.111.87.389.387.390.391.393.392.394.395.202.506.507.651.652.505.329.574.147';
    dataObj.clistSurveyResults =    '8.11.14.17.20.25.28.33.74.122.91.95.100.84.36';
    dataObj.clistReactList =        '511.113.6.7.566.513.545.12.579.336';
    dataObj.clistReact =            '6.7.8.11.12.13.113.336.510.511.512.513.545.566.460.579.519.532.538.583.584.265';
    dataObj.clistAssetList =        '200.204.33.743.366.760.364.266.418.43.268.184.510.183.677';
    dataObj.clistAsset =            '435.565.596.184.417.418.165.677.648.674.266.268.183.43.510.204.306.423.424.200.270.563.595.173.265.546.142.153.436.438.355.273.560.562.566.730.254.33.743.364.366.760.340.548.549.431.430.763.764.181.182.180.189.190.599';
    

    
// ===== Google Maps Stuff =====
    dataObj.gmKey =             'AIzaSyBAeK6POomd9Mv5_Qwl0om5TSZX6ak6biQ';
    

// ===== Mail Stuff =====
    dataObj.o365User =          'azure_e4dd8f2b90379a7ff19bb816973203ea@azure.com';
    dataObj.o365Pass =          'zAkTQtMUo$qz{oNQoz2GbQEJN8gNPK';
module.exports = dataObj;
    
// ===== Notes =====
var React = {
// ********************** React Fields ****************************
// Field Name		                                            ID
// ****************************************************************
// Service Date			                                          6
// Start Time		                                              7
// Duration	Numeric		                                          8
// Description of Service		                                 11
// Call Type	                                                 12
// Client Ticket Number			                                 13
// GNCI Ticket		                                            113
// Recommendation	                                            336
// Part List                                                    460
// Terminal Attribute - Router Name	                            510
// Terminal Attribute - Related Profile	                        511
// Terminal Attribute - Primary devices - Part - Device	        512
// Terminal Attribute - Device_Location - ATM Location	        513
// Terminal Attribute - Device_Location - Location Address	    545
// Terminal Attribute - Terminal_ID	                            566
// Terminal Attribute - Platform                                579
// Terminal Attribute - Related Promary Devices                 519
// Terminal Attribute - Mobile Number - Carrier                 532
// Terminal Attribute - Mobile Number display                   538
// Terminal Attribute - Related Profile Hardware                583
// Terminal Attribute - Profile Hardware - Part - Device        584
// React tickets for this Location                              265             This provides a Location_ID - not an Object
};
var Survey = {
// ********************* Survey Fields ****************************
// Field Name		                                            ID
// ****************************************************************
// Autosurvey#	                                                  3
// Survey Reference	                                             48
// Survey Status	                                             87
// Override Notes	                                            111
// Device_Location - ATM Location	                            173
// Device_Location - Location Address	                        175
// Device_Location - Related Profile	                        202
// Recommended	                                                213
// Carrier Recommendation	                                    228
// Completed Date	                                            291
// Amp Recommended	                                            338
// Recommended Hardware	                                        349
// AT&T 3G Grade	                                            387
// AT&T 3G Amp Grade	                                        389
// AT&T 4G Amp Grade	                                        390
// AT&T 4G Grade	                                            391
// Verizon 3G Grade	                                            392
// Verizon 3G Amp Grade	                                        393
// Verizon 4G Amp Grade	                                        394
// Verizon 4G Grade	                                            395
// Antenna - Device Description	                                473
// Winning TP Down Mean	                                        506
// Winning TP Up Mean	                                        507
// Requester - Partner_Contact	                                529
// SiteDesc - Long	                                            588
// SiteDesc - Power	                                            593
// Winning Latency	                                            651
// Winning Packet Loss	                                        652
};
var Asset = {
// ********************** Asset Fields ****************************
// Field Name		                                            ID
// ****************************************************************
// Aircard - Part - Device Description	                        435
// Aircard - Related Part	                                    437
// Due Date	                                                    184
// FedEx Tracking Number	                                    417
// FedEx Tracking URL	                                        418
// Install Partner	                                            165
// Install Partner - Display	                                677
// Install Partner (ref) - Installer Profile - Company	        648
// Install Partner (ref) - Partner Email	                    674
// Mobile Number - Carrier	                                    266
// Mobile Number Display	                                    268
// Order Date	                                                183
// Order Reference	                                             43
// Order Status	                                                510
// Order Type	                                                204
// Partner Address	                                            306
// Primary devices - Part - Device	                            423
// Primary devices - Related Part	                            424
// Profile (TID)	                                            200
// Related Primary Devices	                                    142
// Related Profile Hardware	                                    153
// Related Profile Hardware - Part - Device Description	        436
// Related Profile Hardware - Related Part	                    438
// Related SIM	                                                273
// Related SIM2	                                                560
// Rush Order	                                                254
// Ship Date	                                                 33
// Terminal ID - Asset ID# - Terminal_ID	                    743
// Terminal ID - Device_Location - Location Address	            366
// Terminal ID - Router Name                    	            340
// Terminal ID - Device_Location - ATM Location 	            366
// Terminal ID - Platform                        	            760
};