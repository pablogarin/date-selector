Date Selector Plugin for jQuery
===================================================
Author: Pablo Garín

Use:

You have to include both files (date-selector.css and date-selector.js) into your project.

<pre>
<input class="date" type="text" value="01-01-1970" name="date-field">
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

Options
===================================================
| format            |   The format for the date input field.
                    Formats:
                      Y: Full year.
                      y: Last 2 digits from year.
                      m: Month number.
                      M: Month name.
                      d: Date.
                      D: Day of week.
                    Default:
                      "d-m-Y"
| allowFutureDates  |     Specify if the date can only be a past date. Highlights error.
| months            |   Array with the months names for the month combobox.
| placeholders      |   JSON with the fields placeholder.
                      Fields:
                        - day
                        - month
                        - year
