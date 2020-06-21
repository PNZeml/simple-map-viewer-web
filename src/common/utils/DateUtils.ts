import moment, {Moment} from "moment";
import {DATE_FORMAT, TIME_FORMAT} from "@/common/consts/DateFormats";

export default class DateUtils {
    public static toTimeFormatIfTodayOtherwiseDate(date: Date | Moment): string {
        const dateMoment = moment(date);
        const startOfDateMoment = moment(dateMoment).startOf("day");
        return startOfDateMoment.diff(moment(), "days") == 0
            ? dateMoment.format(TIME_FORMAT)
            : dateMoment.format(DATE_FORMAT);
    }
}