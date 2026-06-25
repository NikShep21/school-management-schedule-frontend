export const commonApiErrorMessages: Record<string, string> = {
  NETWORK_ERROR: "Не удалось подключиться к серверу",
  API_ERROR: "Произошла ошибка",

  INTERNAL_SERVER_ERROR: "На сервере произошла ошибка",
  BAD_GATEWAY: "Сервер временно недоступен",
  SERVICE_UNAVAILABLE: "Сервис временно недоступен",
  GATEWAY_TIMEOUT: "Сервер не ответил вовремя",

  INVALID_CREDENTIALS: "Неверная почта или пароль",
  ACCESS_DENIED: "Отказано в доступе",
  RESOURCE_NOT_FOUND: "Запрошенный ресурс не найден",
  VALIDATION_FAILED: "Проверьте правильность заполнения полей",
};
