import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";

type LectureTrack = "FRONTEND" | "BACKEND" | "ANALYTICS";

type UserRole = "STUDENT" | "TEACHER" | "MENTOR" | "ADMIN";

type UserTrack = LectureTrack;

type LectureMaterialType = "presentation" | "recording" | "feedback" | "material";

interface LectureMaterialBody {
  type: LectureMaterialType;
  title: string;
  url: string;
}

interface LectureRequestBody {
  stream_id: number;
  teacher_id: number;
  tracks: LectureTrack[];
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  kontur_talk_url: string;
  materials: LectureMaterialBody[];
}

type UpdateLectureRequestBody = Partial<LectureRequestBody>;

interface HomeworkRequestBody {
  stream_id: number;
  tracks: LectureTrack[];
  title: string;
  description?: string | null;
  soft_deadline: string;
  hard_deadline: string;
}

type UpdateHomeworkRequestBody = Partial<HomeworkRequestBody>;

interface UserRoleBindingMock {
  role: UserRole;
  track?: UserTrack;
  position?: string;
  stream_id?: number;
}

interface UserRoleBindingResponse {
  role: UserRole;
  track?: UserTrack;
  position?: string;
}

interface UserMock {
  id: number;
  first_name: string;
  last_name: string;
  roles: UserRoleBindingMock[];
}

interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  roles: UserRoleBindingResponse[];
}

interface GetUsersResponse {
  items: UserResponse[];
  total: number;
  page: number;
  limit: number;
}

interface LectureMock {
  id: number;
  stream: {
    id: number;
    name: string;
  };
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
  };
  tracks: LectureTrack[];
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  kontur_talk_url: string;
  materials: Array<{
    id: number;
    type: LectureMaterialType;
    title: string;
    url: string;
  }>;
}

interface HomeworkMock {
  id: number;
  stream_id: number;
  tracks: LectureTrack[];
  title: string;
  description: string;
  soft_deadline: string;
  hard_deadline: string;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const readJsonBody = async <T>(req: IncomingMessage): Promise<T | null> => {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return null;
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString()) as T;
  } catch {
    return null;
  }
};

const sendJson = (res: ServerResponse, statusCode: number, data: unknown): void => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const sendNoContent = (res: ServerResponse): void => {
  res.statusCode = 204;
  res.end();
};

const sendMethodNotAllowed = (res: ServerResponse): void => {
  res.statusCode = 405;
  res.end();
};
type StreamMock = {
  id: number;
  name: string;
};

const streamsMock: Record<number, StreamMock> = {
  5: {
    id: 5,
    name: "SHP 2026",
  },
} satisfies Record<number, LectureMock["stream"]>;

const usersMock: UserMock[] = [
  {
    id: 5,
    first_name: "Иван",
    last_name: "Петров",
    roles: [
      {
        role: "TEACHER",
        track: "BACKEND",
        position: "Senior Backend Developer",
        stream_id: 5,
      },
    ],
  },
  {
    id: 6,
    first_name: "Анна",
    last_name: "Смирнова",
    roles: [
      {
        role: "TEACHER",
        track: "FRONTEND",
        position: "Frontend Developer",
        stream_id: 5,
      },
    ],
  },
  {
    id: 7,
    first_name: "Пётр",
    last_name: "Иванов",
    roles: [
      {
        role: "TEACHER",
        track: "BACKEND",
        position: "Java Developer",
        stream_id: 5,
      },
    ],
  },
  {
    id: 8,
    first_name: "Мария",
    last_name: "Кузнецова",
    roles: [
      {
        role: "TEACHER",
        track: "ANALYTICS",
        position: "System Analyst",
        stream_id: 5,
      },
    ],
  },
  {
    id: 12,
    first_name: "Алексей",
    last_name: "Зыгарь",
    roles: [
      {
        role: "TEACHER",
        track: "FRONTEND",
        position: "Frontend Developer",
        stream_id: 5,
      },
    ],
  },
  {
    id: 20,
    first_name: "Дмитрий",
    last_name: "Соколов",
    roles: [
      {
        role: "MENTOR",
        track: "BACKEND",
        position: "Backend Mentor",
        stream_id: 5,
      },
    ],
  },
  {
    id: 30,
    first_name: "Елена",
    last_name: "Морозова",
    roles: [
      {
        role: "STUDENT",
        track: "FRONTEND",
        stream_id: 5,
      },
    ],
  },
];

const hasUserRole = (user: UserMock, role: UserRole): boolean => {
  return user.roles.some((roleBinding) => roleBinding.role === role);
};

const teachersMock = usersMock.reduce<Record<number, LectureMock["teacher"]>>(
  (acc, user) => {
    if (!hasUserRole(user, "TEACHER")) {
      return acc;
    }

    acc[user.id] = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    return acc;
  },
  {},
);

let nextLectureId = 106;
let nextMaterialId = 1;
let nextHomeworkId = 6;

let lecturesMock: LectureMock[] = [
  {
    id: 101,
    stream: streamsMock[5],
    teacher: teachersMock[5],
    tracks: ["BACKEND"],
    title: "SQL",
    description:
      "Основы SQL: выборка данных, фильтрация, сортировка, агрегации и базовые JOIN.",
    start_time: "2026-05-01T18:00:00Z",
    end_time: "2026-05-01T20:00:00Z",
    kontur_talk_url: "https://hh.ktalk.ru/sql",
    materials: [
      {
        id: nextMaterialId++,
        type: "presentation",
        title: "Презентация: основы SQL",
        url: "https://example.com/materials/sql-basics.pdf",
      },
      {
        id: nextMaterialId++,
        type: "material",
        title: "Шпаргалка по SELECT и JOIN",
        url: "https://example.com/materials/sql-cheatsheet",
      },
    ],
  },
  {
    id: 102,
    stream: streamsMock[5],
    teacher: teachersMock[6],
    tracks: ["FRONTEND"],
    title: "React Query",
    description:
      "Работа с серверным состоянием: useQuery, useMutation, invalidateQueries и optimistic update.",
    start_time: "2026-05-05T17:00:00Z",
    end_time: "2026-05-05T19:00:00Z",
    kontur_talk_url: "https://hh.ktalk.ru/react-query",
    materials: [
      {
        id: nextMaterialId++,
        type: "presentation",
        title: "React Query: презентация",
        url: "https://example.com/materials/react-query-slides.pdf",
      },
      {
        id: nextMaterialId++,
        type: "recording",
        title: "Запись лекции",
        url: "https://example.com/materials/react-query-recording",
      },
    ],
  },
  {
    id: 103,
    stream: streamsMock[5],
    teacher: teachersMock[6],
    tracks: ["FRONTEND", "BACKEND"],
    title: "Общая лекция по API",
    description:
      "Контракты frontend/backend: DTO, статусы ответов, ошибки, валидация и версионирование API.",
    start_time: "2026-05-05T19:00:00Z",
    end_time: "2026-05-05T21:00:00Z",
    kontur_talk_url: "https://hh.ktalk.ru/api",
    materials: [
      {
        id: nextMaterialId++,
        type: "presentation",
        title: "API contracts",
        url: "https://example.com/materials/api-contracts.pdf",
      },
      {
        id: nextMaterialId++,
        type: "material",
        title: "Пример OpenAPI-спецификации",
        url: "https://example.com/materials/openapi-example",
      },
    ],
  },
  {
    id: 104,
    stream: streamsMock[5],
    teacher: teachersMock[7],
    tracks: ["BACKEND"],
    title: "Spring Boot",
    description:
      "Основы Spring Boot: контроллеры, сервисы, репозитории, DTO и обработка ошибок.",
    start_time: "2026-05-12T16:00:00Z",
    end_time: "2026-05-12T18:00:00Z",
    kontur_talk_url: "https://hh.ktalk.ru/spring",
    materials: [
      {
        id: nextMaterialId++,
        type: "presentation",
        title: "Spring Boot intro",
        url: "https://example.com/materials/spring-boot-intro.pdf",
      },
      {
        id: nextMaterialId++,
        type: "feedback",
        title: "Форма обратной связи",
        url: "https://example.com/forms/spring-feedback",
      },
    ],
  },
  {
    id: 105,
    stream: streamsMock[5],
    teacher: teachersMock[8],
    tracks: ["ANALYTICS"],
    title: "Аналитика требований",
    description:
      "Сбор и описание требований: пользовательские сценарии, ограничения, критерии приёмки.",
    start_time: "2026-05-20T17:00:00Z",
    end_time: "2026-05-20T19:00:00Z",
    kontur_talk_url: "https://hh.ktalk.ru/analytics",
    materials: [
      {
        id: nextMaterialId++,
        type: "presentation",
        title: "Аналитика требований",
        url: "https://example.com/materials/requirements-analysis.pdf",
      },
      {
        id: nextMaterialId++,
        type: "material",
        title: "Шаблон описания требований",
        url: "https://example.com/materials/requirements-template",
      },
    ],
  },
];

let homeworksMock: HomeworkMock[] = [
  {
    id: 1,
    stream_id: 5,
    tracks: ["BACKEND"],
    title: "SQL: базовые запросы",
    description:
      "Написать запросы SELECT, WHERE, ORDER BY и GROUP BY для учебной базы данных.",
    soft_deadline: "2026-05-04T15:00:00Z",
    hard_deadline: "2026-05-06T15:00:00Z",
  },
  {
    id: 2,
    stream_id: 5,
    tracks: ["FRONTEND"],
    title: "React Query: загрузка данных",
    description:
      "Подключить useQuery для списка сущностей, обработать состояния загрузки и ошибки.",
    soft_deadline: "2026-05-08T15:00:00Z",
    hard_deadline: "2026-05-10T15:00:00Z",
  },
  {
    id: 3,
    stream_id: 5,
    tracks: ["FRONTEND", "BACKEND"],
    title: "Контракт API",
    description:
      "Описать контракт API для одной сущности: список, получение по id, создание, обновление и удаление.",
    soft_deadline: "2026-05-09T15:00:00Z",
    hard_deadline: "2026-05-12T15:00:00Z",
  },
  {
    id: 4,
    stream_id: 5,
    tracks: ["BACKEND"],
    title: "Spring Boot: CRUD",
    description:
      "Реализовать controller, service и repository для простой сущности, добавить обработку 404.",
    soft_deadline: "2026-05-15T15:00:00Z",
    hard_deadline: "2026-05-18T15:00:00Z",
  },
  {
    id: 5,
    stream_id: 5,
    tracks: ["ANALYTICS"],
    title: "Описание требований",
    description:
      "Подготовить описание требований к небольшой фиче: сценарии, поля формы и критерии приёмки.",
    soft_deadline: "2026-05-23T15:00:00Z",
    hard_deadline: "2026-05-26T15:00:00Z",
  },
];

const getDatesInRange = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];

  const currentDate = new Date(`${startDate}T00:00:00Z`);
  const lastDate = new Date(`${endDate}T00:00:00Z`);

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return dates;
};

const getDateFromDateTime = (dateTime: string): string => {
  return dateTime.slice(0, 10);
};

const mapLectureToScheduleEvent = (lecture: LectureMock) => {
  return {
    type: "LECTURE",
    id: lecture.id,
    title: lecture.title,
    start_time: lecture.start_time,
    end_time: lecture.end_time,
    teacher: lecture.teacher,
    tracks: lecture.tracks,
  };
};

const sortLecturesByStartTime = (
  firstLecture: LectureMock,
  secondLecture: LectureMock,
): number => {
  const startTimeCompare = firstLecture.start_time.localeCompare(
    secondLecture.start_time,
  );

  if (startTimeCompare !== 0) {
    return startTimeCompare;
  }

  return firstLecture.id - secondLecture.id;
};

const getScheduleByDate = (date: string, track?: string | null) => {
  const events = lecturesMock
    .filter((lecture) => getDateFromDateTime(lecture.start_time) === date)
    .filter((lecture) => {
      return track ? lecture.tracks.includes(track as LectureTrack) : true;
    })
    .sort(sortLecturesByStartTime)
    .map(mapLectureToScheduleEvent);

  return {
    date,
    events,
  };
};

const getLectureIdFromPath = (pathname: string): number | null => {
  const match = pathname.match(/^\/api\/lectures\/(\d+)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
};

const getHomeworkIdFromPath = (pathname: string): number | null => {
  const match = pathname.match(/^\/api\/homeworks\/(\d+)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
};

const getStreamById = (streamId: number): LectureMock["stream"] => {
  return (
    streamsMock[streamId] ?? {
      id: streamId,
      name: `Stream ${streamId}`,
    }
  );
};

const getTeacherById = (teacherId: number): LectureMock["teacher"] => {
  return (
    teachersMock[teacherId] ?? {
      id: teacherId,
      first_name: "Неизвестный",
      last_name: "Преподаватель",
    }
  );
};

const mapMaterialsToMock = (
  materials: LectureMaterialBody[] = [],
): LectureMock["materials"] => {
  return materials.map((material) => ({
    id: nextMaterialId++,
    ...material,
  }));
};

const createLectureFromBody = (body: LectureRequestBody): LectureMock => {
  return {
    id: nextLectureId++,
    stream: getStreamById(body.stream_id),
    teacher: getTeacherById(body.teacher_id),
    tracks: body.tracks,
    title: body.title,
    description: body.description,
    start_time: body.start_time,
    end_time: body.end_time,
    kontur_talk_url: body.kontur_talk_url,
    materials: mapMaterialsToMock(body.materials),
  };
};

const updateLectureByBody = (
  lecture: LectureMock,
  body: UpdateLectureRequestBody,
): LectureMock => {
  return {
    ...lecture,
    stream: body.stream_id !== undefined ? getStreamById(body.stream_id) : lecture.stream,
    teacher:
      body.teacher_id !== undefined ? getTeacherById(body.teacher_id) : lecture.teacher,
    tracks: body.tracks ?? lecture.tracks,
    title: body.title ?? lecture.title,
    description: body.description ?? lecture.description,
    start_time: body.start_time ?? lecture.start_time,
    end_time: body.end_time ?? lecture.end_time,
    kontur_talk_url: body.kontur_talk_url ?? lecture.kontur_talk_url,
    materials:
      body.materials !== undefined
        ? mapMaterialsToMock(body.materials)
        : lecture.materials,
  };
};

const createHomeworkFromBody = (body: HomeworkRequestBody): HomeworkMock => {
  return {
    id: nextHomeworkId++,
    stream_id: body.stream_id,
    tracks: body.tracks,
    title: body.title,
    description: body.description ?? "",
    soft_deadline: body.soft_deadline,
    hard_deadline: body.hard_deadline,
  };
};

const updateHomeworkByBody = (
  homework: HomeworkMock,
  body: UpdateHomeworkRequestBody,
): HomeworkMock => {
  return {
    ...homework,
    stream_id: body.stream_id ?? homework.stream_id,
    tracks: body.tracks ?? homework.tracks,
    title: body.title ?? homework.title,
    description:
      body.description !== undefined ? (body.description ?? "") : homework.description,
    soft_deadline: body.soft_deadline ?? homework.soft_deadline,
    hard_deadline: body.hard_deadline ?? homework.hard_deadline,
  };
};

const mapUserRoleBindingToResponse = (
  roleBinding: UserRoleBindingMock,
): UserRoleBindingResponse => {
  return {
    role: roleBinding.role,
    track: roleBinding.track,
    position: roleBinding.position,
  };
};

const mapUserToResponse = (user: UserMock): UserResponse => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    roles: user.roles.map(mapUserRoleBindingToResponse),
  };
};

const getPositiveNumberParam = (
  url: URL,
  paramName: string,
  defaultValue: number,
): number => {
  const value = Number(url.searchParams.get(paramName));

  if (!Number.isFinite(value) || value <= 0) {
    return defaultValue;
  }

  return value;
};

const getRoleParam = (url: URL): UserRole | null => {
  const role = url.searchParams.get("role");

  if (role === "STUDENT" || role === "TEACHER" || role === "MENTOR" || role === "ADMIN") {
    return role;
  }

  return null;
};

const getStreamIdParam = (url: URL): number | null => {
  const streamId = Number(url.searchParams.get("stream_id"));

  if (!Number.isFinite(streamId) || streamId <= 0) {
    return null;
  }

  return streamId;
};

const getTrackParam = (url: URL): LectureTrack | null => {
  const track = url.searchParams.get("track");

  if (track === "FRONTEND" || track === "BACKEND" || track === "ANALYTICS") {
    return track;
  }

  return null;
};

const isUserInStream = (user: UserMock, streamId: number): boolean => {
  return user.roles.some((roleBinding) => roleBinding.stream_id === streamId);
};

const getFilteredUsers = (url: URL): UserMock[] => {
  const search = url.searchParams.get("search")?.trim().toLowerCase();
  const role = getRoleParam(url);
  const streamId = getStreamIdParam(url);

  return usersMock
    .filter((user) => {
      return role ? hasUserRole(user, role) : true;
    })
    .filter((user) => {
      return streamId ? isUserInStream(user, streamId) : true;
    })
    .filter((user) => {
      if (!search) {
        return true;
      }

      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();

      return fullName.includes(search);
    });
};

const getFilteredHomeworks = (url: URL): HomeworkMock[] => {
  const streamId = getStreamIdParam(url);
  const track = getTrackParam(url);

  return homeworksMock
    .filter((homework) => {
      return streamId ? homework.stream_id === streamId : true;
    })
    .filter((homework) => {
      return track ? homework.tracks.includes(track) : true;
    });
};

const handleSchedulesRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
): Promise<void> => {
  if (req.method !== "GET") {
    sendMethodNotAllowed(res);

    return;
  }

  if (url.pathname === "/api/schedules") {
    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");
    const track = url.searchParams.get("track");

    if (!startDate || !endDate) {
      sendJson(res, 400, {
        code: "VALIDATION_FAILED",
        fields: {
          start_date: "REQUIRED_FIELD",
          end_date: "REQUIRED_FIELD",
        },
      });

      return;
    }

    if (startDate > endDate) {
      sendJson(res, 400, {
        code: "VALIDATION_FAILED",
        fields: {
          end_date: "END_DATE_BEFORE_START_DATE",
        },
      });

      return;
    }

    const schedule = getDatesInRange(startDate, endDate).map((date) =>
      getScheduleByDate(date, track),
    );

    sendJson(res, 200, schedule);

    return;
  }

  if (url.pathname === "/api/schedules/day") {
    const date = url.searchParams.get("date");
    const track = url.searchParams.get("track");

    if (!date) {
      sendJson(res, 400, {
        code: "VALIDATION_FAILED",
        fields: {
          date: "REQUIRED_FIELD",
        },
      });

      return;
    }

    await delay(500);
    sendJson(res, 200, getScheduleByDate(date, track));

    return;
  }

  sendJson(res, 404, {
    code: "RESOURCE_NOT_FOUND",
  });
};

const handleLecturesRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
): Promise<void> => {
  if (url.pathname === "/api/lectures") {
    if (req.method !== "POST") {
      sendMethodNotAllowed(res);

      return;
    }

    const body = await readJsonBody<LectureRequestBody>(req);

    if (!body) {
      sendJson(res, 400, {
        code: "VALIDATION_FAILED",
      });

      return;
    }

    const lecture = createLectureFromBody(body);

    lecturesMock = [...lecturesMock, lecture];

    await delay(500);
    sendJson(res, 201, lecture);

    return;
  }

  const lectureId = getLectureIdFromPath(url.pathname);

  if (lectureId === null) {
    sendJson(res, 404, {
      code: "RESOURCE_NOT_FOUND",
    });

    return;
  }

  const lecture = lecturesMock.find((item) => item.id === lectureId);

  if (!lecture) {
    sendJson(res, 404, {
      code: "RESOURCE_NOT_FOUND",
    });

    return;
  }

  if (req.method === "GET") {
    await delay(500);
    sendJson(res, 200, lecture);

    return;
  }

  if (req.method === "PATCH") {
    const body = await readJsonBody<UpdateLectureRequestBody>(req);

    if (!body) {
      sendJson(res, 400, {
        code: "VALIDATION_FAILED",
      });

      return;
    }

    const updatedLecture = updateLectureByBody(lecture, body);

    lecturesMock = lecturesMock.map((item) =>
      item.id === lectureId ? updatedLecture : item,
    );

    await delay(500);
    sendJson(res, 200, updatedLecture);

    return;
  }

  if (req.method === "DELETE") {
    lecturesMock = lecturesMock.filter((item) => item.id !== lectureId);

    await delay(500);
    sendNoContent(res);

    return;
  }

  sendMethodNotAllowed(res);
};

const handleHomeworksRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
): Promise<void> => {
  if (url.pathname === "/api/homeworks") {
    if (req.method === "GET") {
      await delay(500);
      sendJson(res, 200, getFilteredHomeworks(url));

      return;
    }

    if (req.method === "POST") {
      const body = await readJsonBody<HomeworkRequestBody>(req);

      if (!body) {
        sendJson(res, 400, {
          code: "VALIDATION_FAILED",
        });

        return;
      }

      const homework = createHomeworkFromBody(body);

      homeworksMock = [...homeworksMock, homework];

      await delay(500);
      sendJson(res, 201, homework);

      return;
    }

    sendMethodNotAllowed(res);

    return;
  }

  const homeworkId = getHomeworkIdFromPath(url.pathname);

  if (homeworkId === null) {
    sendJson(res, 404, {
      code: "RESOURCE_NOT_FOUND",
    });

    return;
  }

  const homework = homeworksMock.find((item) => item.id === homeworkId);

  if (!homework) {
    sendJson(res, 404, {
      code: "RESOURCE_NOT_FOUND",
    });

    return;
  }

  if (req.method === "GET") {
    await delay(500);
    sendJson(res, 200, homework);

    return;
  }

  if (req.method === "PATCH") {
    const body = await readJsonBody<UpdateHomeworkRequestBody>(req);

    if (!body) {
      sendJson(res, 400, {
        code: "VALIDATION_FAILED",
      });

      return;
    }

    const updatedHomework = updateHomeworkByBody(homework, body);

    homeworksMock = homeworksMock.map((item) =>
      item.id === homeworkId ? updatedHomework : item,
    );

    await delay(500);
    sendJson(res, 200, updatedHomework);

    return;
  }

  if (req.method === "DELETE") {
    homeworksMock = homeworksMock.filter((item) => item.id !== homeworkId);

    await delay(500);
    sendNoContent(res);

    return;
  }

  sendMethodNotAllowed(res);
};

const handleUsersRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
): Promise<void> => {
  if (url.pathname !== "/api/users") {
    sendJson(res, 404, {
      code: "RESOURCE_NOT_FOUND",
    });

    return;
  }

  if (req.method !== "GET") {
    sendMethodNotAllowed(res);

    return;
  }

  const page = getPositiveNumberParam(url, "page", 1);
  const limit = getPositiveNumberParam(url, "limit", 20);

  const filteredUsers = getFilteredUsers(url);
  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  const response: GetUsersResponse = {
    items: paginatedUsers.map(mapUserToResponse),
    total: filteredUsers.length,
    page,
    limit,
  };

  await delay(500);
  sendJson(res, 200, response);
};

const mockApiPlugin = (): Plugin => ({
  name: "mock-api",

  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url ?? "", "http://localhost");

      if (url.pathname.startsWith("/api/schedules")) {
        await handleSchedulesRequest(req, res, url);

        return;
      }

      if (url.pathname.startsWith("/api/lectures")) {
        await handleLecturesRequest(req, res, url);

        return;
      }

      if (url.pathname.startsWith("/api/homeworks")) {
        await handleHomeworksRequest(req, res, url);

        return;
      }

      if (url.pathname.startsWith("/api/users")) {
        await handleUsersRequest(req, res, url);

        return;
      }

      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), mockApiPlugin()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
