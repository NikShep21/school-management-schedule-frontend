import path from "node:path";
import { defineConfig, type Connect, type Plugin, type ViteDevServer } from "vite";
import type { ServerResponse } from "node:http";
import react from "@vitejs/plugin-react";

type LectureTrack = "FRONTEND" | "BACKEND" | "ANALYTICS";

type MockScheduleEvent = {
  type: "LECTURE";
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
  };
  tracks: LectureTrack[];
};

type MockScheduleDay = {
  date: string;
  events: MockScheduleEvent[];
};

const allJuneData: MockScheduleDay[] = [
  {
    date: "2026-06-01",
    events: [
      {
        type: "LECTURE",
        id: 1,
        title: "Введение в архитектуру веб-приложений",
        start_time: "2026-06-01T10:00:00Z",
        end_time: "2026-06-01T11:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
      {
        type: "LECTURE",
        id: 2,
        title: "Основы работы с Git и CI/CD",
        start_time: "2026-06-01T12:00:00Z",
        end_time: "2026-06-01T13:30:00Z",
        teacher: { id: 102, first_name: "Мария", last_name: "Сидорова" },
        tracks: ["FRONTEND", "BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-03",
    events: [
      {
        type: "LECTURE",
        id: 3,
        title: "Современный JavaScript: ES6+",
        start_time: "2026-06-03T15:00:00Z",
        end_time: "2026-06-03T16:30:00Z",
        teacher: { id: 103, first_name: "Евгений", last_name: "Кузнецов" },
        tracks: ["FRONTEND"],
      },
    ],
  },
  {
    date: "2026-06-04",
    events: [
      {
        type: "LECTURE",
        id: 4,
        title: "Базы данных: SQL vs NoSQL",
        start_time: "2026-06-04T10:00:00Z",
        end_time: "2026-06-04T11:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
      {
        type: "LECTURE",
        id: 5,
        title: "React: Хуки и управление состоянием",
        start_time: "2026-06-04T12:00:00Z",
        end_time: "2026-06-04T13:30:00Z",
        teacher: { id: 103, first_name: "Евгений", last_name: "Кузнецов" },
        tracks: ["FRONTEND"],
      },
      {
        type: "LECTURE",
        id: 6,
        title: "Node.js: Event Loop",
        start_time: "2026-06-04T14:00:00Z",
        end_time: "2026-06-04T15:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
      {
        type: "LECTURE",
        id: 28,
        title: "Проверка отображения занятия на границе дня",
        start_time: "2026-06-04T23:30:00Z",
        end_time: "2026-06-05T01:00:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-08",
    events: [
      {
        type: "LECTURE",
        id: 7,
        title: "Паттерны проектирования в Frontend",
        start_time: "2026-06-08T10:00:00Z",
        end_time: "2026-06-08T11:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND"],
      },
      {
        type: "LECTURE",
        id: 8,
        title: "Основы Docker и контейнеризации",
        start_time: "2026-06-08T12:00:00Z",
        end_time: "2026-06-08T13:30:00Z",
        teacher: { id: 102, first_name: "Мария", last_name: "Сидорова" },
        tracks: ["BACKEND", "FRONTEND"],
      },
    ],
  },
  {
    date: "2026-06-10",
    events: [
      {
        type: "LECTURE",
        id: 9,
        title: "Продвинутая работа с React Query",
        start_time: "2026-06-10T11:00:00Z",
        end_time: "2026-06-10T12:30:00Z",
        teacher: { id: 102, first_name: "Мария", last_name: "Сидорова" },
        tracks: ["FRONTEND"],
      },
      {
        type: "LECTURE",
        id: 10,
        title: "Архитектура REST API",
        start_time: "2026-06-10T13:00:00Z",
        end_time: "2026-06-10T14:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-12",
    events: [
      {
        type: "LECTURE",
        id: 11,
        title: "Тестирование React-приложений",
        start_time: "2026-06-12T10:00:00Z",
        end_time: "2026-06-12T11:30:00Z",
        teacher: { id: 103, first_name: "Евгений", last_name: "Кузнецов" },
        tracks: ["FRONTEND"],
      },
      {
        type: "LECTURE",
        id: 12,
        title: "Интеграционное тестирование API",
        start_time: "2026-06-12T12:00:00Z",
        end_time: "2026-06-12T13:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-15",
    events: [
      {
        type: "LECTURE",
        id: 13,
        title: "Оптимизация производительности Frontend",
        start_time: "2026-06-15T15:00:00Z",
        end_time: "2026-06-15T16:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND"],
      },
    ],
  },
  {
    date: "2026-06-16",
    events: [
      {
        type: "LECTURE",
        id: 14,
        title: "Микросервисная архитектура",
        start_time: "2026-06-16T10:00:00Z",
        end_time: "2026-06-16T11:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
      {
        type: "LECTURE",
        id: 15,
        title: "WebSockets и Real-time",
        start_time: "2026-06-16T12:00:00Z",
        end_time: "2026-06-16T13:30:00Z",
        teacher: { id: 102, first_name: "Мария", last_name: "Сидорова" },
        tracks: ["FRONTEND", "BACKEND"],
      },
      {
        type: "LECTURE",
        id: 16,
        title: "Безопасность веб-приложений (OWASP)",
        start_time: "2026-06-16T14:00:00Z",
        end_time: "2026-06-16T15:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-18",
    events: [
      {
        type: "LECTURE",
        id: 17,
        title: "TypeScript: Продвинутые типы",
        start_time: "2026-06-18T10:00:00Z",
        end_time: "2026-06-18T11:30:00Z",
        teacher: { id: 103, first_name: "Евгений", last_name: "Кузнецов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
      {
        type: "LECTURE",
        id: 18,
        title: "Работа с ORM (Prisma/TypeORM)",
        start_time: "2026-06-18T12:00:00Z",
        end_time: "2026-06-18T13:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-22",
    events: [
      {
        type: "LECTURE",
        id: 19,
        title: "Next.js: SSR и SSG",
        start_time: "2026-06-22T10:00:00Z",
        end_time: "2026-06-22T11:30:00Z",
        teacher: { id: 102, first_name: "Мария", last_name: "Сидорова" },
        tracks: ["FRONTEND"],
      },
      {
        type: "LECTURE",
        id: 20,
        title: "Очереди сообщений (RabbitMQ, Kafka)",
        start_time: "2026-06-22T12:00:00Z",
        end_time: "2026-06-22T13:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-24",
    events: [
      {
        type: "LECTURE",
        id: 21,
        title: "Состояние гонки и блокировки в БД",
        start_time: "2026-06-24T14:00:00Z",
        end_time: "2026-06-24T15:30:00Z",
        teacher: { id: 104, first_name: "Дарья", last_name: "Попова" },
        tracks: ["BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-25",
    events: [
      {
        type: "LECTURE",
        id: 22,
        title: "GraphQL: Основы и интеграция",
        start_time: "2026-06-25T10:00:00Z",
        end_time: "2026-06-25T11:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
      {
        type: "LECTURE",
        id: 23,
        title: "Анимации и Canvas в вебе",
        start_time: "2026-06-25T12:00:00Z",
        end_time: "2026-06-25T13:30:00Z",
        teacher: { id: 103, first_name: "Евгений", last_name: "Кузнецов" },
        tracks: ["FRONTEND"],
      },
    ],
  },
  {
    date: "2026-06-26",
    events: [
      {
        type: "LECTURE",
        id: 24,
        title: "Архитектура LMS и проектирование API",
        start_time: "2026-06-26T10:00:00Z",
        end_time: "2026-06-26T11:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-29",
    events: [
      {
        type: "LECTURE",
        id: 25,
        title: "Деплой и мониторинг (Prometheus, Grafana)",
        start_time: "2026-06-29T10:00:00Z",
        end_time: "2026-06-29T11:30:00Z",
        teacher: { id: 102, first_name: "Мария", last_name: "Сидорова" },
        tracks: ["BACKEND"],
      },
      {
        type: "LECTURE",
        id: 26,
        title: "Менеджмент и оценка задач",
        start_time: "2026-06-29T12:00:00Z",
        end_time: "2026-06-29T13:30:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
    ],
  },
  {
    date: "2026-06-30",
    events: [
      {
        type: "LECTURE",
        id: 27,
        title: "Итоговый Q&A",
        start_time: "2026-06-30T16:00:00Z",
        end_time: "2026-06-30T18:00:00Z",
        teacher: { id: 101, first_name: "Алексей", last_name: "Иванов" },
        tracks: ["FRONTEND", "BACKEND"],
      },
    ],
  },
];

const isScheduleUrl = (url: string) => {
  return url.includes("/api/schedules") || url.includes("/api/schedule");
};

const getDateFromIso = (date: string) => {
  return date.slice(0, 10);
};

const groupEventsByApiDate = (events: MockScheduleEvent[]): MockScheduleDay[] => {
  const eventsByDate = events.reduce<Record<string, MockScheduleEvent[]>>(
    (acc, event) => {
      const dateKey = getDateFromIso(event.start_time);

      acc[dateKey] ??= [];
      acc[dateKey].push(event);

      return acc;
    },
    {},
  );

  return Object.entries(eventsByDate)
    .map(([date, groupedEvents]) => ({
      date,
      events: groupedEvents,
    }))
    .sort((firstDay, secondDay) => firstDay.date.localeCompare(secondDay.date));
};

const mockBackendPlugin = (): Plugin => ({
  name: "mock-backend",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(
      (req: Connect.IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
        if (!req.url || !isScheduleUrl(req.url)) {
          next();
          return;
        }

        const url = new URL(req.url, `http://${req.headers.host}`);

        const startDate = url.searchParams.get("start_date");
        const endDate = url.searchParams.get("end_date");
        const track = url.searchParams.get("track") as LectureTrack | null;

        const filteredEvents = allJuneData
          .flatMap((day) => day.events)
          .filter((event) => {
            const eventDate = getDateFromIso(event.start_time);

            if (startDate && eventDate < startDate) {
              return false;
            }

            if (endDate && eventDate > endDate) {
              return false;
            }

            if (track && !event.tracks.includes(track)) {
              return false;
            }

            return true;
          });

        const responseData = groupEventsByApiDate(filteredEvents);

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(responseData));
      },
    );
  },
});

export default defineConfig({
  plugins: [react(), mockBackendPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
