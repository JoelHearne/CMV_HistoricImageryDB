define([
     'esri/dijit/Basemap'
     ,'esri/dijit/BasemapLayer'
     ,'esri/layers/osm'
     ,'esri/geometry/Point'
	 ,'esri/geometry/Extent'
	 ,'esri/layers/ImageParameters'
	 ,'esri/layers/WMSLayer'
	 ,'esri/layers/WMSLayerInfo'
	 ,"esri/SpatialReference"
	 ,'../gis/dijit/mapservLayer'
], function (   Basemap, BasemapLayer, osm , Extent ,ImageParameters, WMSLayer,WMSLayerInfo, SpatialReference,MapservLayer ) {
    return {
        map: true, // needs a refrence to the map
        //mode: 'agol', //must be either 'agol' or 'custom'
         mode: 'custom', //must be either 'agol' or 'custom'
         title: 'Basemaps', // tilte for widget
           mapStartBasemap: 'ortho_2013', // must match one of the basemap keys below
         // mapStartBasemap: 'esri_streets', // must match one of the basemap keys below
          //mapStartBasemap: 'esri_imagery', // must match one of the basemap keys below
        //basemaps to show in menu. define in basemaps object below and reference by name here
        // TODO Is this array necessary when the same keys are explicitly included/excluded below?
        //basemapsToShow: ['ortho_mapserv','ortho_2013','streets', 'satellite', 'hybrid', 'topo', 'lightGray', 'gray', 'national-geographic', 'osm', 'oceans'],

 basemapsToShow: [ 'ortho_2013'
 //,'ortho_ms'
,'o_okaloosa_destin_mosiac_09_2001','o_NorthOkaloosa10_06_03','o_okaloosa_rgb_fwb_nv_05_2004_20p','o_okaloosa_rgb_04_2005_20p','o_02072007_OkaloosaBeach','o_OKaloosa_25p','o_001_69765_a_RGBMosaic','o_002_69759_a_RGBMosaic','o_003_69764_b_RGBMosaic','o_004_69760_a_RGBMosaic','o_005_69761_A_RGBMosaic','o_006_69762_b_RGBMosaic','o_007_69763_A_RGBMosaic','o_008_69766_b_RGBMosaic','o_009_69767_a_RGBMosaic','o_010_69768_a_RGBMosaic','o_011_69770_b_RGBMosaic','o_012_69769_a_RGBMosaic','o_013_69771_a_RGBMosaic','o_014_69772_a_RGBMosaic','o_015_69773_a_RGBMosaic','o_016_69774_a_RGBMosaic','o_destin_rgb_02_2010_20p','o_fwb_rgb_02_2010_20p','o_niceville_rgb_02_2010_20p','o_mbb_10_14_2011_20p'
 //, 'esri_terrain','esri_streets','esri_topo','esri_imagery','nav_charts'
 ],

        // define all valid custom basemaps here. Object of Basemap objects. For custom basemaps, the key name and basemap id must match.
        basemaps: { // agol basemaps
           ortho_2013: {
 				title: 'ortho_2013',
 				image_slider:true,
 				basemap: new esri.dijit.Basemap({
 					id: 'ortho_2013',
 					title:'ortho_2013',
 					//basemapGallery:,
                     //thumbnailUrl: '../../igis_thumb.png',
 					layers: [new esri.dijit.BasemapLayer({
 						url: 'http://gisvm101:6080/arcgis/rest/services/imagery/Pictometry_2013_OrthoMosaic/MapServer'
 					})]
 				}),
 				//ms_url: "",
 				//ms_layers:"",
 				//ms_map:"",
 				ms_bounds:"-9666387.06023,3546184.59962,-9612343.06531,3638024.20775",
 				ms_date:"09/01/2013",
 				ms_year:"2013"
            },

            /*ortho_ms: {
 				title: 'ortho_ms',
  				basemap: new esri.dijit.Basemap({
  					id: 'ortho_ms',
  					title:'ortho_ms',
  					//basemapGallery:,
                      //thumbnailUrl: '../../igis_thumb.png',
  					layers: []
 				}),
 				ms_url: "http://204.49.20.75/ms/cgi/mapserv.exe?",
 				ms_layers:"aerials",
 				ms_map:"d:\\inetpub\\wwwroot\\ms6\\data\\pa\\map.map"
            },*/

       o_okaloosa_destin_mosiac_09_2001: {
 				title: '2001 Destin',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_okaloosa_destin_mosiac_09_2001',
 					title:'o_okaloosa_destin_mosiac_09_2001',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"okaloosa_destin_mosiac_09-2001.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9631868.52684,3551968.35663,-9617365.12205,3557854.7173",
 				ms_date:"09/01/2001",
 				ms_year:"2001"
 	    }

        ,o_NorthOkaloosa10_06_03: {
 				title: '2003 North Okaloosa',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_NorthOkaloosa10_06_03',
 					title:'o_NorthOkaloosa10_06_03',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"NorthOkaloosa10-06-03.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9663962.90382,3583938.2911,-9614456.99785,3633384.20548",
 				ms_date:"10/06/2003",
 				ms_year:"2003"
 	    }

        ,o_okaloosa_rgb_fwb_nv_05_2004_20p: {
 				title: '2004 Fort Walton Beach',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_okaloosa_rgb_fwb_nv_05_2004_20p',
 					title:'o_okaloosa_rgb_fwb_nv_05_2004_20p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"okaloosa_rgb_fwb_nv_05_2004_20p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9662999.45263,3552601.63185,-9615920.49488,3577607.72325",
 				ms_date:"04/01/2004",
 				ms_year:"2004"
 	    }

        ,o_okaloosa_rgb_04_2005_20p: {
 				title: '2005 Okaloosa',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_okaloosa_rgb_04_2005_20p',
 					title:'o_okaloosa_rgb_04_2005_20p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"okaloosa_rgb_04-2005_20p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9666387.06023,3546184.59962,-9612343.06531,3638024.20775",
 				ms_date:"04/16/2005",
 				ms_year:"2005"
 	    }

        ,o_02072007_OkaloosaBeach: {
 				title: '2007 Feb Coastline',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_02072007_OkaloosaBeach',
 					title:'o_02072007_OkaloosaBeach',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"02072007_OkaloosaBeach.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9678351.66187,3550046.51258,-9617514.45387,3558668.33238",
 				ms_date:"02/07/2007",
 				ms_year:"2007"
 	    }

        ,o_OKaloosa_25p: {
 				title: '2009 Okaloosa',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_OKaloosa_25p',
 					title:'o_OKaloosa_25p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"OKaloosa_25p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9665319.99484,3550981.39848,-9614253.04401,3633739.16166",
 				ms_date:"11/01/2009",
 				ms_year:"2009"
 	    }

        ,o_001_69765_a_RGBMosaic: {
 				title: '2009 Flood Response 69765',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_001_69765_a_RGBMosaic',
 					title:'o_001_69765_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"001_69765_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9629865.59439,3599877.07998,-9627090.82732,3607954.0866",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_002_69759_a_RGBMosaic: {
 				title: '2009 Flood Response 69759',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_002_69759_a_RGBMosaic',
 					title:'o_002_69759_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"002_69759_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9626855.04074,3607391.98314,-9616178.56999,3622595.48782",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_003_69764_b_RGBMosaic: {
 				title: '2009 Flood Response 69764',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_003_69764_b_RGBMosaic',
 					title:'o_003_69764_b_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"003_69764_b_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9628450.79435,3602106.17836,-9615840.8505,3608075.91152",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_004_69760_a_RGBMosaic: {
 				title: '2009 Flood Response 69760',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_004_69760_a_RGBMosaic',
 					title:'o_004_69760_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"004_69760_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9648614.65371,3588434.27331,-9645207.41738,3599251.24028",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_005_69761_A_RGBMosaic: {
 				title: '2009 Flood Response 69761',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_005_69761_A_RGBMosaic',
 					title:'o_005_69761_A_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"005_69761_A_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9663387.58503,3582722.10365,-9658013.28554,3591990.20501",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_006_69762_b_RGBMosaic: {
 				title: '2009 Flood Response 69762',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_006_69762_b_RGBMosaic',
 					title:'o_006_69762_b_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"006_69762_b_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9658605.60792,3585445.57981,-9654484.40181,3592722.8333",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_007_69763_A_RGBMosaic: {
 				title: '2009 Flood Response 69763',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_007_69763_A_RGBMosaic',
 					title:'o_007_69763_A_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"007_69763_A_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9642289.32889,3608578.0209,-9638292.32892,3618529.98081",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_008_69766_b_RGBMosaic: {
 				title: '2009 Flood Response 69766',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_008_69766_b_RGBMosaic',
 					title:'o_008_69766_b_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"008_69766_b_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9632878.6247,3591776.57003,-9628293.47291,3606923.27158",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_009_69767_a_RGBMosaic: {
 				title: '2009 Flood Response 69767',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_009_69767_a_RGBMosaic',
 					title:'o_009_69767_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"009_69767_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9635140.94819,3591372.26176,-9632060.74995,3598904.37702",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_010_69768_a_RGBMosaic: {
 				title: '2009 Flood Response 69768',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_010_69768_a_RGBMosaic',
 					title:'o_010_69768_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"010_69768_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9645855.38847,3590445.78848,-9634518.35971,3595830.87738",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_011_69770_b_RGBMosaic: {
 				title: '2009 Flood Response 69770',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_011_69770_b_RGBMosaic',
 					title:'o_011_69770_b_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"011_69770_b_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9644519.84864,3596190.31043,-9640956.53454,3605917.74958",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_012_69769_a_RGBMosaic: {
 				title: '2009 Flood Response 69769',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_012_69769_a_RGBMosaic',
 					title:'o_012_69769_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"012_69769_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9646259.78133,3594292.61197,-9642817.46685,3600860.53209",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_013_69771_a_RGBMosaic: {
 				title: '2009 Flood Response 69771',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_013_69771_a_RGBMosaic',
 					title:'o_013_69771_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"013_69771_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9654823.08139,3587754.00229,-9647554.37119,3594184.79263",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_014_69772_a_RGBMosaic: {
 				title: '2009 Flood Response 69772',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_014_69772_a_RGBMosaic',
 					title:'o_014_69772_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"014_69772_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9644564.51446,3605071.6276,-9638816.38572,3609443.06806",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_015_69773_a_RGBMosaic: {
 				title: '2009 Flood Response 69773',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_015_69773_a_RGBMosaic',
 					title:'o_015_69773_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"015_69773_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9637620.20098,3617531.87275,-9633264.58203,3632447.55426",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_016_69774_a_RGBMosaic: {
 				title: '2009 Flood Response 69774',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_016_69774_a_RGBMosaic',
 					title:'o_016_69774_a_RGBMosaic',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"016_69774_a_RGBMosaic.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9639842.55506,3614049.12036,-9636370.33681,3622997.07372",
 				ms_date:"04/10/2009",
 				ms_year:"2009"
 	    }

        ,o_destin_rgb_02_2010_20p: {
 				title: '2010 Destin',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_destin_rgb_02_2010_20p',
 					title:'o_destin_rgb_02_2010_20p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"destin_rgb_02-2010_20p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9633668.99948,3551440.28757,-9615484.08471,3558161.09813",
 				ms_date:"02/23/2010",
 				ms_year:"2010"
 	    }

        ,o_fwb_rgb_02_2010_20p: {
 				title: '2010 Fort Walton Beach',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_fwb_rgb_02_2010_20p',
 					title:'o_fwb_rgb_02_2010_20p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"fwb_rgb_02-2010_20p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9664964.8344,3552736.34409,-9631991.79824,3568833.47727",
 				ms_date:"02/23/2010",
 				ms_year:"2010"
 	    }

        ,o_niceville_rgb_02_2010_20p: {
 				title: '2010 Niceville',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_niceville_rgb_02_2010_20p',
 					title:'o_niceville_rgb_02_2010_20p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"niceville_rgb_02-2010_20p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9632045.90973,3561020.34243,-9616757.85881,3574536.04093",
 				ms_date:"02/23/2010",
 				ms_year:"2010"
 	    }

        ,o_mbb_10_14_2011_20p: {
 				title: '2011 Mid-Bay Bridge',
 				basemap: new esri.dijit.Basemap({
 					id: 'o_mbb_10_14_2011_20p',
 					title:'o_mbb_10_14_2011_20p',
 					layers: []
 				}),
 				ms_url: "http://gisvm101/ms/cgi/mapserv.exe?",
 				ms_layers:"mbb_10-14-2011_20p.ecw",
 				ms_map:"f:\\ms\\data\\orthos\\img.map",
 				ms_bounds:"-9620496.12361,3561430.43502,-9617479.57528,3567386.05959",
 				ms_date:"10/14/2011",
 				ms_year:"2011"
 	    }







    /*       ortho_mapserv: {
 				title: 'ortho_mapserv',
 				basemap: new esri.dijit.Basemap({
 					id: 'ortho_mapserv',
 					title:'ortho_mapserv',
 					//basemapGallery:,
                     //thumbnailUrl: '../../igis_thumb.png',
 					layers: [new MapservLayer({ wkid: 102100 })]
 				})
            },

            ortho_mapserv: {
 				title: 'ortho_mapserv',
 				basemap: new esri.dijit.Basemap({
 					id: 'ortho_mapserv',
 					title:'ortho_mapserv',
 					//basemapGallery:,
                     //thumbnailUrl: '../../igis_thumb.png',
 					 layers: [new BasemapLayer({
					        url: "http://204.49.20.75/ms/cgi/mapserv.exe?map=d:\\inetpub\\wwwroot\\ms6\\data\\pa\\map.map",
					        options: {
					             //format: "png",
					             visibleLayers: ['aerials']
					              ,request:"GetMap",
					              SERVICE:"WMS",
					              transparent:true,
					              format:"image/png",
					              bgcolor:"ffffff",
					              version:"1.3.0",
					              layers:"aerials",
					              styles: "",
					               CRS:"EPSG:3857"

					        }
                 })]
 				})
            },
*/
/*
          esri_terrain: {
 				title: 'esri_terrain',
 				basemap: new esri.dijit.Basemap({
 					id: 'esri_terrain',
 					title:'esri_terrain',
                      thumbnailUrl: 'igis_thumb.png',
 					layers: [new esri.dijit.BasemapLayer({
 						url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer'
 					})]
 				})
            },
          esri_streets: {
 				title: 'esri_streets',
 				basemap: new esri.dijit.Basemap({
 					id: 'esri_streets',
  					layers: [new esri.dijit.BasemapLayer({
 						url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer'
 					})]
 				})
            },
          esri_topo: {
 				title: 'esri_topo',
 				basemap: new esri.dijit.Basemap({
 					id: 'esri_topo',
  					layers: [new esri.dijit.BasemapLayer({
 						url: 'http://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer'
 					})]
 				})
            },
          esri_imagery: {
 				title: 'esri_imagery',
 				basemap: new esri.dijit.Basemap({
 					id: 'esri_imagery',
  					layers: [new esri.dijit.BasemapLayer({
 						url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
 					})]
 				})
            },
          nav_charts: {
 				title: 'nav_charts',
 				basemap: new esri.dijit.Basemap({
 					id: 'nav_charts',
  					layers: [new esri.dijit.BasemapLayer({
 						url: 'http://services.arcgisonline.com/arcgis/rest/services/Specialty/World_Navigation_Charts/MapServer'
 					})]
 				})
            }
            */
            /*,
            streets: {
                title: 'Streets'
            },
            satellite: {
                title: 'Satellite'
            },
            hybrid: {
                title: 'Hybrid'
            },
            topo: {
                title: 'Topo'
            },
            gray: {
                title: 'Gray'
            },
            oceans: {
                title: 'Oceans'
            },
            'national-geographic': {
                title: 'Nat Geo'
            },
            osm: {
                title: 'Open Street Map'
            }
          */


            // examples of custom basemaps
            /*streets: {
                title: 'Streets',
                basemap: new Basemap({
                    id: 'streets',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
                    })]
                })
            },
            satellite: {
                title: 'Satellite',
                basemap: new Basemap({
                    id: 'satellite',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                    })]
                })
            },
            hybrid: {
                title: 'Hybrid',
                basemap: new Basemap({
                    id: 'hybrid',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                    }), new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
                        isReference: true,
                        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7]
                    }), new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
                        isReference: true,
                        displayLevels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                    })]
                })
            },
            lightGray: {
                title: 'Light Gray Canvas',
                basemap: new Basemap({
                    id: 'lightGray',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
                    }), new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer',
                        isReference: true
                    })]
                })
            }*/
        }
    };
});