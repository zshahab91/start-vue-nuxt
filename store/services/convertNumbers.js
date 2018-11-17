import { timeStampConverterToDate } from './convertDate'

export function convertNumber2Persian(str) {
    let inputstring = str;
    let persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
    let english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    for (let i = 0; i < 10; i++) {
        let regex = new RegExp(english[i], 'g');
        inputstring = inputstring.toString().replace(regex, persian[i]);
    }
    return inputstring;
}

export  function convertNumbers2English (string) {
    return string.replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) - 0x06f0;
    });
}
export function formatMoney(val) {
    let parts1 = Math.floor(val.length/3);
    let parts2 = val.length%3;
    let ret = "20160923".replace(/(\d{4})(\d{2})(\d{2})/, "$1,$2,$3");
    let currency = val.toLocaleString('fa-IR');
    return currency
}

export function checkObjResNumber(res) {
    for(let i=0; i< res.length; i++){
        Object.keys(res[i]).forEach((key) => {
            res[i]['index'] = convertNumber2Persian(i+1)
            if(key.includes('Date') && res[i][key] !== null) {
               res[i][key] = timeStampConverterToDate(res[i][key].toString().substring(0, 9)) ? timeStampConverterToDate(res[i][key].toString().substring(0, 9)).timePersianDisplayDay : res[i][key]
            }
            if(key === 'price') {
                res[i][key] = formatMoney(res[i][key])
            }
        })
    }
    return res
}