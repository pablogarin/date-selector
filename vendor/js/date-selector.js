/*
* Date Selector Plugin for jQuery
* Author: Pablo Garín
* 
* Use:
* var options = {
* 	format            : "d-m-Y",
*		allowFutureDates  : false,
*		months            : ["January","February","March","April","May","June","July","August","September","October","November","December"],
*		placeholders      : {
*			day   : "Day",
*			month : "Month",
*			year  : "Year"
*		}
* }
* $("input.date").dateSelector(options);
* 
 */

(function( $ ){

	$.fn.dateSelector = function( options ){
		var self  = this,
				opts  = $.extend( {}, $.fn.dateSelector.defaults, options );

		self.parents = [];
		self.inputs  = [];
		self.values  = [];

		/* Methods */
		self.validateDate = function(evt) {
			var index     = $(self.parents).index( $(this).parents('.date-selector:first') ),
					container = self.parents[index],
					input     = self.inputs[index],
					value     = self.values[index],
					day     = $(container).find('.date-selector__day').val(),
					month   = $(container).find('.date-selector__month').val(),
					year    = $(container).find('.date-selector__year').val(),
					code    = evt.keyCode || evt.which,
					newChar = String.fromCharCode(code),
					lastAvailable = (new Date(year,(parseInt(month)+1),0)).getDate();
					dateToCheck   = new Date(year, month, day),
					currentDate   = new Date();
			
			// reset date
			$(input).val(value);
			$(container).removeClass("has-error");

			if( this.type == 'select-one' ){
				// validations for select.
			} else {
				if( isNaN(newChar) ) {
					var value = $( this ).val(),
							index = value.toUpperCase().indexOf(newChar);
					if( index >= 0 ){
						$( this ).val( value.slice(0,index) + value.slice(index+1) );
						return false;
					}
				}
			}

			if( day > 31 ){
				$(container).find(".date-selector__day").val(31).focus();
			}

			if( day.length == 0 || month==null ){
				return false;
			}

			if( typeof allowFutureDates === 'undefined' ) {
				allowFutureDates = false;
			}

			if( lastAvailable < day ) {
				$(container).find(".date-selector__day").val(lastAvailable).focus();
				return false;
			}

			if( (!opts.allowFutureDates) && (dateToCheck > currentDate) ){
				$(container).addClass("has-error");
				return false;
			}
			input.val(self.dateFormat(day,month,year));
			return true;
		},
		self.dateFormat = function(d,m,y) {
			var format = $.fn.dateSelector.defaults.format,
					days   = $.fn.dateSelector.defaults.days,
					months = $.fn.dateSelector.defaults.months;
		  // fecha
		  var date = new Date(y,m,d), year = '', month = '', day = '', time = '';
		  var matches  = date.toISOString().match(/(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)
		  year  = matches[1];
		  month = matches[2];
		  day   = matches[3];
		  hour  = matches[4];
		  mins  = matches[5];
		  secs  = matches[6];
		  dateObj = {
		    "Y":year,
		    "y":year.slice(-2),
		    "m":month,
		    "M":months[date.getMonth()],
		    "d":day,
		    "D":days[date.getDay()],
		    "H":hour,
		    "i":mins,
		    "s":secs
		  }

		  // formato
		  formatArray  = format.match(/[YymMdDHis]/g);
		  formatedDate = format;
		  for( var el in formatArray ){
		    var element = formatArray[el];
		    if( typeof dateObj[element] !== 'undefined' ){
		      formatedDate = formatedDate.replace(element,dateObj[element]);
		    }
		  }
		  return formatedDate;
		}

		/* Main */
		return this.each(function(index){
			var _self          = $( this ),
					dateContainer  = document.createElement("div"),
					dayContainer   = document.createElement("div"),
					monthContainer = document.createElement("div"),
					yearContainer  = document.createElement("div"),
					dayInput       = document.createElement("input"),
					monthInput     = document.createElement("select"),
					yearInput      = document.createElement("input"),
					currentValue   = this.value,
					dayValue       = "",
					monthValue     = null,
					yearValue      = "";
			
			/* Current Value */
			if( currentValue.length > 0 ) {
				currentValue = new Date(this.value);
				dayValue     = currentValue.getDate();
				monthValue   = currentValue.getMonth();
				yearValue    = currentValue.getFullYear();
			}
			
			/* Hidde Input */
			_self.css('display', 'none');

			/* Inputs */
			dayContainer.className   = "date-selector__input";
			monthContainer.className = "date-selector__input";
			yearContainer.className  = "date-selector__input";
			
			/* Day */
			dayInput.type        = "text";
			dayInput.className   = "date-selector__day";
			dayInput.maxLength   = "2";
			dayInput.placeholder = opts.placeholders.day;
			dayInput.value       = dayValue;
			dayInput.onkeyup     = self.validateDate
			dayContainer.appendChild(dayInput);
			dateContainer.appendChild(dayContainer);

			/* Month */
			monthInput.className = "date-selector__month";
			monthInput.onchange  = self.validateDate
			var _option 				 = document.createElement('option');
			_option.value 			 = "N";
			_option.disabled 		 = "disabled";
			_option.selected 		 = "selected";
			_option.appendChild(document.createTextNode(opts.placeholders.month))
			monthInput.appendChild(_option);
			$.each(opts.months, function( value, text ){
				var _option   = document.createElement('option');
				_option.value = value;
				if( value == monthValue ){
					_option.selected = "selected";
				}
				_option.appendChild(document.createTextNode(text))
				monthInput.appendChild(_option);
			});
			monthContainer.appendChild(monthInput);
			dateContainer.appendChild(monthContainer);

			/* Year */
			yearInput.type        = "text";
			yearInput.className   = "date-selector__year";
			yearInput.maxLength   = "4";
			yearInput.placeholder = opts.placeholders.year;
			yearInput.value       = yearValue;
			yearInput.onkeyup     = self.validateDate;
			yearContainer.appendChild(yearInput);
			dateContainer.appendChild(yearContainer);

			/* Container */
			dateContainer.className = "date-selector";
			self.parents[index] = dateContainer;
			self.inputs[index]  = _self;
			self.values[index]  = _self.val();
			$(dateContainer).insertAfter(_self);
			return _self;
		});
	}

	/* Defaults */
	$.fn.dateSelector.defaults = {
		format            : "d-m-Y",
		allowFutureDates  : false,
		days              : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		months            : ["January","February","March","April","May","June","July","August","September","October","November","December"],
		placeholders      : {
			day   : "Day",
			month : "Month",
			year  : "Year"
		}
	}
}( jQuery ));