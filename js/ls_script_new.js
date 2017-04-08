const ls = localStorage;

let msgdata = [];

var id_counter = 0;

function get_id_counter_value(){

	var all_list = get_msg_list();
	if(all_list === null)
        return -1;
    else
		return all_list[all_list.length-1].split('!')[1];
}

function getID(handler){
	return document.getElementById(handler);
}

function save_task_data(){
	const name = getID('name');
	const phone = getID('pn');
	const address = getID('address');
	const date = getID('date');
	const time = getID('time');
	const cp = getID('cp');
	const result = getID('result');

	var id_counter = parseInt(get_id_counter_value())+1;

	var setdata = date.value+"!"+id_counter+"!"+name.value+"!"+phone.value+"!"+address.value+"!"+time.value+"!"+cp.value;

	save_task_data_now(setdata);

	result.innerHTML="Submit Successfully";
	delayedMessage();
}

function save_task_data_now(data) {
    
    if(get_msg_list() !== null)
        msgdata = get_msg_list();
    
   	msgdata.push(data);
    ls.setItem('tsapp', JSON.stringify(msgdata))
}

function delayedMessage() {
  timeoutID = window.setTimeout(hide_div, 3000);
}

function hide_div() {
	const result = getID('result');
	result.innerHTML="";
    reset();
}

function get_msg_list() {
	var getlist = JSON.parse(ls.getItem('tsapp'));
    return getlist;
}


function reset(){
    const name = getID('name');
    name.value='';
    const phone = getID('pn');
    phone.value='';
    const address = getID('address');
    address.value='';
    const date = getID('date');
    date.valueAsDate = null;
    const time = getID('time');
    time.value = null;
    const cp = getID('cp');
    cp.value='';
}

function redirect() {
    window.window.location.href='display.html';
}

function show_msg_list(){
    var list = get_msg_list();
    try
    {
        if (list.length == 0)
        {
            localStorage.removeItem('tsapp');
            show_blank();
        }
        if(list.length !== 0)
        {
            create_msg(list.sort());
        }
    }
    catch(e){}
}

function create_msg(rdata) {

    var count = 1 ;
    var data ='';
    var result = '';
   
    for (var i = 0; i <= rdata.length-1; i++) {
        if(rdata[i].length!==0)
        {
            data = rdata[i].split('!');
            var del = "delete_task_data("+data[1]+")";
            result = result + "<div class='ls_container'><div class='ls_container_inner'><div class='ls_small_box_4'><div class='ls_data_msg'><div class='ls_msg_title'>"+count+"</div></div><div class='ls_data_msg_1'><div class='ls_msg_title'>"+data[2]+"</div><div class='ls_msg_title'>"+data[3]+"</div><div class='ls_msg_title'>"+data[4]+"</div><div class='ls_msg_title'>"+data[0]+"</div><div class='ls_msg_title'>"+data[5]+"</div><div class='ls_msg_title'>"+data[6]+"</div></div></div><div class='ls_small_box_3'><button type='text' onclick='"+del+"' name='delete' class='ls_btn_1'>Delete</button></div><div class='ls_clear'></div></div></div>";
                count =count + 1;
        }
    }


    var display_data = getID('display_data');

    display_data.innerHTML=result;
}

function view_all_box(index) {

    show_blank();

    if (index==1) 
    {
        show_msg_list();
    }
    if (index==2) 
    {
        var cdate = new Date()
        var month = ("0" + (cdate.getMonth() + 1)).slice(-2)
        var day = ("0" + cdate.getDate()).slice(-2);
        var year = cdate.getFullYear();
        var current_date = year+"-"+month+"-"+day;
        get_data_by_months(current_date,month);
    }
}

function fill_cp_box(){
    var showdata = [];
    var list = get_msg_list();
    try
    {
        if (list.length == 0)
        {
            show_blank();
        }
        if(list.length !== 0)
        {
            for (var i = 0; i <= list.length-1; i++) 
            {
                var blist = list[i].split('!');
                showdata.push(blist[6]);
            }
        }
    }
    catch(e){}
    const uniquenames = Array.from(new Set(showdata));
    const cplist = getID('cplist');
    var cplist_rs = "<option value='-1'>Select by Concern Person</option>"
    for (var i = 0; i < uniquenames.length; i++) {
        cplist_rs = cplist_rs + "<option value='"+uniquenames[i]+"'>"+uniquenames[i]+"</option>";
    }
    cplist.innerHTML=cplist_rs;
}

function view_all_cp() {
    const cplist = getID('cplist');
    indexValue = cplist.options[cplist.selectedIndex].value;
    show_blank();
    var showdata = [];
    var list = get_msg_list();
    try
    {
        if (list.length == 0)
        {
            show_blank();
        }
        if(list.length !== 0)
        {
            for (var i = 0; i <= list.length-1; i++) 
            {
                var blist = list[i].split('!');
                if(blist[6]===indexValue)
                {
                    showdata.push(list[i]);
                }
            }
        }
    }
    catch(e){}
    create_msg_2(showdata);
}

function show_rs_day_month(){
    const day = getID('day');
    const month = getID('month');
    const year = new Date().getFullYear();
    var mdate = year+"-"+month.value+"-"+day.value;
    if (day.value!=="-1" && month.value!=="-1")
        get_data_by_month(mdate,month.value);
    else
        show_blank();

    day.selectedIndex=0;
    month.selectedIndex=0;
}

function getmonthNo(month, inc){
    if(month.substring(0,1)==="0") 
        return month = "0"+(parseInt(month)+inc);
}

function get_data_by_month(match_date,month) {
    var showdata = [];
    var list = get_msg_list();
    try
    {
        if (list.length == 0)
        {
            show_blank();
        }
        if(list.length !== 0)
        {
            for (var i = 0; i <= list.length-1; i++) 
            {
                var blist = list[i].split('!');
                if(blist[0]===match_date)
                {
                    showdata.push(list[i]);
                }
            }
        }
    }
    catch(e){}
    rs = create_msg_1(showdata,month);
    var display_data = getID('display_data');

    display_data.innerHTML=rs;
}

function get_data_by_months(match_date,month) {
    var showdata = [];

    var nextMonths = [month,getmonthNo(month,1),getmonthNo(month,2)];
    //console.log(nextMonths);

    var month_1 = [];
    var month_2 = [];
    var month_3 = [];

    var list = get_msg_list();

    try
    {
        if (list.length == 0)
        {
            show_blank();
            show_message('display_data');
        }
        if(list.length !== 0)
        {
            for (var i = 0; i <= list.length-1; i++) {

                var blist = list[i].split('!');
                if(blist[0]>=match_date)
                {
                    showdata.push(list[i]);
                }
            }
        }

        for (var i = 0; i <= showdata.length - 1; i++) {
            var getlist = showdata[i].split('!');
            var getmonth = getlist[0].split('-')[1];
            if(getlist[0].split('-')[1]===nextMonths[0])
            {
                month_1.push(showdata[i]);
            }
            if(getlist[0].split('-')[1]===nextMonths[1])
            {
                month_2.push(showdata[i]);
            }
            if(getlist[0].split('-')[1]===nextMonths[2])
            {
                month_3.push(showdata[i]);
            }
        }
    }
    catch(e){}
    month_1.sort();
    month_2.sort();
    month_3.sort();
    
    r1 = create_msg_1(month_1,nextMonths[0]);
    r2 = create_msg_1(month_2,nextMonths[1]);
    r3 = create_msg_1(month_3,nextMonths[2]);

    var display_data = getID('display_data');

    display_data.innerHTML=r1+r2+r3;
}

function create_msg_1(rdata,month) {

    var count = 1 ;
    var data ='';
    var result = '';
   
    result = "<div class='ls_record_title'>"+getMonth_Name(month)+"</div>";
    if (rdata.length==0) 
    {
        result = result + "<div>No Record Found</div>";
    }
    for (var i = 0; i <= rdata.length-1; i++) {
        if(rdata[i].length!==0)
        {
            data = rdata[i].split('!');
            var del = "delete_task_data("+count+")";
            result = result + "<div class='ls_container'><div class='ls_container_inner'><div class='ls_small_box_4_1'><div class='ls_data_msg'><div class='ls_msg_title'>"+count+"</div></div><div class='ls_data_msg_1'><div class='ls_msg_title'>"+data[2]+"</div><div class='ls_msg_title'>"+data[3]+"</div><div class='ls_msg_title'>"+data[4]+"</div><div class='ls_msg_title'>"+data[0]+"</div><div class='ls_msg_title'>"+data[5]+"</div><div class='ls_msg_title'>"+data[6]+"</div></div></div><div class='ls_clear'></div></div></div>";
                count =count + 1;
        }
    }
    return result;
}

function create_msg_2(rdata) {

    var count = 1 ;
    var data ='';
    var result = '';
   
    if (rdata.length==0) 
    {
        result = result + "<div>No Record Found</div>";
    }
    for (var i = 0; i <= rdata.length-1; i++) {
        if(rdata[i].length!==0)
        {
            data = rdata[i].split('!');
            var del = "delete_task_data("+count+")";
            result = result + "<div class='ls_container'><div class='ls_container_inner'><div class='ls_small_box_4_1'><div class='ls_data_msg'><div class='ls_msg_title'>"+count+"</div></div><div class='ls_data_msg_1'><div class='ls_msg_title'>"+data[2]+"</div><div class='ls_msg_title'>"+data[3]+"</div><div class='ls_msg_title'>"+data[4]+"</div><div class='ls_msg_title'>"+data[0]+"</div><div class='ls_msg_title'>"+data[5]+"</div><div class='ls_msg_title'>"+data[6]+"</div></div></div><div class='ls_clear'></div></div></div>";
                count =count + 1;
        }
    }
    var display_data = getID('display_data');

    display_data.innerHTML = result;
}

function show_blank(){
    var display_data = getID('display_data');

    display_data.innerHTML='';
}

function delete_task_data(id)
{
    var setdata =[];
    console.log(id);
    var getalllist = get_msg_list();

    for (var i = 0; i <= getalllist.length-1; i++) {
        var nlist = getalllist[i].split('!');
        if(parseInt(nlist[1])===id)
        {
            //alert("delete");
            continue;
        }
        else
        {
            //alert(i);
            setdata.push(getalllist[i]);
        }
    }
       
    //console.log(setdata);
    update_msg_data(setdata);

    const result = getID('result');

    result.innerHTML="<div class='ls_back_color'>Record Deleted</div>";

    delayedMessage_1();
}

function delayedMessage_1() {
  timeoutID = window.setTimeout(hide_div_1, 5000);
}

function hide_div_1() {
    const result = getID('result');
    result.innerHTML="";
    show_msg_list();
}

function update_msg_data(msgdata)
{
    ls.setItem('tsapp', JSON.stringify(msgdata));
}


function getMonth_Name(id){
    if(id=="01")
        monthname =  "January";
    if(id=="02")
        monthname =  "Feburary";
    if(id=="03")
        monthname =  "March";
    if(id=="04")
        monthname =  "April";
    if(id=="05")
        monthname =  "May";
    if(id=="06")
        monthname =  "June";
    if(id=="07")
        monthname =  "July";
    if(id=="08")
        monthname =  "August";
    if(id=="09")
        monthname =  "September";
    if(id=="10")
        monthname =  "October";
    if(id=="11")
        monthname =  "November";
    if(id=="12")
        monthname =  "December";
    return monthname;

}

function get_month_day(val){

    //alert(val.length);
    if(val.length === 1) 
        return "0"+val;
    else
        return val;
}

function get_today_nextday() {
    var showdata = [];

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    const year = today.getFullYear();


    var match_date = year+"-"+get_month_day(month+'')+"-"+get_month_day(day+'');
    //console.log(match_date);

    var list = get_msg_list();

    var n_date = parseInt(match_date.split('-')[2])+1;

    var next_date = match_date.substring(0,match_date.length-1)+get_month_day(n_date);

    //console.log(next_date);

    try
    {
        if (list.length == 0)
        {
            show_blank();
            show_message('display_data');
        }
        if(list.length !== 0)
        {
            for (var i = 0; i <= list.length-1; i++) {

                var blist = list[i].split('!');
                //console.log(blist);
                if(blist[0]>=match_date && blist[0]<=next_date)
                {
                    showdata.push(list[i]);
                }
            }
        }
    }
    catch(e){}
    showdata.sort();
    
    create_msg_2(showdata);
}