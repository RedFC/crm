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
exports.MailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const qrcode_1 = __importDefault(require("qrcode"));
const user_service_1 = require("../services/user.service");
class MailSender {
    constructor(user) {
        this.user = user;
        this.transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    sendUserInvitationEmail(invitationGoogleAuth, credentials, token) {
        return __awaiter(this, void 0, void 0, function* () {
            qrcode_1.default.toDataURL(invitationGoogleAuth.otpauth_url, (err, src) => {
                if (err) {
                    console.log(err);
                }
                var mailOptions = {
                    to: this.user.email,
                    from: process.env.NODEMAILER_USER,
                    subject: "Email Invitation",
                    text: `You are receiving this because you have invited to join fluent team.\n Credentials For Your Accounts Are:\n EMAIL: ${credentials.email}\n PASSWORD Reset Link: http://localhost:4000/api/users/reset/${token} \n Download Google Auth App and create a app with name fluent and these are the credentials for Auth App. \n\n Google Auth App Creds: \n Scan This QR CODE: \n`,
                    attachments: [
                        {
                            filename: "Qr.png",
                            contentType: 'image/jpeg',
                            content: Buffer.from(src.split("base64,")[1], "base64")
                        }
                    ]
                };
                return new Promise((resolve, reject) => {
                    try {
                        this.transporter.sendMail(mailOptions, (err, info) => __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject({ msg: err, status: 502, success: false });
                                return;
                            }
                            else if (info) {
                                const myUserService = new user_service_1.UserService();
                                myUserService.redisSetUserResetKey(token);
                                myUserService.redisSetUserAuthKey(invitationGoogleAuth, this.user.id);
                                console.log(info);
                            }
                        }));
                    }
                    catch (e) {
                        reject({ success: false, msg: e.message, status: 500 });
                        return;
                    }
                });
            });
        });
    }
    sendUserForgetPasswordEmail(invitationGoogleAuth, token) {
        return __awaiter(this, void 0, void 0, function* () {
            qrcode_1.default.toDataURL(invitationGoogleAuth.otpauth_url, (err, src) => {
                if (err) {
                    console.log(err);
                }
                var mailOptions = {
                    to: this.user.email,
                    from: process.env.NODEMAILER_USER,
                    subject: "Password Reset",
                    text: `password Reset Link: http://localhost:4000/api/users/reset/${token} \n  
          Your New OTP QR-CODE has Been Updated Which Is Attached Below Update Your Authenticator As Well ! \n
          Download Google Authenticator App \n\n 
          for Android : https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US \n
          for IOS : https://apps.apple.com/us/app/google-authenticator/id388497605
          Google Auth App Creds: \n
          Scan This QR CODE: \n`,
                    attachments: [
                        {
                            filename: "Qr.png",
                            contentType: 'image/jpeg',
                            content: Buffer.from(src.split("base64,")[1], "base64")
                        }
                    ]
                };
                return new Promise((resolve, reject) => {
                    try {
                        this.transporter.sendMail(mailOptions, (err, info) => __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject({ msg: err, status: 502, success: false });
                                return;
                            }
                            else if (info) {
                                const myUserService = new user_service_1.UserService();
                                myUserService.redisSetUserResetKey(token);
                                myUserService.redisSetUserAuthKey(invitationGoogleAuth, this.user.id);
                                console.log(info);
                            }
                        }));
                    }
                    catch (e) {
                        reject({ success: false, msg: e.message, status: 500 });
                        return;
                    }
                });
            });
        });
    }
}
exports.MailSender = MailSender;
//# sourceMappingURL=index.js.map