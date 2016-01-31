export class AuthUser {
    name: string;
}

export class CookieThing {

    constructor(private cookies: any) {
        
    }
    
    existsCookie(key: string): boolean {
        
        var cook = this.cookies[key];
        if (cook) {
            
            return true;
        }
        
        return false;
    }
}

export function cookieTokenNotExpired() {

    return true;
    /*
  var authToken:string = tokenName || 'id_token';
  var token:string;

  if(jwt) {
    token = jwt;
  }
  else {
    token = localStorage.getItem(authToken);
  }

  var jwtHelper = new JwtHelper();
  
  if(!token || jwtHelper.isTokenExpired(token, null)) {
    return false;
  }

  else {
    return true;
  }
  */
}
