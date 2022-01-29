export interface CallBack<Return, Props extends Array<any> = [[]]> {
  (...args: Props): Return;
}
// export type CallBack<Return, Props = unknown> = (...args: Props[]) => Return;
