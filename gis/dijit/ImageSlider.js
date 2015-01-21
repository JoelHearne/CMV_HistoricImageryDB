define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/connect',
    'dojo/topic',
    'dojo/ready', 'dojo/parser', 'dijit/registry',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/array',
    'dojo/dom',
    'dojox/lang/functional',
    'dojo/text!./ImageSlider/templates/ImageSlider.html',
    'esri/geometry/Extent',
    'esri/SpatialReference',
    'esri/TimeExtent',
    'esri/dijit/TimeSlider',
    './mapservLayer',
    'dijit/form/DropDownButton',
    'xstyle/css!./ImageSlider/css/ImageSlider.css',
    'dojo/domReady!'
], function (declare,lang,on,connect,topic,ready,parser,registry,_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,  arrayUtils, dom,functional, template,Extent,SpatialReference,TimeExtent, TimeSlider,MapservLayer) {

    // main basemap widget
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        timeStepIntervals:null,
        timeSlider:null,
        labels:null,
        availableWMSBasemaps:[],
        activeBasemap:null,
        disableChangeBasemap:false,
        ts_ocbm_event:null,
        postCreate: function () {
            this.inherited(arguments);

        }
        ,startup: function () {
            this.inherited(arguments);

            this.timeSlider = new TimeSlider({
             style: "width: 100%;"
            }, dom.byId("timeSliderDiv"));

            //var timeExtent = new TimeExtent();
            //timeExtent.startTime = new Date("1/1/2001 UTC");
            //timeExtent.endTime = new Date("12/31/2012 UTC");

            this.timeSlider.setThumbCount(1);
            this.timeStepIntervals = [new Date("01/01/2004") , new Date("01/01/2005"), new Date("01/01/2010"),new Date("01/01/2013")];

            this.timeSlider.setTimeStops(this.timeStepIntervals);
            this.timeSlider.singleThumbAsTimeInstant(true);
		    this.timeSlider.setThumbIndexes([9]);
            this.timeSlider.setThumbMovingRate(3000);
            this.timeSlider.startup();

            //add labels for every other time stop
            this.labels = arrayUtils.map(this.timeSlider.timeStops, function(timeStop, i) {
                return timeStop.getUTCFullYear();
            });

            this.timeSlider.setLabels(this.labels);

            var _this=this;
            ready(function(){
                _this.ts_ocbm_event=on(_this.timeSlider, 'time-extent-change', lang.hitch(_this, 'changeBasemap'));
                _this.own(_this.ts_ocbm_event);
            });

            // Listener to get the active basemaps from the ModBasemaps widget
			topic.subscribe('ImageSlider/recieveBasemaps', function (r) {
				_this.availableWMSBasemaps=r.basemaps;
				_this.activeBasemap=r.activeBasemap;
				_this.updateRanges();

			});

			// change slider if modbasemaps changes
			topic.subscribe('ImageSlider/changeBasemap', function (r) {
			    connect.disconnect(_this.ts_ocbm_event);
			    _this.updateSliderIndex(r.basemap);
				_this.ts_ocbm_event=on(_this.timeSlider, 'time-extent-change', lang.hitch(_this, 'changeBasemap'));
				_this.own(_this.ts_ocbm_event);
			});

			// Send request to get the active basemaps from the ModBasemaps widget
			topic.publish('ModBasemaps/getCurrentBasemaps', {
			       id:'startup'
            });
        }
        ,updateSliderIndex: function(bm){
          console.log("updateSliderIndex",bm);
          this.disableChangeBasemap=true;  // we want to suppress changebasemap from publishing request to modbasemaps
          var newidx=-1;

		  arrayUtils.forEach(this.timeSlider.timeStops, function (timeStop,i) {
                  var tsdate=new Date(timeStop);
                  var bmdate=new Date(bm.ms_date);
                  if (bmdate.valueOf()==tsdate.valueOf()){
					  //newActvBM=bm;
					  newidx=i;
				  }
             }, this);

            if (newidx !=-1) this.timeSlider.setThumbIndexes([newidx]);
			this.disableChangeBasemap=false;
	    }
        ,updateRanges: function () {  // updates the date ranges for image datasets that are within the visual map extent

            console.log("updateRanges  this.activeBasemap",this.activeBasemap);

            connect.disconnect(this.ts_ocbm_event);
            ///////////////////////////////////////////////////////////////////////////////////
            // Sync and sort timeslider date array and labels with this.availableWMSBasemaps
            ///////////////////////////////////////////////////////////////////////////////////
            this.disableChangeBasemap=true;
            var ttimestops=arrayUtils.map(this.availableWMSBasemaps, function(basemap, i) {

                return  basemap.ms_date;

            });

            // sort array and make distinct
            ttimestops=this.uniq(ttimestops);
            ttimestops=this.datesort(ttimestops);

            this.timeStepIntervals =ttimestops;
            this.timeSlider.setTimeStops(this.timeStepIntervals);

            this.labels = arrayUtils.map(this.timeSlider.timeStops, function(timeStop, i) {
                //var ldate=new Date(timeStop);
                //var tslbl=ldate.getMonth() + "/" + ldate.getFullYear();
                //return tslbl;
                return timeStop;

            });

            this.timeSlider.setLabels(this.labels);
            if (this.activeBasemap)
                     this.updateSliderIndex(this.activeBasemap);

            this.disableChangeBasemap=false;
			this.ts_ocbm_event=on(this.timeSlider, 'time-extent-change', lang.hitch(this, 'changeBasemap'));
			this.own(this.ts_ocbm_event);
        }
       ,datesort: function (arr) {
			arr.sort(function(a,b)
			{
			    a = new Date(a);
			    b = new Date(b);
			    return a-b;
           });
           return arr;
		}
        ,uniq: function (a) {
			var seen = {};
			return a.filter(function(item) {
				return seen.hasOwnProperty(item) ? false : (seen[item] = true);
			});
		}

        ,changeBasemap: function (evt) {  // changes the basemap to the selected image dataset

            console.log("changeBasemap",evt," this.disableChangeBasemap",this.disableChangeBasemap);

            if (!this.disableChangeBasemap) {
            // update the label
            /*
            var yrStr  = evt.endTime.getUTCFullYear();
            dom.byId("daterange").innerHTML = "<i> " + yrStr  + "<\/i>";
            */

            ///////////////////////////////////////////////////////////////////////////////////
            // Change the basemap to reflect the currently selected year.
            ///////////////////////////////////////////////////////////////////////////////////
            // Get the basemap that matches evt.endTime
             var newActvBM=null;
             arrayUtils.forEach(this.availableWMSBasemaps, function (basemap) {
                  var bmdate=new Date(basemap.ms_date);
                  if (bmdate.valueOf()==evt.endTime.valueOf()){
					  //this.activeBasemap=basemap;
					  newActvBM=basemap;
				  }
             }, this);

            if (newActvBM !=null){
                 if (newActvBM !=this.activeBasemap){
					 this.activeBasemap=newActvBM;
			     }
			}

			 console.log("changeBasemap set basemap newActvBM",newActvBM);

            var _this=this;
            // send a message to mod basemaps to show the selected basemap
            if (this.activeBasemap  ) {
               topic.publish('ModBasemaps/setCurrentBasemap', {
			 		 activeBasemap:_this.activeBasemap
               });
		    }

		    //if (this.disableChangeBasemap) this.disableChangeBasemap=false;
		 }

            // maybe show some info about the basemap in the timeslider widget

	    }

    });
});