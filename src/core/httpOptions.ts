import {HttpHeaders} from '@angular/common/http';
 
export class HttpOptionsClass {
  /**
   * @param options : Object
   * @return HttpHeaders
   * @Description : added token
   */
  getHttpOptions(options: any = {token: true}) {
    let header: HttpHeaders = new HttpHeaders();
    if (options.token) {
      header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }
    return {
      headers: header
    };
  }
}