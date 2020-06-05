import * as moment from 'moment';

export class DateFormatValueConverter {
    toView(value: moment.MomentInput) {
        return moment(value).format('MM/DD/YYYY hh:mm');
    }
}

export class TimeFormatValueConverter {
    toView(value: moment.MomentInput) {
        return moment(value).format('hh:mm');
    }
}
