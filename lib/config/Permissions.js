"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPermission = exports.TeamAdminPermission = exports.AdminPermission = void 0;
exports.AdminPermission = {
    INVITE: true,
    REMOVE: true,
    VIEW: true,
    PASSWORD_RESET: true,
    ADD: true,
    UPLOAD: false,
    SWAP_ADMIN: false
};
exports.TeamAdminPermission = {
    INVITE: true,
    REMOVE: true,
    VIEW: true,
    PASSWORD_RESET: true,
    ADD: true,
    UPLOAD: true,
    SWAP_ADMIN: true
};
exports.MemberPermission = {
    INVITE: false,
    REMOVE: false,
    VIEW: false,
    PASSWORD_RESET: true,
    ADD: false,
    UPLOAD: true,
    SWAP_ADMIN: false
};
//# sourceMappingURL=Permissions.js.map