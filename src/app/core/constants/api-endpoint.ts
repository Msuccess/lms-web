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

// export class ApiEndPoints {
//   API_BASE_URL = environment.baseUrl;
//   API_ORGANIZATIONS = this.API_BASE_URL + '/organizations/';
//   API_VOUCHER = this.API_BASE_URL + '/merch_vouchers/';
//   API_GET_API_KEYS = this.API_BASE_URL + '/organizations/get_api_keys/';
//   API_REVOKE_API_KEY = this.API_BASE_URL + '/organizations/revoke_api_key/';
//   API_SUBSCRIPTION = this.API_BASE_URL + '/subscriptions/transaction/';
//   API_GENERATE_API_KEYS =
//     this.API_BASE_URL + '/organizations/generate_api_key/';
// }
