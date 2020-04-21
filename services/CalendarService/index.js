import {
	TK13,TK14,TK15,TK16,TK17,TK18,TK19,TK20,TK21,TK22,
	CAN,CHI,TIETKHI,GIO_HD,PI
} from './resource'

function LunarDate(dd, mm, yy, leap, jd) {
	this.day = dd;
	this.month = mm;
	this.year = yy;
	this.leap = leap;
	this.jd = jd;
}

function SunLongitude(jdn) {
	var T, T2, dr, M, L0, DL, lambda, theta, omega;
	T = (jdn - 2451545.0 ) / 36525;  
	T2 = T*T;
	dr = PI/180; 
	M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2; // mean anomaly, degree
	L0 = 280.46645 + 36000.76983*T + 0.0003032*T2; // mean longitude, degree
	DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
	DL = DL + (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);
    theta = L0 + DL; // true longitude, degree
    
    omega = 125.04 - 1934.136 * T;
    lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);
    
    lambda = lambda*dr;
	lambda = lambda - PI*2*(INT(lambda/(PI*2))); // Normalize to (0, 2*PI)
    return lambda;
}

function INT(d) {
	return Math.floor(d);
}

function jdn(dd, mm, yy) {
	var a = INT((14 - mm) / 12);
	var y = yy+4800-a;
	var m = mm+12*a-3;
	var jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;
	if (jd < 2299161) {
		jd = dd + INT((153*m+2)/5) + 365*y + INT(y/4) - 32083;
	}
	return jd;
}

function jdn2date(jd) {
	var Z, A, alpha, B, C, D, E, dd, mm, yyyy, F;
	Z = jd;
	if (Z < 2299161) {
	  A = Z;
	} else {
	  alpha = INT((Z-1867216.25)/36524.25);
	  A = Z + 1 + alpha - INT(alpha/4);
	}
	B = A + 1524;
	C = INT( (B-122.1)/365.25);
	D = INT( 365.25*C );
	E = INT( (B-D)/30.6001 );
	dd = INT(B - D - INT(30.6001*E));
	if (E < 14) {
	  mm = E - 1;
	} else {
	  mm = E - 13;
	}
	if (mm < 3) {
	  yyyy = C - 4715;
	} else {
	  yyyy = C - 4716;
	}
	return new Array(dd, mm, yyyy, jd);
}

function decodeLunarYear(yy, k) {
	var monthLengths, regularMonths, offsetOfTet, leapMonth, leapMonthLength, solarNY, currentJD, j, mm;
	var ly = new Array();
	monthLengths = new Array(29, 30);
	regularMonths = new Array(12);
	offsetOfTet = k >> 17;
	leapMonth = k & 0xf;
	leapMonthLength = monthLengths[k >> 16 & 0x1];
	solarNY = jdn(1, 1, yy);
	currentJD = solarNY+offsetOfTet;
	j = k >> 4;
	for(i = 0; i < 12; i++) {
		regularMonths[12 - i - 1] = monthLengths[j & 0x1];
		j >>= 1;
	}
	if (leapMonth == 0) {
		for(mm = 1; mm <= 12; mm++) {
			ly.push(new LunarDate(1, mm, yy, 0, currentJD));
			currentJD += regularMonths[mm-1];
		}
	} else {
		for(mm = 1; mm <= leapMonth; mm++) {
			ly.push(new LunarDate(1, mm, yy, 0, currentJD));
			currentJD += regularMonths[mm-1];
		}
		ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
		currentJD += leapMonthLength;
		for(mm = leapMonth+1; mm <= 12; mm++) {
			ly.push(new LunarDate(1, mm, yy, 0, currentJD));
			currentJD += regularMonths[mm-1];
		}
	}
	return ly;
}

function getYearInfo(yyyy) {
	var yearCode;
	if (yyyy < 1300) {
		yearCode = TK13[yyyy - 1200];
	} else if (yyyy < 1400) {
		yearCode = TK14[yyyy - 1300];
	} else if (yyyy < 1500) {
		yearCode = TK15[yyyy - 1400];
	} else if (yyyy < 1600) {
		yearCode = TK16[yyyy - 1500];
	} else if (yyyy < 1700) {
		yearCode = TK17[yyyy - 1600];
	} else if (yyyy < 1800) {
		yearCode = TK18[yyyy - 1700];
	} else if (yyyy < 1900) {
		yearCode = TK19[yyyy - 1800];
	} else if (yyyy < 2000) {
		yearCode = TK20[yyyy - 1900];
	} else if (yyyy < 2100) {
		yearCode = TK21[yyyy - 2000];
	} else {
		yearCode = TK22[yyyy - 2100];
	}
	return decodeLunarYear(yyyy, yearCode);
}

var FIRST_DAY = jdn(31, 1, 1200);
var LAST_DAY = jdn(31, 12, 2199);

function findLunarDate(jd, ly) {
	if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
		return new LunarDate(0, 0, 0, 0, jd);
	}
	var i = ly.length-1;
	while (jd < ly[i].jd) {
		i--;
	}
	var off = jd - ly[i].jd;
	ret = new LunarDate(ly[i].day+off, ly[i].month, ly[i].year, ly[i].leap, jd);
	return ret;
}

function getLunarDate(dd, mm, yyyy) {
	var ly, jd;
	if (yyyy < 1200 || 2199 < yyyy) {
		return new LunarDate(0, 0, 0, 0, 0);
	}
	ly = getYearInfo(yyyy);
	jd = jdn(dd, mm, yyyy);
	if (jd < ly[0].jd) {
		ly = getYearInfo(yyyy - 1);
	}
	return findLunarDate(jd, ly);
}

function getSolarDate(dd, mm, yyyy) {
	if (yyyy < 1200 || 2199 < yyyy) {
		return new LunarDate(0, 0, 0, 0, 0);
	}
	var ly = getYearInfo(yyyy);
	var lm = ly[mm-1];
	if (lm.month != mm) {
		lm = ly[mm];
	}
	var ld = lm.jd + dd - 1;
	return jdn2date(ld);
}
function getSolarTerm(dayNumber,timeZone){
	return INT(SunLongitude(dayNumber - 0.5 -timeZone/24.0)/PI*12);
}
 
function getMonth(mm, yy) {
	var ly1, ly2, tet1, jd1, jd2, mm1, yy1, result, i;
	if (mm < 12) {
		mm1 = mm + 1;
		yy1 = yy;
	} else {
		mm1 = 1;
		yy1 = yy + 1;
	}
	jd1 = jdn(1, mm, yy);
	jd2 = jdn(1, mm1, yy1);
	ly1 = getYearInfo(yy);
	//alert('1/'+mm+'/'+yy+' = '+jd1+'; 1/'+mm1+'/'+yy1+' = '+jd2);
	tet1 = ly1[0].jd;
	result = new Array();
	if (tet1 <= jd1) { /* tet(yy) = tet1 < jd1 < jd2 <= 1.1.(yy+1) < tet(yy+1) */
		for (i = jd1; i < jd2; i++) {
			result.push(findLunarDate(i, ly1));
		}
	} else if (jd1 < tet1 && jd2 < tet1) { /* tet(yy-1) < jd1 < jd2 < tet1 = tet(yy) */
		ly1 = getYearInfo(yy - 1);
		for (i = jd1; i < jd2; i++) {
			result.push(findLunarDate(i, ly1));
		}
	} else if (jd1 < tet1 && tet1 <= jd2) { /* tet(yy-1) < jd1 < tet1 <= jd2 < tet(yy+1) */
		ly2 = getYearInfo(yy - 1);
		for (i = jd1; i < tet1; i++) {
			result.push(findLunarDate(i, ly2));
		}
		for (i = tet1; i < jd2; i++) {
			result.push(findLunarDate(i, ly1));
		}
	}
	return result;
}

//CAN CHI 
function getYearCanChi(year) {
	// tinh căn chi theo công thứ	
	return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
}


function getDayTietKhi(jd){ 
	return TIETKHI[getSolarTerm(jd+1,7)];// GMT+7 - vietnam
}



function getCanHour0(jdn) {
	return CAN[(jdn-1)*2 % 10];
}

function getGioHoangDao(jd) {
	var chiOfDay = (jd+1) % 12;
	var gioHD = GIO_HD[chiOfDay % 6]; 
	var ret = "";
	var count = 0;
	for (var i = 0; i < 12; i++) {
		if (gioHD.charAt(i) == '1') {
			ret += CHI[i];
			ret += ' ('+(i*2+23)%24+'-'+(i*2+1)%24+')';
			if (count++ < 5) ret += ', ';
			if (count == 3) ret += '\n';
		}
	}
	return ret;
}

function getCanChi(lunar) {
	var dayName, monthName, yearName;
	dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd+1)%12];
	monthName = CAN[(lunar.year*12+lunar.month+3) % 10] + " " + CHI[(lunar.month+1)%12];
	if (lunar.leap == 1) {
		monthName += " (nhuận)";
	}
	yearName = getYearCanChi(lunar.year);
	return new Array(dayName, monthName, yearName);
}


function getDayName(jd){
	return  CAN[(jd + 9)% 10] + " " + CHI[(jd+1)%12];
}


export default{
    getMonth,
    decodeLunarYear,
    getLunarDate,
    getSolarDate,
	getYearCanChi,
	getGioHoangDao,
	getCanChi,
	getDayName,
	getDayTietKhi,
	getCanHour0,
	CHI,CAN
}