import { environment } from '../../../environments/environment';
export class AuthEndPoints {
  API_AUTH_BASE = environment.authBaseUrl;
  API_AUTH_LOGIN = this.API_AUTH_BASE + 'login/';
  API_AUTH_REGISTER = this.API_AUTH_BASE + 'register/';
  API_AUTH_LOGOUT = this.API_AUTH_BASE + 'logout/';
  API_AUTH_CHANGE_PASSWORD = this.API_AUTH_BASE + 'password/change/';
  API_AUTH_RESET_PASSWORD = this.API_AUTH_BASE + 'password/reset/';
  API_AUTH_RESET_PASSWORD_CONFIRM =
    this.API_AUTH_BASE + 'password/reset/confirm/';
  API_AUTH_VERIFY_PHONE = environment.baseUrl + '/users/verify_phone/';
  API_AUTH_RESEND_OTP_PHONE = environment.baseUrl + '/users/send_otp/';
}

export class ApiEndPoints {
  API_BASE_URL = environment.baseUrl;
  API_CLASS = this.API_BASE_URL + 'users-class/';
  API_SUBJECT = this.API_BASE_URL + 'subjects/';
  API_TEACHER = this.API_BASE_URL + 'teacher/';
  API_STUDENT = this.API_BASE_URL + 'student/';
  API_DOCUMENT = this.API_BASE_URL + 'document/';
  API_UPLOAD_DOCUMENT = this.API_BASE_URL + 'upload/document/';
  API_COURSE = this.API_BASE_URL + 'course/';
  API_UPLOAD_COURSE = this.API_BASE_URL + 'upload/course/';
}
