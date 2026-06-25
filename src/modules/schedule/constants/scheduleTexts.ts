export const scheduleTexts = {
  common: {
    close: "Закрыть",
  },

  toolbar: {
    today: "Сегодня",
    createLecture: "Создать лекцию",
    previousPeriod: "Предыдущий период",
    nextPeriod: "Следующий период",
    selectDate: "Выбрать дату",
  },

  trackFilter: {
    label: "Направление",
    all: "Все направления",
    frontend: "Frontend",
    backend: "Backend",
    analytics: "Analytics",
  },

  calendar: {
    noLessons: "Занятий нет",
    createLecture: "Создать лекцию",
    moreEvents: (count: number) => `ещё ${count}`,
  },
} as const;
