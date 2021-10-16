"use strict";
import * as defaults from "../../../config/default.json";
import { IUser } from "../models/user.model";
import nodemailer from "nodemailer";
import config from "config";
import QRCode from 'qrcode'
import { rejects } from "assert/strict";
import { UserService } from "../services/user.service";
export class MailSender {
  user: IUser;
  token: String;
  transporter: any;

  constructor();
  constructor(user: IUser);
  constructor(user: IUser, token?: String);
  constructor(user?: IUser){
    this.user = user;
    this.transporter = nodemailer.createTransport({
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

  async sendUserInvitationEmail(invitationGoogleAuth,credentials,token): Promise<any> {
      QRCode.toDataURL(invitationGoogleAuth.otpauth_url, (err, src) => {
        if (err) {
          console.log(err);
        }
        var mailOptions = {
          to: this.user.email,
          from: process.env.NODEMAILER_USER,
          subject: "Email Invitation",
          text:`You are receiving this because you have invited to join fluent team.\n Credentials For Your Accounts Are:\n EMAIL: ${credentials.email}\n PASSWORD Reset Link: http://localhost:4000/api/users/reset/${token} \n Download Google Auth App and create a app with name fluent and these are the credentials for Auth App. \n\n Google Auth App Creds: \n Scan This QR CODE: \n`,
          attachments: [
              {
              filename: "Qr.png",
              contentType:  'image/jpeg',
              content: Buffer.from(src.split("base64,")[1], "base64")
              }
            ]
        };
        return new Promise((resolve, reject) => {
          try {
            this.transporter.sendMail(mailOptions, async (err, info) => {
              if (err) {
                reject({ msg: err, status: 502, success: false });
                return;
              } else if (info) {
                const myUserService = new UserService();
                myUserService.redisSetUserResetKey(token);
                myUserService.redisSetUserAuthKey(invitationGoogleAuth,this.user.id)
                console.log(info);
              }
            });
          } catch (e) {
            reject({ success: false, msg: e.message, status: 500 });
            return;
          }
        });
    });
  }
  

  async sendUserForgetPasswordEmail(invitationGoogleAuth,token): Promise<any> {
      QRCode.toDataURL(invitationGoogleAuth.otpauth_url, (err, src) => {
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
              contentType:  'image/jpeg',
              content: Buffer.from(src.split("base64,")[1], "base64")
              }
            ]
        };
        return new Promise((resolve, reject) => {
          try {
            this.transporter.sendMail(mailOptions, async (err, info) => {
              if (err) {
                reject({ msg: err, status: 502, success: false });
                return;
              } else if (info) {
                const myUserService = new UserService();
                myUserService.redisSetUserResetKey(token);
                myUserService.redisSetUserAuthKey(invitationGoogleAuth,this.user.id)
                console.log(info);
              }
            });
          } catch (e) {
            reject({ success: false, msg: e.message, status: 500 });
            return;
          }
        });
    });
    }


  }

