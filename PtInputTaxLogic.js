exports.PtTax = function (stateCode, salary, gender) {
  let pttax = "Nil";
  if (stateCode == "AndraPradesh") {
    if (salary > 20000) pttax = 200;
    else if (salary > 15000 && salary <= 20000) pttax = 150;
    else pttax = "Nil";
    return pttax;
  } else if (stateCode == "Assam") {
    if (salary <= 10000) pttax = "Nil";
    else if (salary > 10000 && salary <= 15000) pttax = 150;
    else if (salary > 15000 && salary <= 24999) pttax = 180;
    else pttax = 208;
    return pttax;
  } else if (stateCode == "Bihar") {
    if (salary <= 25000) pttax = "Nil";
    else if (salary > 25000 && salary <= 41666) pttax = 83.33;
    else if (salary >= 41667 && salary <= 83333) pttax = 166.67;
    else pttax = 208.33;
    return pttax;
  } else if (stateCode == "Gujrat")
    return (pttax = salary > 12000 ? 200 : "Nil");
  else if (stateCode == "Jharkhand") {
    if (salary <= 25000) pttax = "Nil";
    else if (salary > 25000 && salary <= 41666) pttax = 100;
    else if (salary >= 41667 && salary <= 83333) pttax = 175;
    else pttax = "208(212 in February)";
  } else if (stateCode == "Karnataka")
    return (pttax = salary > 15000 ? 200 : "Nil");
  else if (stateCode == "Kerela") {
    if (salary < 2000) pttax = "Nil";
    else if (salary >= 2000 && salary < 3000) pttax = 120;
    else if (salary >= 3000 && salary <= 5000) pttax = 180;
    else if (salary >= 5000 && salary <= 7499) pttax = 300;
    else if (salary >= 7500 && salary < 12500) pttax = 600;
    else if (salary >= 12500 && salary <= 16666) pttax = 750;
    else if (salary >= 16667 && salary <= 28033) pttax = 1000;
    else pttax = 1250;
    return pttax;
  } else if (stateCode == "MadhyaPradesh") {
    if (salary <= 225000) pttax = "Nil";
    else if (salary > 225000 && salary <= 300000) pttax = 125;
    else if (salary > 300000 && salary <= 400000)
      pttax = "166 and 174(for March)";
    else pttax = "208 (212 for March)";
    return pttax;
  } else if (stateCode == "Maharastra") {
    if ((gender == "m" && salary < 7500) || gender == "f" || salary < 10000)
      pttax = "nil";
    else if (gender == "m" && salary >= 7500 && salary < 10000) pttax = "175";
    else pttax = "200 (February-300)";
    return pttax;
  } else if ((stateCode = "Manipur")) {
    if (salary < 50000) pttax = "Nil";
    else if (salary >= 50000 && salary <= 75000) pttax = 1200;
    else if (salary > 75000 && salary < 1000000) pttax == 2000;
    else if (salary >= 1000000 && salary <= 1250000) pttax = 2400;
    else pttax = 2500;
    return pttax;
  } else if (stateCode == "Meghalaya") {
    if (salary < 5000) pttax = "Nil";
    else if (salary > 5000 && salary <= 75000) pttax = 200;
    else if (salary > 75000 && salary <= 100000) pttax = 300;
    else if (salary > 100000 && salary <= 150000) pttax = 500;
    else if (salary > 150000 && salary <= 200000) pttax = 750;
    else if (salary > 200000 && salary <= 250000) pttax = 1000;
    else if (salary > 250000 && salary <= 300000) pttax = 1250;
    else if (salary > 300000 && salary <= 350000) pttax = 1500;
    else if (salary > 500000 && salary <= 400000) pttax = 1800;
    else if (salary > 400000 && salary <= 450000) pttax = 2100;
    else if (salary > 450000 && salary <= 500000) pttax = 2400;
    else pttax = 2500;
    return pttax;
  } else if (stateCode == "Orissa") {
    if (salary < 16000) pttax = "Nil";
    else if (salary > 16000 && salary <= 30000) pttax = 1500;
    else pttax = 2500;
    return pttax;
  } else if (stateCode == "Puducherry") {
    if (salary <= 100000) pttax = "Nil";
    else if (salary > 10000 && salary <= 200000) pttax = 250;
    else if (salary > 200000 && salary <= 300000) pttax = 500;
    else if (salary > 300000 && salary <= 400000) pttax = 750;
    else if (salary > 400000 && salary <= 500000) pttax = 1000;
    else pttax = 1250;
    return pttax;
  } else if (stateCode == "Sikkim") {
    if (salary <= 20000) pttax = "nil";
    else if (salary > 15000 && salary <= 30000) pttax = 125;
    else if (salary > 30000 && salary <= 40000) pttax = 150;
    else pttax = 200;
    return pttax;
  } else if (stateCode == "TamilNadu") {
    if (salary <= 21000) pttax = "Nil";
    else if (salary > 21000 && salary <= 30000) pttax = 135;
    else if (salary > 30000 && salary <= 45000) pttax = 315;
    else if (salary > 45000 && salary <= 60000) pttax = 695;
    else if (salary > 60000 && salary <= 75000) pttax = 1025;
    else pttax = 1250;
    return pttax;
  } else if (stateCode == "Telangana") {
    if (salary <= 15000) pttax = "Nil";
    else if (salary > 15000 && salary <= 20000) pttax = 150;
    else pttax = 200;
    return pttax;
  } else if (stateCode == "Tripura") {
    if (salary <= 7500) pttax = "Nil";
    else if (salary > 7500 && salary < 15000) pttax = 150;
    else pttax = 208;
    return pttax;
  } else {
    if (salary <= 1000) pttax = "Nil";
    else if (salary > 10000 && salary <= 15000) pttax = 110;
    else if (salary > 15000 && salary <= 25000) pttax = 130;
    else if (salary > 25000 && salary <= 40000) pttax = 150;
    else pttax = 200;
    return pttax;
  }
};
