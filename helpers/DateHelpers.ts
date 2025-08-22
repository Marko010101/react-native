export function formatDateYYYYMMDD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const toDate = (d: any): Date | undefined =>
  d instanceof Date
    ? d
    : typeof d?.toDate === "function"
    ? d.toDate()
    : new Date(d);

export const normalizeRange = (a: Date, b: Date): [Date, Date] =>
  a > b ? [b, a] : [a, b];

export const todayRange = (): [Date, Date] => {
  const t = new Date();
  return [t, t];
};

export const yesterdayRange = (): [Date, Date] => {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return [y, y];
};

export const last7DaysRange = (): [Date, Date] => {
  const e = new Date();
  const s = new Date();
  s.setDate(e.getDate() - 6);
  return normalizeRange(s, e);
};

export const buildHandleRangeChange =
  (
    startDate: Date,
    endDate: Date,
    setStartDate: (d: Date) => void,
    setEndDate: (d: Date) => void
  ) =>
  (payload: any) => {
    // Case: range payload { startDate?, endDate? }
    if (payload && (payload.startDate || payload.endDate)) {
      const s = payload.startDate ? toDate(payload.startDate) : undefined;
      const e = payload.endDate ? toDate(payload.endDate) : undefined;

      if (s && e) {
        const [a, b] = normalizeRange(s, e);
        setStartDate(a);
        setEndDate(b);
        return;
      }
      if (s) setStartDate(s);
      if (e) setEndDate(e);
      return;
    }

    const d = payload?.date ? toDate(payload.date) : undefined;
    if (!d) return;

    if (startDate && endDate) {
      setStartDate(d);
      setEndDate(d);
      return;
    }

    if (startDate && !endDate) {
      const [a, b] = normalizeRange(startDate, d);
      setStartDate(a);
      setEndDate(b);
      return;
    }

    setStartDate(d);
    setEndDate(d);
  };
