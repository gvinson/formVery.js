(function ( $ ) 
{
    $.fn.formVery = function( options ) {
        var opts = $.extend({
            errorColor: '#cf5c5c'
        }, $.fn.formVery.defaults, options);
    	//Find all textboxes in form
    	var inputs = $(this).find('.formVery');
        //find all number only inputs
        var numerics = $(this).find('.formNumeric'); 
        //find all monetary inputs
        var moneys = $(this).find('.formMoney');
        //radio buttons
        var radios = $(this).find('input[type=radio]');
        //all date inputs
        var dates = $(this).find('.formDate');
        //all email inputs
        var emails = $(this).find('.formEmail');
        //all credit card inputs
        var creditCards = $(this).find('.formCreditCard');

    	/**********************************************
    				ON KEYDOWN ON INPUT
            - Remove error class
    	**********************************************/
    	$(inputs).each(function(){
    		$(this).keydown(function(){
    			//Remove error class when text changes
    			$(this).removeClass(opts.errorClass);
    		});
            $(this).blur(function(){
                if($(this).val()=="") {
                    $(this).addClass("error");
                    $(this).val($(this).attr("default-data"));
                }
            });
    	});

        /** 
        * Add $ To Money textboxes
        **/
        $(moneys).each(function(){
            if(options.addMoneySign) 
                $(this).before("<span>$</span>");
            else
                console.log(options.addMoneySign);
        });

    	//For each input, make sure its value does not match its
    	//default value. If it does, add the error class.
		var valid = true;
        /** Check inputs default value 
        * Make sure the value of input doesnt equal default-data attr
        * of every input
        **/
        // ALL INPUTS
		$(inputs).each(function(){
    		if($(this).val() == $(this).attr("default-data")) {
    			$(this).addClass(opts.errorClass);
    			valid = false;
    		}
    		else {
                $(this).removeClass(opts.errorClass);
            }
    	});
        /** Check numeric inputs
        * Check each numeric input to only contain 0-9 in the
        * textbox. No other characters are allowed.
        **/
        // NUMERICS
        $(numerics).each(function(){
           var inputVal = $(this).val();
           var validRegex = /[0-9]/;
           if(!validRegex.test(inputVal)){
                $(this).addClass(opts.errorClass);
                valid = false;
           } else {
                $(this).removeClass(opts.errorClass);
           }
        });
         /** Check monetary inputs
        * Check each money input to only allow numbers and one
        **/
        // MONEY
        $(moneys).each(function(){
           var inputVal = $(this).val();
           var validRegex = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/;
           if(!validRegex.test(inputVal)){
                $(this).addClass(opts.errorClass);
                valid = false;
           } else {
                $(this).removeClass(opts.errorClass);
           }
        });
        // MONEY
        $(moneys).blur(function(){
            if($(this).val() != $(this).attr("default-data")){
                var num = parseFloat($(this).val());
                var cleanNum = num.toFixed(2);
                $(this).val(cleanNum);
                if(num/cleanNum < 1) {
                    var dec = $(this).val().indexOf(".");
                   console.log(dec);
                }
            }
        });

        // RADIOS
        //array of all radio button names
        var radioNames = [];
        $(radios).each(function(){
            var name = $(this).attr("name");
            radioNames.push(name);
        });

        /** 
        *   In each radioName, check to see if the radio group has a 
        *   radio button selected. If it doesn't, add error class
        *   and set valid=false. Else, valid=true
        **/
        // RADIOS
        for(var key in radioNames) {
            var checked = false;
            $("input[type=radio][name="+radioNames[key]+"]").each(function(){
                if($(this).is(":checked")) {
                    checked = true;
                }
            });

            var radio = $("input[type=radio][name="+radioNames[key]+"]");
            var color = $(radio).css("color");
            if(!checked) {
                $(radio).next().css({
                    color: opts.errorColor
                });
                valid = false;
            } else {
                $("input[type=radio][name="+radioNames[key]+"]").next().css({
                    color: color
                });
            }
        } /* End Validate Radio Buttons*/

        /** DATES
        *   Validate date textboxes. Checks the length of the 
        *   date box against the dateStyle option passed in.
        **/
        // DATES
        $(dates).each(function(){
            var date = $(this).val().split(opts.dateSplitter),
                style = opts.dateStyle.split(opts.dateSplitter),
                elem = $(this);

            //for each mm, dd and yyyy in the style array...
            for(i in style) {
                //if the date[i] is undefined, valid = false
                if(typeof date[i] === "undefined") {
                    elem.addClass(opts.errorClass);
                    valid = false;
                } else{
                    if(date[i].length != style[i].length && date[i] != 'undefined') {
                       elem.addClass(opts.errorClass);
                       valid = false;
                    } else {
                        elem.removeClass(opts.errorClass);
                    }
                }
            }
        });

         /** EMAILS
        *   Validates email textboxes against a complex
        *   Regular Expression. If it returns false,
        *   add the error class and sets valid to false.
        **/
        // EMAILS
        $(emails).each(function(){
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

            if(!pattern.test($(this).val())){
                valid = false;
                $(this).addClass(opts.errorClass);
            } else {
                $(this).removeClass(opts.errorClass);
            }
        });
        
        $(creditCards).each(function(){
            var types = [
                ['Visa','^4[0-9]{12}(?:[0-9]{3})?$'],
                ['Master Card','^5[1-5][0-9]{14}$'],
                ['American Express','^3[47][0-9]{13}$'],
                ['Discover','^6(?:011|5[0-9]{2})[0-9]{12}$']
            ];
            var ccValid;
            var correctType = "";
            for(t in types) {
                var pattern = new RegExp(types[t][1]);
                if(!pattern.test($(this).val())) {
                    ccValid = false;
                } else {
                    ccValid = true;
                    correctType = types[t][0];
                    break;
                }
            }
            if(ccValid) {
                console.log(correctType);
                $(this).removeClass(opts.errorClass);
            } else {
                valid = false;
                $(this).addClass(opts.errorClass);
            }
        });
    
        /** If the form is valid
        * Do this
        **/
    	opts.success(valid);
    };
}( jQuery ));