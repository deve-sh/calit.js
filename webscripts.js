function setmonth(){
	var thedate=new Date();

	var options=document.getElementsByTagName('option');

	var i=0;

	for(i=0;i<options.length;i++)
	{
		if(i==thedate.getMonth())
		{
			document.getElementsByTagName('option')[i].setAttribute('selected','selected');
		}
	}

	document.getElementById('year').value=thedate.getFullYear();
}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function getcode()
{
	if(document.getElementById('coder').style.display==='none')
	{
	   document.getElementById('coder').style.display='block';	
	}

	var code="<span><</span><span class='tag'>body</span> <span class='att'>onload</span>=<span class='aps'>\"</span><span class='javascript'>setcal</span>(<span class='aps'>'</span><span class='str'>element</span><span class='aps'>'</span>,<span class='aps'>''</span>,<span class='aps'>'</span><span class='str'>"+document.getElementById('month').selectedIndex+"</span><span class='aps'>'</span>,<span class='aps'>'</span><span class='str'>"+document.getElementById('year').value+"</span><span class='aps'>'</span>);<span class='aps'>\"</span><span>></span>";
	document.getElementById('coder').innerHTML=code;
}

function stylecode()
{
   var extendedcode="<span><</span><span class='tag'>body</span> <span class='att'>onload</span>=<span class='aps'>\"</span><span class='javascript'>setcal</span>(<span class='aps'>'</span><span class='str'>element</span><span class='aps'>'</span>,<span class='aps'>''</span>,<span class='aps'>'</span><span class='str'>"+document.getElementById('month').selectedIndex+"</span><span class='aps'>'</span>,<span class='aps'>'</span><span class='str'>"+document.getElementById('year').value+"</span><span class='aps'>'</span>";	
   extendedcode+=",<span class='aps'>'</span><span class='str'>"+document.getElementById('backg').value.toString()+"</span><span class='aps'>'</span>,<span class='aps'>'</span><span class='str'>"+document.getElementById('upperback').value.toString()+"</span><span class='aps'>'</span>";
   extendedcode+=",<span class='aps'>'</span><span class='str'>"+document.getElementById('textcol').value.toString()+"</span><span class='aps'>'</span>";
   extendedcode+=",<span class='aps'>'</span><span class='str'>"+document.getElementById('highcol').value.toString()+"</span><span class='aps'>'</span>);\"<span>></span>";

   if(document.getElementById('coderpa').style.display==="none")
   {
   	  document.getElementById('coderpa').style.display='block';	
   }

   document.getElementById('coderpa').innerHTML=extendedcode;
}

function check()
{
	var i=0,h=0;
	h=document.getElementsByClassName('calender');
	if(screen.width<=600)
	{
		for(i=0;i<h.length;i++)
		{
			document.getElementsByClassName('calender')[i].setAttribute('align','left');
		}
	}
	else
	{
		for(i=0;i<h.length;i++)
		{
			document.getElementsByClassName('calender')[i].setAttribute('align','center');
		}
	}
}
