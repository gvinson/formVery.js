formVery.js
===========

formVery.js is a simple jQuery plugin that validates html forms. It is very simple to use
and very lightweight. The .formVery() function returns a boolean value. It is suggested to
test against this boolean value in the "success" function of the .formVery() call.

How To Use
===========
```javascript
// #send is the form's submit button
// #contactForm is the form itself

$("#send").on('click',function(e){
	//prevent form from being submitted before validation
	e.preventDefault();

	$("#contactForm").formVery({
        errorClass: 'error',
        addMoneySign: true,
        dateStyle: 'mm/dd/yyyy',
        dateSplitter: '/',
        success: function(valid){
        	//if successful
        	if(valid){
            	//perform success function here
            } else {
            	//perform error function here
            }
        }
    });
});
```

```HTML
<form id="contactForm">
	Name:<br>
	<input type="text" name="userName" id="userName" class="formVery" default-data="" /><br><br>
	Email:<br>
	<input type="text" name="userEmail" id="userEmail" class="formVery formEmail" value="Email Address" default-data="Email Address" /><br><br>
	<input type="submit" id="send" value="Send" />
</form>
```

<h3>Steps to implement formVery.js</h3>
<ul>
	<li>Add formVery.js and the jQuery library to your page</li>
	<li>Add the class name "formVery" to all inputs you want to verify, or not allow null values</li>
	<li>Add the "default-data" attribute and set it to the default value of that input (default-data="" if input is empty)</li>
	<li>- Optional - Add additional class names (listed below in table) for special validations</li>
</ul>

<h3>Special Validation</h3>
If you want to have special validation, you must add the following classes to validate the corresponding input types:
<table>
	<tr>
		<th>Class Name</th>
		<th>Validation Type</th>
	</tr>
	<tr>
		<td>formVery</td>
		<td>Makes sure input is not empty</td>
	</tr>
	<tr>
		<td>formNumeric</td>
		<td>Numbers Only</td>
	</tr>
	<tr>
		<td>formMoney</td>
		<td>Styles input like money</td>
	</tr>
	<tr>
		<td>formDate</td>
		<td>Numerical Dates Only</td>
	</tr>
	<tr>
		<td>formEmail</td>
		<td>Email Address Only</td>
	</tr>
	<tr>
		<td>formCreditCard</td>
		<td>Credit Card Numbers Only</td>
	</tr>
</table>

API
====
<h3>errorClass</h3>
The errorClass property is the CSS class that will be applied to the input on error. This plug in does not how any text associated with the errors. Instead, it modifies the actual input's apperance with the CSS class.

<h3>dateStyle</h3>
The dateStyle property is the format in which you wish date input textboxes to resemble. For example, if you wanted the dates to be in the form of
01/28/1989, the dateStyle would be set to 'mm/dd/yyyy'. If you wanted it to be like 1-28-99, you would pass in 'm-dd-yy'.

<h3>dateSplitter</h3>
The dateSplitter property is what the delimeter is for the dateStyle. You <u><b>must</b></u> inlcude this if you set dateStyle.

<h3>addMoneySign</h3>
The addMoneySign property tells formVery.js to add a '$' to the left of the input box for all .formMoney class inputs.

<h3>success</h3>
The success property is a function. This function is what runs when the form is finished validating. It is best to check if the 'valid' parameter is set to true or false and perform the needed actions inside the if statement.

<br><br><br>

