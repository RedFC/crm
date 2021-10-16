import compose from "composable-middleware"
import { Validator } from "../controller/validate";
import { UserService } from "../services/user.service";

export class ValidationMiddleware extends Validator {
    constructor() {
        super();
    }
    validateUserRegistration() {
        return (
            compose()
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
                })
        )
    }
    validateUserVerify() {
        return (
            compose()
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
                })
        )
    }
    validateUserLogin() {
        return (
            compose()
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
                        })
                })
        )
    }


    validateUserUpdate() {
        return (
            compose()
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
                        })
                })
        )
    }


   

    validateBlockRequest() {
        return (
            compose()
                .use((req, res, next) => {
                    
                let TokenId = req.user.id;
                let paramsId = req.params.id;
                
                if (TokenId == paramsId){
                    return res.status(409).send({ success: false, msg: "Not Allowed To Perform This Action" });
                } else {
                    next();
                }
            })
        )
    }

    

    validateIncomingFile() {
        return (
            compose().use((req,res,next) => {

                if (!req.file) {
                    return res.send({
                        success: false,
                        msg: "File Is Required To Perform This Action"
                    })
                } else {
                    next();
                }
    
            })
        )
    }

    validateRegisterUser() {
        return (
            compose()
            .use(async (req,res,next) => {
                let Service = new UserService();
                let Search = await Service.findOne({OR: [
                    {
                      email:req.body.email
                    },
                    {
                        profile : {
                            phoneNo : req.body.phoneNumber
                        }
                    }
                  ]});
                if(Search){
                    if(Search.email == req.body.email){
                        console.log("Existing Email Found")
                        var errors = {
                            success: false,
                            msg: "User With Email Provided Already Exists",
                        };
                        res.status(400).send(errors);
                        return;
                    }else if(Search.profile.phoneNo == req.body.phoneNumber){
                        console.log("Existing Phone Number Found")
                        var errors = {
                            success: false,
                            msg: "User With PhoneNumber Provided Already Exists",
                        };
                        res.status(400).send(errors);
                        return;
                    }
                        
                }else{
                    next();
                }
            })
            .use((req,res,next) => {
                super.validateRegisterUserJoi(req.body)
                    .then(data => {
                        next();
                    }).catch(error => {
                        console.log(error)
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return;
                    })
            })
        )
    }


    validateRegisterUpdateUser() {
        return (
            compose()
            .use((req,res,next) => {
                super.validateRegisterUserUpdateJoi(req.body)
                    .then(data => {
                        next();
                    }).catch(error => {
                        console.log(error)
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return;
                    })
            })
        )
    }


    validateUpdatePermission(){
        return (
            compose()
            .use((req,res,next) => {
                super.ValidateUpdatePermissionJoi(req.body)
                .then(data => {
                    next();
                })
                .catch(error => {
                    console.log(error)
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return;
                })
            })
            .use(async (req,res,next) => {
                let Service = new UserService();
                let Search = await Service.findOne({id : req.body.user});
                if(Search){
                    next()
                }else{
                    console.log("User not Found")
                        var errors = {
                            success: false,
                            msg: "User not Found"
                        };
                        res.status(400).send(errors);
                        return;
                }
            })
        )
    }

    validateBookAssign() {
        return (
            compose()
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
                        })
                })
        )
    }

    validateBookAssignupdate() {
        return (
            compose()
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
                        })
                })
        )
    }

    validateCreateYearsAndClasses() {
        return (
            compose()
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
                        })
                })
        )
    }

    validateUpdateOnBoarding() {
        return (
            compose()
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
                        })
                })
        )
    }

    
}
