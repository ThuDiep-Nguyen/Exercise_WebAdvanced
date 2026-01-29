import { Component } from '@angular/core';

@Component({
  selector: 'app-ex10',
  standalone: false,
  templateUrl: './ex10.html',
  styleUrl: './ex10.css',
})
export class EX10 {
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay: number = 1;
  selectedMonth: number = 1;
  selectedYear: number = 2024;

  result: any = null;

  // Mảng hằng số Can Chi dùng chung
  readonly CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  readonly CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  constructor() {
    // Khởi tạo data select box
    for (let i = 1; i <= 31; i++) this.days.push(i);
    for (let i = 1; i <= 12; i++) this.months.push(i);
    for (let i = 1900; i <= 2100; i++) this.years.push(i);

    // Mặc định ngày hôm nay
    const today = new Date();
    this.selectedDay = today.getDate();
    this.selectedMonth = today.getMonth() + 1;
    this.selectedYear = today.getFullYear();
  }

  convert() {
    const solarDate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
    
    // Validate ngày
    if (solarDate.getMonth() + 1 !== this.selectedMonth) {
      alert('Ngày không hợp lệ!');
      return;
    }

    // 1. Tính Âm lịch (Ngày, Tháng, Năm số)
    const lunarData = this.convertSolarToLunar(this.selectedDay, this.selectedMonth, this.selectedYear);
    const jd = this.jdFromDate(this.selectedDay, this.selectedMonth, this.selectedYear);

    // 2. Tính hệ thống Can Chi (Ngày, Tháng, Năm chữ)
    const fullCanChi = this.calculateFullCanChi(lunarData.day, lunarData.month, lunarData.year, jd);

    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // 3. Hiển thị kết quả
    this.result = {
      thu: daysOfWeek[solarDate.getDay()],
      duongLich: `${this.selectedDay}/${this.selectedMonth}/${this.selectedYear}`,
      amLich: `${lunarData.day}/${lunarData.month}/${lunarData.year}${lunarData.leap ? ' (Nhuận)' : ''}`,
      
      // Hiển thị đầy đủ Can Chi
      namAm: fullCanChi.nam,
      thangAm: `Tháng ${fullCanChi.thang} ${lunarData.leap ? '(Nhuận)' : ''}`,
      ngayAm: `Ngày ${fullCanChi.ngay}`
    };
  }

  // ==========================================================
  // LOGIC TÍNH CAN CHI (NGÀY, THÁNG, NĂM)
  // ==========================================================
  
  calculateFullCanChi(lunarDay: number, lunarMonth: number, lunarYear: number, jd: number) {
    // 1. Can Chi Năm
    // Công thức: (Năm + 6) % 10 ra Can, (Năm + 8) % 12 ra Chi.
    // Ví dụ: 2024 % 10 = 4 (Giáp), nhưng mảng bắt đầu từ Giáp=0 nên cần chỉnh offset chuẩn.
    // Quy ước chuẩn: 0=Giáp, 1=Ất... | 0=Tý, 1=Sửu...
    // Năm 4 CN là năm Giáp Tý. => (Year - 4) % 10.
    const canYearIndex = (lunarYear + 6) % 10; 
    const chiYearIndex = (lunarYear + 8) % 12;
    const canChiYear = `${this.CAN[canYearIndex]} ${this.CHI[chiYearIndex]}`;

    // 2. Can Chi Tháng
    // Tháng 1 luôn là tháng Dần (index 2).
    // Can tháng phụ thuộc Can năm (Ngũ hổ độn).
    // Năm Giáp/Kỷ (0/5) -> Tháng 1 là Bính Dần.
    // Công thức tìm Can tháng 1: (CanNam % 5) * 2 + 2
    const startCanMonth = (canYearIndex % 5) * 2 + 2;
    const canMonthIndex = (startCanMonth + (lunarMonth - 1)) % 10;
    const chiMonthIndex = (2 + (lunarMonth - 1)) % 12; // 2 là index của Dần
    const canChiMonth = `${this.CAN[canMonthIndex]} ${this.CHI[chiMonthIndex]}`;

    // 3. Can Chi Ngày
    // Tính dựa trên Julian Day (JD).
    // Công thức chuẩn: Can = (JD + 9) % 10, Chi = (JD + 1) % 12
    const canDayIndex = (jd + 9) % 10;
    const chiDayIndex = (jd + 1) % 12;
    const canChiDay = `${this.CAN[canDayIndex]} ${this.CHI[chiDayIndex]}`;

    return {
      nam: canChiYear,
      thang: canChiMonth,
      ngay: canChiDay
    };
  }

  // ==========================================================
  // THUẬT TOÁN THIÊN VĂN (GIỮ NGUYÊN TỪ BẢN TRƯỚC)
  // ==========================================================

  convertSolarToLunar(dd: number, mm: number, yy: number) {
    const timeZone = 7;
    const dayNumber = this.jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = this.getNewMoonDay(k + 1, timeZone);

    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, timeZone);
    }

    let a11 = this.getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear = yy;
    
    if (a11 >= dayNumber) {
      lunarYear = yy - 1;
      a11 = this.getLunarMonth11(yy - 1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    let diff = Math.floor((monthStart - a11) / 29);
    let lunarMonth = diff + 11;
    let lunarLeap = 0;

    b11 = this.getLunarMonth11(yy + 1, timeZone);
    if (dayNumber >= b11) {
       lunarYear++;
       lunarMonth = 1;
    } else {
       b11 = this.getLunarMonth11(lunarYear + 1, timeZone);
    }

    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }

    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth > 12) lunarMonth -= 12; // Safety check

    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap };
  }

  jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = (T < -11) ? (0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3) : (-0.000278 + 0.000265 * T + 0.000262 * T2);
    return Math.floor(Jd1 + C1 - deltat + 0.5 + timeZone / 24);
  }

  getSunLongitude(dayNumber: number, timeZone: number): number {
    const k = (dayNumber - 0.5 - timeZone / 24 - 2451545.0) / 36525;
    const T2 = k * k;
    const dr = Math.PI / 180;
    const M = 357.52910 + 35999.05030 * k - 0.0001559 * T2 - 0.00000048 * k * T2;
    const L0 = 280.46645 + 36000.76983 * k + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * k - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * k) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L - 360 * Math.floor(L / 360);
    return L;
  }

  getLunarMonth11(yy: number, timeZone: number): number {
    const off = this.jdFromDate(31, 12, yy) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = this.getNewMoonDay(k, timeZone);
    const sunLong = this.getSunLongitude(nm, timeZone);
    if (sunLong >= 270) nm = this.getNewMoonDay(k - 1, timeZone);
    return nm;
  }

  getLeapMonthOffset(a11: number, timeZone: number): number {
    const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }
}