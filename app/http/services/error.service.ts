'use strict';

export interface ErrorObject {
    success: boolean;
    msg?: string;
    status?: number;
    raw?: any;
    message?: string
}

export interface ResponseObject{
    success: boolean;
    msg?: string;
    status?: number;
    data?:object
}

export class ErrorService {
    public static handler(res: any, status: number, data: ErrorObject) {
        console.error(data)
        return res.status(status).send(data);
    }

    public static response(res: any, status: number, data: ResponseObject) {
        console.error(data)
        return res.status(status).send(data);
    }
}