import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CalendarView from './Calendar.view'
import CalendarService from '../../services/CalendarService'
import Data from '../../data/proverb'
const dd = new Date();


export default class CalendarController extends Component {

    constructor() {
        super();
        this.state = {

            day: '',
            mm: dd.getMonth() + 1,
            yy: dd.getFullYear(),
            data: ''
        }

    }

    getDayInfo(jd) {
        var text = "Ngày " + CalendarService.getDayName(jd) + "\n";
        text += "Giờ đầu ngày " + CalendarService.getCanHour0(jd) + " " + CalendarService.CHI[0] + "\n";
        text += "Tiết: " + CalendarService.getDayTietKhi(jd) + "\n";
        text += "Giờ Hoàn đạo " + CalendarService.getGioHoangDao(jd);
        return text;
    }
    calcDate() {
        // tháng/năm của tháng tiếp theo
        let nextMonth = this.state.mm + 1;
        let nextYear = this.state.yy;
        // tháng/năm của tháng trước đó
        let lastMonth = this.state.mm - 1;
        let lastYear = this.state.yy;

        // sang năm sau
        if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
        }
        // lùi 1 năm
        if (lastYear <= 0) {
            lastMonth = 12;
            lastYear--;
        }
        // tính bảng ngày tháng sau
        let daysInNextMonth = CalendarService.getMonth(nextMonth, nextYear);
        // tính bảng ngày tháng trước đó
        let daysInLastMonth = CalendarService.getMonth(lastMonth, lastYear);
        // tính bảng ngày tháng hiện tại
        let daysInMonth = CalendarService.getMonth(this.state.mm, this.state.yy);
        //
        this.setState({ day: this.convertToTable(daysInMonth, daysInLastMonth, daysInNextMonth) })
    }
    componentDidMount() {
        this.calcDate();
        this.getData();
    }
    getData() {
        var datas = []
        for (var k in Data) {
            let data = Data[k].month
            if (data == this.state.mm) {
                datas.push(Data[k])
            }
        }
     
        this.setState({ data: datas })
    }

    convertToTable(dayInMonth, daysInLastMonth, daysInNextMonth) {
        var result = [];
        // số ô trắng đầu tiên -> sau sẽ fill bằng thang rước
        let emptyCells = (dayInMonth[0].jd + 1) % 7;
        // tính số lượng dòng trong lịch
        let numRow = Math.floor((dayInMonth.length + emptyCells) / 7) + 1;
        var nextMonDay = 0;
        // tạo bảng danh sách ngày
        for (var i = 0; i < numRow; i++) {
            // for 7 ngày
            for (var j = 0; j < 7; j++) {
                var k = 7 * i + j
                // nếu l< số ô trắng thì đó là các ô chứ ngày tháng trước đó
                if (k < emptyCells) {
                    //  ngày của tháng trước
                    // lấy số lượng ngày của tháng trước đó
                    let numDayInLastMonth = daysInLastMonth.length;
                    // lấy ngày âm
                    let ld1 = daysInLastMonth[numDayInLastMonth - (emptyCells - k)];
                    //
                    result.push({ solar: numDayInLastMonth - (emptyCells - k) + 1, jd: ld1.jd, ld: ld1.day, outner: true })

                } else {
                    // ngay duong
                    let solar = k - emptyCells + 1;
                    // ngay am
                    let ld1 = dayInMonth[k - emptyCells];
                    // nếu  ld1= null nghĩ là  k đã vượt quá số ngày trong tháng -> hiển thị các ngày tháng tiếp theo
                    if (ld1 != null)
                        result.push({ solar: solar, jd: ld1.jd, ld: ld1.day })
                    else {
                        // các ngày tháng thiếp theo
                        let len = daysInLastMonth.length;
                        let ld1 = daysInNextMonth[nextMonDay++];
                        //
                        result.push({ solar: nextMonDay, jd: ld1.jd, ld: ld1.day, outner: true });
                    }
                }
            }
        }
        return result;

    }
    render() {
        return (
            <CalendarView day={this.state.day}
                {...this.props}
                month={this.state.mm}
                getMonths={this.getMonths.bind(this)}
                getDayInfo={this.getDayInfo.bind(this)}
                data={this.state.data}
            ></CalendarView>
        )
    }
    getMonths(months, years) {
        // dung thế nay để sửa thông tin trong state ngay ko tốn 1 lần render 
        // vì trong calcDate đã gọi setState để reRender 1 lần rồi.
        this.state.mm = months;
        this.state.yy = years;
        this.calcDate();
        this.getData();
    }
}