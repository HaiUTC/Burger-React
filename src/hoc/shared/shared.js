export const checkValidity = (value , rules)=>{
    let isValid = true
    let regex = /\S+@\S+\.\S+/

    if(!rules) return true
    if(rules.required){
        isValid = value.trim() !== '' && isValid
    }
    if(rules.isEmail){
        isValid = regex.test(value) && isValid
    }
    return isValid
}