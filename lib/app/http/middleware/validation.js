"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const validate_1 = require("../controller/validate");
const user_service_1 = require("../services/user.service");
class ValidationMiddleware extends validate_1.Validator {
    constructor() {
        super();
    }
    validateUserRegistration() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateRegisterData(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateUserVerify() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateVerifyData(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateUserLogin() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateLoginData(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateUserUpdate() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateUserUpdateData(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateBlockRequest() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            let TokenId = req.user.id;
            let paramsId = req.params.id;
            if (TokenId == paramsId) {
                return res.status(409).send({ success: false, msg: "Not Allowed To Perform This Action" });
            }
            else {
                next();
            }
        }));
    }
    validateIncomingFile() {
        return ((0, composable_middleware_1.default)().use((req, res, next) => {
            if (!req.file) {
                return res.send({
                    success: false,
                    msg: "File Is Required To Perform This Action"
                });
            }
            else {
                next();
            }
        }));
    }
    validateRegisterUser() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let Service = new user_service_1.UserService();
            let Search = yield Service.findOne({ OR: [
                    {
                        email: req.body.email
                    },
                    {
                        profile: {
                            phoneNo: req.body.phoneNumber
                        }
                    }
                ] });
            if (Search) {
                if (Search.email == req.body.email) {
                    console.log("Existing Email Found");
                    var errors = {
                        success: false,
                        msg: "User With Email Provided Already Exists",
                    };
                    res.status(400).send(errors);
                    return;
                }
                else if (Search.profile.phoneNo == req.body.phoneNumber) {
                    console.log("Existing Phone Number Found");
                    var errors = {
                        success: false,
                        msg: "User With PhoneNumber Provided Already Exists",
                    };
                    res.status(400).send(errors);
                    return;
                }
            }
            else {
                next();
            }
        }))
            .use((req, res, next) => {
            super.validateRegisterUserJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                console.log(error);
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateRegisterUpdateUser() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateRegisterUserUpdateJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                console.log(error);
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateUpdatePermission() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.ValidateUpdatePermissionJoi(req.body)
                .then(data => {
                next();
            })
                .catch(error => {
                console.log(error);
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        })
            .use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let Service = new user_service_1.UserService();
            let Search = yield Service.findOne({ id: req.body.user });
            if (Search) {
                next();
            }
            else {
                console.log("User not Found");
                var errors = {
                    success: false,
                    msg: "User not Found"
                };
                res.status(400).send(errors);
                return;
            }
        })));
    }
    validateBookAssign() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateBookAssignJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateBookAssignupdate() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateBookAssignupdateJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateCreateYearsAndClasses() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateCreateYearsAndClassesJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateUpdateOnBoarding() {
        return ((0, composable_middleware_1.default)()
            .use((req, res, next) => {
            super.validateUpdateOnBoardingJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map