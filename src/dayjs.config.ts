import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.locale('ru')
dayjs.tz.setDefault("Europe/Moscow")