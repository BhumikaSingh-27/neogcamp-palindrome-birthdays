function reverseStr(str) {
  var strToBeReversed = str.split("");
  var reversedStr = strToBeReversed.reverse().join("");
  return reversedStr;
}

function isPalindrome(str) {
  var reversedStr = reverseStr(str);
  return str === reversedStr;
}

function convertDateToString(date) {
  var newDate = { day: "", month: "", year: "" };

  if (date.day < 10) {
    newDate.day = "0" + date.day;
  } else {
    newDate.day = date.day.toString();
  }
  if (date.month < 10) {
    newDate.month = "0" + date.month;
  } else {
    newDate.month = date.month.toString();
  }
  newDate.year = date.year.toString();

  return newDate;
}

function getAllFormatesOfDateAsString(date) {
  strDate = convertDateToString(date);

  var ddmmyyyy = strDate.day + strDate.month + strDate.year;
  var mmddyyyy = strDate.month + strDate.day + strDate.year;
  var yyyymmdd = strDate.year + strDate.month + strDate.day;
  var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormates(date) {
  var listOfFormats = getAllFormatesOfDateAsString(date);
  var flag = false;
  for (let i = 0; i < listOfFormats.length; i++) {
    if (isPalindrome(listOfFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var listOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > listOfDaysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    day = 1;
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindrome(date) {
  var nextDate = getNextDate(date);
  var cur = 0;

  while (1) {
    cur++;
    if (checkPalindromeForAllDateFormates(nextDate)) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [cur, nextDate];
}

const birthdayInput = document.querySelector("#birthdate-input");
const checkPalindromeBtn = document.querySelector("#check-palindrome");
const outputResult = document.querySelector("#output");

function clickEventHandler() {
  var splitBirthdayToArray = birthdayInput.value.split("-");

  var birthDate = {
    day: Number(splitBirthdayToArray[2]),
    month: Number(splitBirthdayToArray[1]),
    year: Number(splitBirthdayToArray[0]),
  };

  if (checkPalindromeForAllDateFormates(birthDate)) {
    outputResult.innerText = "Yay! Your birthday is palindrome!";
  } else {
    var [cur, nextDate] = getNextPalindrome(birthDate);
    outputResult.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${cur} days.`;
  }
}

checkPalindromeBtn.addEventListener("click", clickEventHandler);
