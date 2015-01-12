define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/topic',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/DropDownMenu',
    'dijit/MenuItem',
    'dojo/_base/array',
    'dojox/lang/functional',
    'dojo/text!./Basemaps/templates/Basemaps.html',
    'esri/dijit/BasemapGallery',
    'esri/geometry/Extent',
     "esri/SpatialReference",
     './mapservLayer',
    'dojo/i18n!./Basemaps/nls/resource',
    'dijit/form/DropDownButton',
    'xstyle/css!./Basemaps/css/Basemaps.css'
], function (declare,lang,on,topic,  _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, DropDownMenu, MenuItem, array, functional, template, BasemapGallery,Extent,SpatialReference,MapservLayer, i18n) {

    // main basemap widget
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        i18n: i18n,
        mode: 'agol',
        title: i18n.title,
        //baseClass: 'gis_Basemaps_Dijit',
        //buttonClass: 'gis_Basemaps_Button',
        //menuClass: 'gis_Basemaps_Menu',
        mapStartBasemap: 'streets',
        basemapsToShow: ['streets', 'satellite', 'hybrid', 'topo', 'gray', 'oceans', 'national-geographic', 'osm'],
        validBasemaps: [],
        availableWMSBasemaps:[],
        activeBasemap:'',
        postCreate: function () {
            this.inherited(arguments);
            this.currentBasemap = this.mapStartBasemap || null;

            this.own(on(this.map, 'extent-change', lang.hitch(this, 'updateLocation')));

            if (this.mode === 'custom') {
                this.gallery = new BasemapGallery({
                    map: this.map,
                    showArcGISBasemaps: false,
                    basemaps: functional.map(this.basemaps, function (map) {
                           return map.basemap;
                    })
                });
                this.gallery.startup();
            }

            this.menu = new DropDownMenu({
                style: 'display: none;' //,
                //baseClass: this.menuClass
            });

            var _this=this;
            array.forEach(this.basemapsToShow, function (basemap) {
                if (this.basemaps.hasOwnProperty(basemap)) {
                    //this.activeBasemap=this.basemap;

                    if (this.basemaps[basemap].ms_url || (this.basemaps[basemap].image_slider)) {
                         this.availableWMSBasemaps.push(this.basemaps[basemap]);
					}

                    var menuItem = new MenuItem({
                        id: basemap,
                        label: this.basemaps[basemap].title,
                        iconClass: (basemap == this.mapStartBasemap) ? 'selectedIcon' : 'emptyIcon',
                        onClick: lang.hitch(this, function () {
                            if (basemap !== this.currentBasemap) {
								if (this.basemaps[basemap].ms_url) {
                                   this.toggleCustomBasemap(this.basemaps[basemap],basemap);
								} else {
									this.currentBasemap = basemap;
									if (this.mode === 'custom') {
										this.gallery.select(basemap);
									} else {
										this.map.setBasemap(basemap);
									}
							    }
                                var ch = this.menu.getChildren();
                                array.forEach(ch, function (c) {
                                    if (c.id == basemap) {
                                        c.set('iconClass', 'selectedIcon');
                                    } else {
                                        c.set('iconClass', 'emptyIcon');
                                    }
                                });
                            }
                        })
                    });
                    this.menu.addChild(menuItem);
                }
            }, this);
            this.dropDownButton.set('dropDown', this.menu);


            _this.activeBasemap=this.currentBasemap;
			// listen for request for valid basemaps and then publish response
			topic.subscribe('ModBasemaps/getCurrentBasemaps', function (r) {
				 //console.log('ModBasemaps/getCurrentBasemaps  _this.activeBasemap',_this.activeBasemap);
				 topic.publish('ImageSlider/recieveBasemaps', {
					     basemaps:_this.availableWMSBasemaps,
				         activeBasemap:_this.basemaps[_this.activeBasemap],
				         currentBasemap:_this.basemaps[_this.activeBasemap]
                 });
			});

			// listen for request to toggle basemap
			topic.subscribe('ModBasemaps/setCurrentBasemap', function (r) {
				//console.log('ModBasemaps/setCurrentBasemap',r);
				_this.autoCheckDropdownItem(r.activeBasemap.title) ;
			});
        }
        ,autoCheckDropdownItem:function(bm_title) {
			//console.log('autoCheckDropdownItem',bm_title);
	       var _this=this;
           var ch = this.menu.getChildren();
           array.forEach(ch, function (c) {
              if ((c.id.indexOf("o_")==0) || (_this.basemaps[c.id].image_slider)) {
                 if (c.label == bm_title) {
                       c.set('iconClass', 'selectedIcon');
                       if (c.id.indexOf("o_")==0) {
                            _this.toggleCustomBasemap(_this.basemaps[c.id],c.id);
                       } else { // toggle ags map
                            _this.toggleAGSBasemap(c.id);
					   }
                 } else {
                       c.set('iconClass', 'emptyIcon');
                 }
			  }
          });
		}
        ,checkbasemapextent:function(ext,basemapid){
            var isIn=true;
            var bm=this.basemaps[basemapid];
            var exitms=bm.ms_bounds.split(",");
            var bmext  = new Extent(exitms[0],exitms[1],exitms[2],exitms[3], ext.spatialReference );

		    if (!bmext.intersects(ext)) {
			   isIn=false;
			}
            return isIn;
		}
        ,updateLocation:  function(evt) {
			//console.log('updateLocation');
		  var extnt=evt.extent;
	      this.availableWMSBasemaps=[];
          var _this=this;
           // This handles removing basemaps that are not within the map extent
           var menuitms= this.menu.getDescendants();
           array.forEach(menuitms, function (mi) {
                 //check basemap extents for mi.id but, only if it is a mapserver layer
                 if (mi.id.indexOf("o_")==0 || (this.basemaps[mi.id].image_slider)) {
					 var isin=this.checkbasemapextent(extnt,mi.id);
					 //////console.log( "isin " ,isin);
					 if (!isin) {
						 mi.destroyRecursive(false);
					 } else {
						 this.availableWMSBasemaps.push(this.basemaps[mi.id]);
					 }
				 }
            }, this);

            var isAdded=false;
            // This handles adding basemaps that are within the map extent but had been previously removed
            array.forEach(this.basemapsToShow, function (basemap) {
                if (this.basemaps.hasOwnProperty(basemap)) {

                 if (this.basemaps[basemap].ms_url || (this.basemaps[basemap].image_slider)) {
                         //this.availableWMSBasemaps.push(this.basemaps[basemap]);
				 }
                 if (basemap.indexOf("o_")==0 || (this.basemaps[basemap].image_slider)) {
					 var isin=this.checkbasemapextent(extnt,basemap);
					 //var bm=this.basemaps[basemap];

					 var cidx=this.menu.getIndexOfChild(dijit.byId(basemap));

					 if (isin && cidx==-1) { // if isin and not in dropdown add basemap to dropdown

 						this.availableWMSBasemaps.push(this.basemaps[basemap]);

 						var menuItem = new MenuItem({
							id: basemap,
							label: this.basemaps[basemap].title,
							iconClass: (basemap == this.mapStartBasemap) ? 'selectedIcon' : 'emptyIcon',
							onClick: lang.hitch(this, function () {

								_this.activeBasemap=this.basemap;

								if (basemap !== this.currentBasemap) {
									if (this.basemaps[basemap].ms_url) {
									   this.toggleCustomBasemap(this.basemaps[basemap],basemap);
									} else {

										this.currentBasemap = basemap;
										if (this.mode === 'custom') {
											this.gallery.select(basemap);
										} else {
											this.map.setBasemap(basemap);
										}
									}
									var ch = this.menu.getChildren();
									array.forEach(ch, function (c) {
										if (c.id == basemap) {
											c.set('iconClass', 'selectedIcon');
										} else {
											c.set('iconClass', 'emptyIcon');
										}
									});
								}
							})
						});

						//var idx=this.getSortedIdx(basemap);
						//this.menu.addChild(menuItem,idx);
						this.menu.addChild(menuItem);
						isAdded=true;
				     }
				 }
                }
            }, this);

            //console.log('!!!! updateLocation  b4 this.availableWMSBasemaps',this.activeBasemap);
            if (isAdded) this.sortMenuItems();  // resort menu items
            //console.log('!!!! updateLocation  after this.availableWMSBasemaps',this.activeBasemap);

            // set the dropdown selection to the current basemap
            this.autoCheckDropdownItem(this.basemaps[this.activeBasemap].title) ;

            var _this=this;
		    topic.publish('ImageSlider/recieveBasemaps', {
					     basemaps:_this.availableWMSBasemaps,
				         activeBasemap:_this.basemaps[_this.activeBasemap],
				         currentBasemap:_this.basemaps[_this.activeBasemap]
            });

		}
		,getSortedIdx: function(basemapid){
            var idx=-1;
            var srtarry=new Array();

            var menuitms= this.menu.getDescendants();
            array.forEach(menuitms, function (mi) {
                 ////console.log("mi",mi);
                 srtarry.push(mi.label);

             }, this);

             srtarry.push(this.basemaps[basemapid].title);
             srtarry.sort();
             idx=srtarry.indexOf(this.basemaps[basemapid].title);
             return idx;
		}
		,sortMenuItems: function(){
             var srtarry=new Array();
             var cntr=0;
             var _this=this;
             var menuitms= this.menu.getDescendants();
             array.forEach(menuitms, function (mi) {
                 srtarry.push(mi.label);
             }, this);

             // srtarry.sort();

             // destroy all menu items
             array.forEach(menuitms, function (mi) {
                 mi.destroyRecursive(false);
             }, this);

             // readd menu items
            array.forEach(this.basemapsToShow, function (basemap) {
                if (this.basemaps.hasOwnProperty(basemap)) {

                 //this.activeBasemap=this.basemap;

                 if (this.basemaps[basemap].ms_url || (this.basemaps[basemap].image_slider)) {
                         this.availableWMSBasemaps.push(this.basemaps[basemap]);
				 }

                   if (srtarry.indexOf(this.basemaps[basemap].title) !=-1){
					    //////console.log("ReAdding menu item",basemap);
						var menuItem = new MenuItem({
							id: basemap,
							label: this.basemaps[basemap].title,
							iconClass: (basemap == this.mapStartBasemap) ? 'selectedIcon' : 'emptyIcon',
							onClick: lang.hitch(this, function () {
								if (basemap !== this.currentBasemap) {

									_this.activeBasemap=this.basemap;

									//////console.log("this.basemaps[basemap]",this.basemaps[basemap]);
									if (this.basemaps[basemap].ms_url) {
									   //////console.log("this.basemaps[basemap].url");
									   this.toggleCustomBasemap(this.basemaps[basemap],basemap);


									} else {

										this.currentBasemap = basemap;
										if (this.mode === 'custom') {
											this.gallery.select(basemap);
										} else {
											this.map.setBasemap(basemap);
										}
									}
									var ch = this.menu.getChildren();
									array.forEach(ch, function (c) {
										if (c.id == basemap) {
											c.set('iconClass', 'selectedIcon');
										} else {
											c.set('iconClass', 'emptyIcon');
										}
									});
								}
							})
						});

						this.menu.addChild(menuItem);
					  }
				  }
            }, this);
		}
        ,toggleCustomBasemap : function(bm,bm_id){
			//this.inherited(arguments);
			//console.log('toggleCustomBasemap');

		   this.activeBasemap=bm_id;

           this.hideBaseMap();
            var mslyr=new MapservLayer({
				 ms_url: bm.ms_url,
				 ms_map:bm.ms_map,
				 ms_layers: bm.ms_layers,
				 wkid: 102100
				});

             mslyr.id="layer0";
		     this.map.addLayer(mslyr)
		     this.map.reorderLayer(mslyr, 0);

            var _this=this;
		    topic.publish('ImageSlider/changeBasemap', {
					     basemap:_this.basemaps[_this.activeBasemap]
           });

		},
		toggleAGSBasemap: function(bm_id){
			//console.log('toggleAGSBasemap');
		   if (this.mode === 'custom') {
			      //if (this.map.getBasemap() !== this.mapStartBasemap) { //based off the title of custom basemaps in viewer.js config
			      this.gallery.select(bm_id);

		    } else {
			     //if (this.mapStartBasemap) {
			     //if (this.map.getBasemap() !== this.mapStartBasemap) { //based off the agol basemap name
			     this.map.setBasemap(bm_id);
            }
		},
		toggleCustomBasemapByDate: function(ms_date) {

           var layers=[];
           var menuitms= this.menu.getDescendants();
           array.forEach(menuitms, function (mi) {

                 if (mi.id.indexOf("o_")==0 || (this.basemaps[mi.id].image_slider)) {
					 var isin=this.checkbasemapextent(extnt,mi.id);
					 if (!isin) {
						 mi.destroyRecursive(false);
					 } else {
						 this.availableWMSBasemaps.push(this.basemaps[mi.id]);
					 }
				 }
            }, this);

		},
	     hideBaseMap: function(){
			 //this.inherited(arguments);
			var _this = this;
			var lyrs2rem=new Array();
			dojo.forEach(this.map.layerIds, function(id){
			var layer = _this.map.getLayer(id);

			if (layer.id.indexOf('layer') !=-1){
				  var ltr=_this.map.getLayer(layer.id);
				  lyrs2rem.push(ltr);
				  //_this.map.removeLayer(_this.map.getLayer(layer.id));
			  }
		    });
            _this.map.removeLayer(lyrs2rem[0]);
		  }  ,
        startup: function () {
           this.inherited(arguments);

           //console.log('startup');

           this.activeBasemap=this.mapStartBasemap;

           if (this.mode === 'custom') {
                if (this.map.getBasemap() !== this.mapStartBasemap) { //based off the title of custom basemaps in viewer.js config
                    this.gallery.select(this.mapStartBasemap);
                }
            } else {
                if (this.mapStartBasemap) {
                    if (this.map.getBasemap() !== this.mapStartBasemap) { //based off the agol basemap name
                        this.map.setBasemap(this.mapStartBasemap);
                    }
                }
            }
             /*var _this=this;
			 topic.publish('ImageSlider/recieveBasemaps', {
					     basemaps:_this.availableWMSBasemaps,
				         activeBasemap:_this.basemaps[_this.activeBasemap],
				         currentBasemap:_this.basemaps[_this.activeBasemap]
             });
             */
        }
    });
});