Date Selector Plugin for jQuery
===================================================
Author: Pablo Garín

Use:

You have to include both files (.css and .js) into your project, and then add the <pre>link</pre> and <pre>script</pre> tags for each.

<pre>
<link rel="stylesheet" href="date-selector.css" />
<script type="text/javascript" src="date-selector.js"></script>
<script type="text/javascript">
  var options = {
    format            : "d-m-Y",
    allowFutureDates  : false,
    months            : ["January","February","March","April","May","June","July","August","September","October","November","December"],
    placeholders      : {
      day   : "Day",
      month : "Month",
      year  : "Year"
    }
  }
  $("input.date").dateSelector(options);
</script>
</pre>
