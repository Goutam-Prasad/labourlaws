/**
 *
 * @param {*} statename
 * @param {*} gross_salary
 * @param {*} employeeContribution
 * @returns emoloyeeContribution
 */
const lwfemployeeContributionHelper = (
  statename,
  gross_salary,
  employeeContribution
) => {
  let employeeContri = 0;
  switch (statename) {
    case "AndhraPradesh": {
      return (employeeContri = (
        parseFloat(employeeContribution / 100) * gross_salary
      ).toFixed(2));
    }

    case "Chandigarh": {
      if (parseInt(gross_salary) <= 15000) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Chattisgarh": {
      if (parseInt(gross_salary) > 10000) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Delhi": {
      if (parseInt(gross_salary) > 2500) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Goa": {
      if (parseInt(gross_salary) > 2500) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Gujrat": {
      if (parseInt(gross_salary) > 2500) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Haryana": {
      return (employeeContri = (
        parseFloat(employeeContribution / 100) * gross_salary
      ).toFixed(2));
    }

    case "Karnataka": {
      return (employeeContri = (
        parseFloat(employeeContribution / 100) * gross_salary
      ).toFixed(2));
    }

    case "Kerela": {
      return (employeeContri = (
        parseFloat(employeeContribution / 100) * gross_salary
      ).toFixed(2));
    }

    case "MadhyaPradesh": {
      if (parseInt(gross_salary) > 10000) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Maharastra": {
      if (parseInt(gross_salary) > 3000) {
        return (employeeContri = (
          parseFloat(employeeContribution[1] / 100) * gross_salary
        ).toFixed(2));
      } else {
        (parseFloat(employeeContribution[0] / 100) * gross_salary).toFixed(2);
      }
    }

    case "Odisha": {
      return (employeeContri = (
        parseFloat(employeeContribution / 100) * gross_salary
      ).toFixed(2));
    }

    case "Punjab": {
      return (employeeContri = (
        parseFloat(employeeContribution / 100) * gross_salary
      ).toFixed(2));
    }

    case "Tamilnadu": {
      if (parseInt(gross_salary) > 15000) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "Telangana": {
      if (parseInt(gross_salary) > 1600) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }

    case "WestBengal": {
      if (parseInt(gross_salary) > 1600) {
        return (employeeContri = (
          parseFloat(employeeContribution / 100) * gross_salary
        ).toFixed(2));
      } else return (employeeContri = 0);
    }
    default:
      return 0;
  }
};
module.exports = {
  lwfemployeeContributionHelper,
};
