import moment from 'jalali-moment'
export function timeStampConverterToDate(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let monthsPersian = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let daysPersian = ['یک شنبه','دوشنبه','سه شنبه','چهارشنبه','پنج شنبه','جمعه','یک شنبه']
    let year = a.getFullYear();
    let month = a.getMonth()+1;
    let monthName = months[a.getMonth()];
    let date = a.getDate();
    let dateName = days[a.getDay()];
    let timeEn = year + '/' + month + '/' + date ;
    let timeDisplayDay = year + '  ' + monthName + '  ' + date + ' - ' + dateName ;
    let timePersian = moment(timeEn, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
    let arrayPersian =  timePersian.split('/');
    let timePersianDisplayDay = '  ' + daysPersian[a.getDay()] + '  ' +  arrayPersian[2]  + '  ' +  monthsPersian[arrayPersian[1]*1] + '  ' + arrayPersian[0]  ;
    return {
        'timePersian' : timePersian,
        'timePersianDisplayDay' : timePersianDisplayDay,
        'timeEn' : timeEn,
        'timeDisplayDay' : timeDisplayDay

    };
}
export function dateConvertToTimeStamp(time,local) {
    // timeFormat ="year-month-day";
    let newDate, timeStamp ;
    if(local === 'en') {
        if(time.includes('-')){
            time = time.split("-") ;
            // let newDate= month +"/"+ day +"/"+ year;
            newDate = time[1]+"/"+time[2]+"/"+time[0];
        }else{
            newDate = time
        }
        timeStamp = new Date(newDate).getTime()/1000
    }else{
        time = moment.from(time, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
        timeStamp = new Date(time).getTime()/1000
    }
    return timeStamp
}
