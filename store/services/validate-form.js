export default function validateForm (obj){
    let msg =null
    Object.keys(obj).forEach((key) => {
        if(obj[key] === null){
            console.log('msg if is:', msg)
           return msg = 'پر کردن تمامی فیلدها ضروری است!'

        }else{
           switch (key) {
               case 'email':
                   if(!validateType(key,obj[key])){
                    return msg= 'فرمت ایمیل وارد شده صحیح نیست!'
                   }
                   break;
               case 'phone':
                   if(!validateType(key,obj[key])){
                      return msg= 'فرمت موبایل وارد شده صحیح نیست!'
                   }
                   break;
               default:
                  return msg
                   break;
           }
        }
    });
    console.log('msg is:', msg)
    return msg

}

const  validateType = (key,val) => {
    let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let patternPhone = /^0[1-9]\d{7,9}$/g;
    if(key === "phone") {
        return patternPhone.test(val);

    }else if(key === "email"){
        return patternEmail.test(String(val).toLowerCase());
    }

}