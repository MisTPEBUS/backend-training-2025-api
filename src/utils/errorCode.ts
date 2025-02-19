export enum responseCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const ErrorMessage = {
  [responseCode.BAD_REQUEST]: '欄位未填寫正確',
  [responseCode.CONFLICT]: '資料重複',
  [responseCode.INTERNAL_SERVER_ERROR]: '伺服器錯誤',
};

export const ErrorStatus = {
  [responseCode.SUCCESS]: 'success',
  [responseCode.BAD_REQUEST]: 'failed',
  [responseCode.CONFLICT]: 'failed',
  [responseCode.INTERNAL_SERVER_ERROR]: 'error',
};
