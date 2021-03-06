import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const fromNow = (param) => {
  return dayjs(param).fromNow();
};
