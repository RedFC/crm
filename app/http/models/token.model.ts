"use strict";

import { IUser } from "./user.model";

export interface IToken {
    userId :IUser['id']
    token : String
}