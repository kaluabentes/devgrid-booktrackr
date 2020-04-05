const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Agu",
  "Set",
  "Nov",
  "Dec",
];

const getLastIndex = (array) => array.length && array.length - 1;

// Reverse to a format that date objects will work
const createDateObject = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return new Date(year, Number(month) - 1, day);
};

// Create date objects and sort by ascending ended dates
const prepareDates = (items) => {
  const typedItems = items.map((item) => ({
    ...item,
    startedAt: item.startedAt && createDateObject(item.startedAt),
    endedAt: item.endedAt && createDateObject(item.endedAt),
  }));

  typedItems.sort((a, b) => a.endedAt - b.endedAt);

  return typedItems;
};

const calculateMonthlyAverage = (chuncks) => {
  const totalBooksRead = chuncks.reduce((prev, curr) => prev + curr.length, 0);

  return Math.ceil(totalBooksRead / chuncks.length);
};

const getPeriodChunks = (books, year) => {
  const booksArray = prepareDates(books).filter(
    (item) => item.endedAt && item.endedAt.getFullYear() === year
  );

  return booksArray.reduce((prev, curr) => {
    // Initialize the first array
    if (prev.length < 1) {
      return [[curr]];
    }

    const lastArray = prev[getLastIndex(prev)];
    const { startedAt } = lastArray[0]; // Take first startedDate of the last array
    const { endedAt } = curr;

    if (!endedAt) {
      return prev;
    }

    const intervalDays = (endedAt - startedAt) / (1000 * 60 * 60 * 24);

    if (intervalDays > 30) {
      return [...prev, [curr]];
    }

    lastArray.push(curr);

    return prev;
  }, []);
};

class ReportService {
  constructor() {
    this.year = new Date().getFullYear();
  }

  setYear(year) {
    this.year = Number(year);
    return this;
  }

  getMonthlyAverage(books) {
    const periodChunks = getPeriodChunks(books, this.year);
    return calculateMonthlyAverage(periodChunks);
  }

  getMonthlySummary(books) {
    const periodChunks = getPeriodChunks(books, this.year);

    return periodChunks.reduce((prev, curr) => {
      return [
        ...prev,
        {
          name: MONTHS[curr[0].startedAt.getMonth()],
          quantity: curr.length,
        },
      ];
    }, []);
  }
}

export default new ReportService();
