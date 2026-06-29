export const scheduleTexts = {
  common: {
    close: "Закрыть",
  },

  toolbar: {
    today: "Сегодня",
    createLecture: "Создать лекцию",
  },

  tracks: {
    frontend: "Frontend",
    backend: "Backend",
    analytics: "Analytics",
    common: "Общая",
  },

  trackFilter: {
    label: "Направление",
    all: "Все направления",
  },

  calendar: {
    noLessons: "Занятий нет",
    createLecture: "Создать лекцию",
    moreEvents: (count: number) => `ещё ${count}`,
  },
} as const;
