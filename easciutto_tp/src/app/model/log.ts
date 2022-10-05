/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
export class Log{
  private _logRiegoId: number;
  private _fecha: Date;
  private _apertura: boolean;
  private _electrovalvulaId: number;


constructor(logRiegoId: number, fecha: Date, apertura: boolean, electrovalvulaId: number) {
  this._apertura = apertura;
  this._electrovalvulaId = electrovalvulaId;
  this._fecha = fecha;
  this._logRiegoId = logRiegoId;

  }

  public get apertura(): boolean {
    return this._apertura;
  }

  public set apertura(value: boolean) {
    this._apertura = value;
  }

  public get electrovalvulaId(): number {
    return this._electrovalvulaId;
  }

  public set electrovalvulaId(value: number) {
    this._electrovalvulaId = value;
  }

  public get fecha(): Date {
    return this._fecha;
  }

  public set fecha(value: Date) {
    this._fecha = value;
  }

  public get logRiegoId(): number {
    return this._logRiegoId;
  }

  public set logRiegoId(value: number) {
    this._logRiegoId = value;
  }
}
