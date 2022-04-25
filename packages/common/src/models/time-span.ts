const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;
const DAYS_IN_A_WEEK = 7;

const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * HOURS_IN_A_DAY;
const MILLISECONDS_IN_A_WEEK = MILLISECONDS_IN_A_DAY * DAYS_IN_A_WEEK;


export class TimeSpan {

	static Subtract(date1: Date, date2: Date) {
		return new TimeSpan(date1.getMilliseconds() - date2.getMilliseconds());
	}

	static Day(): TimeSpan { return new TimeSpan(MILLISECONDS_IN_A_DAY); }
	static Hour(): TimeSpan { return new TimeSpan(MILLISECONDS_IN_AN_HOUR); }
	static Week(): TimeSpan { return new TimeSpan(MILLISECONDS_IN_A_WEEK) };
	static Month(): TimeSpan {
		const now = new Date();
		const aMonthAgo = new Date();
		aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);
		return new TimeSpan(now.getMilliseconds() - aMonthAgo.getMilliseconds());
	}

	constructor(milliSeconds = 0) {
		this._seconds = 0;
		this._minutes = 0;
		this._hours = 0;
		this._days = 0;
		this._totalMilliSeconds = this._milliseconds = milliSeconds;
        this.calcMilliSeconds();
	}

	addTo(date: Date): Date {
		date.setMilliseconds(date.getMilliseconds() + this._totalMilliSeconds);

		return date;
	}

	subtructFrom(date: Date): Date {
		date.setMilliseconds(date.getMilliseconds() - this._totalMilliSeconds);

		return date;
	}

	private _milliseconds: number;
	private _totalMilliSeconds: number;
	private _seconds: number;
	private _minutes: number;
	private _hours: number;
	private _days: number;

	get days(): number {
		return this._days;
	}

	set days(value: number) {
		if (isNaN(value)) {
			value = 0;
		}
		this._days = value;
		this.calcMilliSeconds();
	}

	get hours(): number {
		return this._hours;
	}
	set hours(value: number) {
		if (isNaN(value)) {
			value = 0;
		}
		this._hours = value;
		this.calcMilliSeconds();
	}

	get minutes(): number {
		return this._minutes;
	}
	set minutes(value: number) {
		if (isNaN(value)) {
			value = 0;
		}
		this._minutes = value;
		this.calcMilliSeconds();
	}

	get seconds(): number {
		return this._seconds;
	}
	set seconds(value: number) {
		this._seconds = value;
		this.calcMilliSeconds();
	}

	get milliseconds(): number {
		return this._milliseconds;
	}
	set milliseconds(value: number) {
		if (isNaN(value)) {
			value = 0;
		}
		this._milliseconds = value;
		this.calcMilliSeconds();
	}

	get totalMilliSeconds() {
		return this._totalMilliSeconds;
	}

	get totalSeconds() {
		return Math.floor(this._totalMilliSeconds / MILLISECONDS_IN_A_SECOND);
	}

	get totalMinutes() {
		return Math.floor(this._totalMilliSeconds / MILLISECONDS_IN_A_MINUTE);
	}

	get totalHours() {
		return Math.floor(this._totalMilliSeconds / MILLISECONDS_IN_AN_HOUR);
	}

    private get totalHoursPaddedString() {
        return this.totalHours.toString().padStart(2, '0');
    }

    private get minutesPaddedString() {
        return this.minutes.toString().padStart(2, '0');
    }

    private get secondsPaddedString() {
        return this.seconds.toString().padStart(2, '0');
    }

    toJSON()
    {
        return `${this.totalHoursPaddedString}:${this.minutesPaddedString}:${this.secondsPaddedString}`;
    }

	private floorValue(origValue:number, maxValue: number) {
		return { modulu: origValue % maxValue, addition: Math.floor(origValue / maxValue) };
	}

	private calcMilliSeconds() {

		const newMilliSecond = this.floorValue(this._milliseconds, MILLISECONDS_IN_A_SECOND);
		this._milliseconds = newMilliSecond.modulu;
		this._seconds += newMilliSecond.addition;

		const newSecond = this.floorValue(this._seconds, SECONDS_IN_A_MINUTE);
		this._seconds = newSecond.modulu;
		this._minutes += newSecond.addition;

		const newminutes = this.floorValue(this._minutes, MINUTES_IN_AN_HOUR);
		this._minutes = newminutes.modulu;
		this._hours += newminutes.addition;

		const newDays = this.floorValue(this._hours, HOURS_IN_A_DAY);
		this._hours = newDays.modulu;
		this._days += newDays.addition;

		this._totalMilliSeconds = this.days * MILLISECONDS_IN_A_DAY + 
                                  this.hours * MILLISECONDS_IN_AN_HOUR + 
                                  this.minutes * MILLISECONDS_IN_A_MINUTE + 
                                  this.seconds * MILLISECONDS_IN_A_SECOND + 
                                  this.milliseconds;
	}
}