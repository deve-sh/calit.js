/*
    CALIT.JS
    ----
    JavaScript Featurette to Introduce a Calendar to a given element in the form of a table.
    Programmed by Devesh Kumar.
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
}


/*
    Function to set the calendar widget to the required month.
    The Function initialises the required variables by calling the initialise function.
    If There is no argument passed into the funtion, there are default values that are set for the execution.
*/

function setcal(element,todate,month,year)
{
  if(element)
  {
    element=element.toString();    // Converted the passed argument to string if it already wasn't.
  }
  else
  {
    element='calendar';     // Let's assume the id was named calendar. Because appending to a page node is silly.
  }

  if(!todate)
  {
    todate=today.getDate();
  }
  else
  {
    todate=parseInt(todate);
  }

  if(!year)
  {
    year=today.getFullYear();
  }
  else
  {
    year=parseInt(year);
  }

  if(!month)   // If the month or year weren't entered or even mentioned in the function call.
  {
    month=today.getMonth();
  }
  else
  {
    month=parseInt(month);
  }

  userdate=new Date(todate+" "+montharray[month]+" "+year);   // Creating a date format.

  initialise(month,year,userdate);     // Calling the initialise function.

  document.getElementById(element).innerHTML="";  // Cleared the entire Inner HTML Of the Element.

  // Now adding the calendar to the element.

  var ccalendar="<div class='calwidget' align='center'>"+montharray[month]+" - "+year+"<br/><br/><table>";

  var i,j,count=1;   // Counter Variable

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
    
  /* Styling of the created table and element. */
    
  document.getElementById(element).setAttribute('style','padding : 0px; background: #ffffff; display : inline-block;border: 1px solid #efefef;');

  var tds=document.getElementsByClassName('caltd');

  var labels=document.getElementsByClassName('callabels');

  var t=0,p=0;

  for(t=0;t<tds.length;t++)    // Updating the style of the table data.
  {
    document.getElementsByClassName('caltd')[t].setAttribute('style','padding:7px; text-align: center;');
  }

  for(p=0;p<labels.length;p++)
  {
    document.getElementsByClassName('callabels')[p].setAttribute('style','font-size: 12px;');
  }

  document.getElementsByClassName('calwidget')[0].setAttribute('style','border-top: 30px solid #0388d4; padding: 20px;');

  // Changing the highlighted table data column's style.

  if(document.getElementsByClassName('caltdhigh')[0])   // If one actually exists.
  {
    document.getElementsByClassName('caltdhigh')[0].setAttribute('style','padding:8px; background : #0388d4; color: #ffffff; text-align: center;')
  }

}
/*  End of Execution. Now Run of the Calendar. */

document.addEventListener('load',setcal());   // If no function call has been created in the linked HTML file.

/* Finished. */
