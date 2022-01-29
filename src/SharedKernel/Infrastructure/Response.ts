export enum StatusType {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface JSendSuccess {
  status: StatusType.SUCCESS;
  data: unknown;
}

export interface JSendError {
  status: StatusType.ERROR;
  message: string;
}

export interface JSendFailure {
  status: StatusType.FAIL;
  data: Record<string, string> | string;
}
