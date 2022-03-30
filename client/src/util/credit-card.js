const stringToArray = string => {
  let array = string.split('');
  let numbersArray = array.map(value => parseInt(value, 10));
  // Alternate Method: for (let i = 0; i < array.length; i++) {array[i] = parseInt(array[i], 10);}
  return numbersArray;
};

const checkLuhn = array => {
  let sum = 0;
  let evenIndex = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    let value = array[i];
    if (evenIndex % 2 === 0) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }
    sum += value;
    evenIndex++;
  }
  return sum % 10 === 0;
};

export const creditCardType = cc => {
  const amex = /^3[47][0-9]{13}$/;
  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercard = /^5[1-5][0-9]{14}$/;
  const mastercard2 = /^2[2-7][0-9]{14}$/;
  const disco1 = /^6011[0-9]{12}[0-9]*$/;
  const disco2 = /^62[24568][0-9]{13}[0-9]*$/;
  const disco3 = /^6[45][0-9]{14}[0-9]*$/;
  const diners = /^3[0689][0-9]{12}[0-9]*$/;
  const jcb =  /^35[0-9]{14}[0-9]*$/;
  
  if (visa.test(cc)) {
    return 'VISA';
  }
  if (amex.test(cc)) {
    return 'AMEX';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'MASTERCARD';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'DISCOVER';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  return '';
};

export const checkCVV = cvv => {
  const regexp = /^[0-9]{3,4}$/;
  return regexp.test(cvv);
};

export const checkExpDate = date => {
  const regexp = /^(0[1-9]|1[012])[- \/.]((?:19|20)\d\d)$/;
  return regexp.test(date);
};

export const validateCard = (cc, type) => {
  const cardArr = stringToArray(cc);
  const validCard = checkLuhn(cardArr);
  const cardType = creditCardType(cc);
  const typeMatch = cardType === type;
  return validCard && typeMatch;
};
