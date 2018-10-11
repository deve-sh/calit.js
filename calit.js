/*
    CALIT.JS
    ----
    JavaScript Utility to Introduce a Calendar to a given element in the form of a table.
    Programmed by Devesh Kumar.
    Don't Get Mad at me. The main aim of this was to use no classes and objects.
    http://github.com/deve-sh
*/

// Required Variables

var montharray=[ // List of Months indexed 0 to 11.
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var dayarray=[
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Variable Declerations

var today=new Date();
var month;
var date;
var year;
var day;
var userdate;
var ndays;
var nweeks;
var todaysday;
var dynamicdate;
var remdays;
var execution=0;

// Now the functions

/*
  Function to initialise the values for the setting of the calendar widget based on the values obtained from the user.
*/


function initialise(month,year,datef)    // The backbone of the entire code.
{
  year=parseInt(year);

  if(!datef)
  {
    datef=new Date();   // Today
  }

  if(month==today.getMonth())      // If the month passed is the current month.
  {

    date=datef.getDate();   // Date of the month.

    month=montharray[datef.getMonth()]; // Current Month

    day=dayarray[date];  // Today's Day

    if(!year)
    {
      year=datef.getFullYear();    // The Current Year.
    }

    if((datef.getMonth()+1)<=6)   // If the month is before June
    {
      if((datef.getMonth()+1)==2)  // If the month is february.
      {
        if(year%400==0 && year%4==0)    // If the year is a leap year.
        {
          ndays=29;
        }
        else {
          ndays=28;
        }
      }
      else if((datef.getMonth()+1)%2==0)
      {
        ndays=30;
      }
      else
      {
        ndays=31;
      }
    }
    else {     // If the month is after June.
      if((datef.getMonth()+1)%2==0)
      {
        ndays=31;
      }
      else {
        ndays=30;
      }
    }

    nweeks=parseInt(ndays/7);
    remdays=ndays%7;
  }
  else        // If some other month has been passed.
  {
    year=datef.getFullYear();    // The Current Year.

    date=-1;

    if((month+1)<=6)
    {
      if((month+1)==2)
      {
        if(datef.getFullYear()%4==0 && datef.getFullYear()%400==0)
        {
          ndays=29;
        }
        else
        {
          ndays=28;
        }
      }
      else if((month+1)%2==0)
      {
        ndays=30;
      }
      else
      {
        ndays=31;
      }
    }
    else
    {
      if((month+1)%2==0)
        ndays=31;
      else
        ndays=30;
    }

    nweeks=parseInt(ndays/7);
    remdays=ndays%7;
  }

  execution++;   // One round of execution completed.
}


/*
    Function to set the calendar widget to the required month.
    The Function initialises the required variables by calling the initialise function.
    If There is no argument passed into the funtion, there are default values that are set for the execution.
*/

function setcal(element,todate,month,year,calback,bordback,textcol,highcol)
{
  /* Setting the default values of each variable in case they have not been passed. */

  if(element)
  {
    element=element.toString();    // Converted the passed argument to string if it already wasn't.
  }
  else
  {
    element='calendar';     // Let's assume the id was named calendar. Because appending to a page node is silly.
  }

  if(!calback)
  {
    calback='#ffffff';
  }
  else
  {
    calback=calback.toString();
  }

  if(!bordback)
  {
    bordback='#0388d4';
  }
  else
  {
    bordback=bordback.toString();
  }

  if(!textcol)
  {
    textcol='#000000';
  }
  else
  {
    textcol=textcol.toString();
  }

  if(!highcol)
  {
    highcol='#ffffff';
  }
  else
  {
    highcol=highcol.toString();
  }

  if(!month)   // If the month or year weren't entered or even mentioned in the function call.
  {
    month=today.getMonth();
  }
  else
  {
    if(month>12 || month<0)
    {
      month=today.getMonth();
    }
    else
    {
      month=parseInt(month);
    }
  }

  if(!todate)
  {
    todate=today.getDate();
  }
  else
  {
    if(todate>31 || todate<1 || (todate>29 && month==2))
    {
       todate=today.getDate();
    }
    else
    {
      todate=parseInt(todate);
    }
  }

  if(!year)
  {
    year=today.getFullYear();
  }
  else
  {
    year=parseInt(year);
  }

  userdate=new Date(todate+" "+montharray[month]+" "+year);   // Creating a date format.

  initialise(month,year,userdate);     // Calling the initialise function.

  document.getElementById(element).innerHTML="";  // Cleared the entire Inner HTML Of the Element To Insert the calendar.

  // Now adding the calendar to the element.

  var ccalendar="<div class='calwidget' align='center'>"+montharray[month]+" - "+year+"<br/><br/><table>";

  var i,j,count=1;   // Counter Variables

  for(i=1;i<=nweeks;i++)
  {
    ccalendar+="<tr>";
    for(j=1;j<=7;j++)
    {
      dynamicdate=new Date(count+" "+montharray[month]+" "+year);
      todaysday=dayarray[dynamicdate.getDay()];   // Day of the week.

      if(count==date && year==today.getFullYear())
      {   

        // Highlighting today's date.

        ccalendar+="<td class='caltdhigh'>"+count+"<br/><span class='callabels'>"+(todaysday[0]+todaysday[1]+todaysday[2])+"</span></td>";
        count++;
      }
      else
      {
        ccalendar+="<td class='caltd'>"+count+"<br/><span class='callabels'>"+(todaysday[0]+todaysday[1]+todaysday[2])+"</span></td>";
        count++;
      }
    }
    ccalendar+="</tr>";
  }

  if(remdays!=0)
  {
    // For the days remaining in the month.
      
    ccalendar+="<tr>";
    for(i=1;i<=remdays;i++)
    {
      dynamicdate=new Date(count+" "+montharray[month]+" "+year);
      todaysday=dayarray[dynamicdate.getDay()];   // Day of the week.

      if(count==date && year==today.getFullYear()  && month==today.getMonth())
      {
        ccalendar+="<td class='caltdhigh'>"+count+"<br/><span class='callabels'>"+(todaysday[0]+todaysday[1]+todaysday[2])+"</span></td>";
        count++;
      }
      else
      {
        ccalendar+="<td class='caltd'>"+count+"<br/><span class='callabels'>"+(todaysday[0]+todaysday[1]+todaysday[2])+"</span></td>";
        count++;
      }
    }
    ccalendar+="</tr>";
  }

  ccalendar+="</table></div>";

  document.getElementById(element).innerHTML=ccalendar;
    
  /* Styling of the created table and elements. */
    
  document.getElementById(element).setAttribute('style','display : inline-block;border: 1px solid #efefef;max-width: 95vw;');

  var tds=document.getElementById(element).getElementsByClassName('caltd');

  var labels=document.getElementById(element).getElementsByClassName('callabels');

  var t=0,p=0;

  for(t=0;t<tds.length;t++)    // Updating the style of the table data.
  {
    document.getElementById(element).getElementsByClassName('caltd')[t].setAttribute('style','padding:7px; text-align: center;');
  }

  for(p=0;p<labels.length;p++)
  {
    document.getElementById(element).getElementsByClassName('callabels')[p].setAttribute('style','font-size: 12px;');
  }

  var calendars=document.getElementById(element).getElementsByClassName('calwidget');

  for(i=0;i<calendars.length;i++)
  {
    document.getElementById(element).getElementsByClassName('calwidget')[i].setAttribute('style','color : '+textcol+';padding : 0px; background: ' + calback + '; border-top: 30px solid ' + bordback + '; padding: 20px;');
  }
  
  // Changing the highlighted table data column's style.

  var highlightedelements=document.getElementById(element).getElementsByClassName('caltdhigh');

    for(i=0;i<highlightedelements.length;i++)
    {
        document.getElementById(element).getElementsByClassName('caltdhigh')[i].setAttribute('style','padding:8px; background : '+ bordback +'; color: ' + highcol +'; text-align: center;')
    }

}
/*  End of Execution. Now Run of the Calendar. */

document.addEventListener('load',setcal());   // If no function call has been created in the linked HTML file.

/* Finished. */
