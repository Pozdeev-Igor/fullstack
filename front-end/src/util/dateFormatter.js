function formatDate(string) {
    let day = string.slice(8, 10)
    let month = string.slice(5, 7)
    let year = string.slice(0, 4)
    if (month === '01') return day+' january '+ year;
    if (month === '02') return day+' february '+ year;
    if (month === '03') return day+' march '+ year;
    if (month === '04') return day+' april '+ year;
    if (month === '05') return day+' may '+ year;
    if (month === '06') return day+' june '+ year;
    if (month === '07') return day+' july '+ year;
    if (month === '08') return day+' august '+ year;
    if (month === '09') return day+' september '+ year;
    if (month === '10') return day+' october '+ year;
    if (month === '11') return day+' november '+ year;
    if (month === '12') return day+' december '+ year;

}

export default formatDate;