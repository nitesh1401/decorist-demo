export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const parseJwt  = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

export const validate = (errObj) => {
    if(JSON.stringify(errObj).search(/This field may not be blank./) !== -1) {
        return "All fields are required.";
    } else if(JSON.stringify(errObj).search(/Enter a valid email address./) !== -1) {
        return "Enter a valid email address.";
    } else if(JSON.stringify(errObj).search(/A user with that username already exists./) !== -1) {
        return "Username already exists.";
    } else if(JSON.stringify(errObj).search(/This password is too short. It must contain at least 8 characters./) !== -1) {
        return "Password must contain at least 8 characters.";
    }
}

export const getMonthName = (value) => {
    switch(value) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
    }
}
