declare var Auth0Lock;

export class AuthUser {
    getUser(token: string) {
        
        var lock = new Auth0Lock('RRjfqTxQZUIpy7aCRDMscCFOsVDEdbwT', 'lufer.eu.auth0.com');
        
        lock.getProfile(token, function(err, profile) {
                    
            if (err) {
                console.log('Cannot get user :(', err);
                return;
            }

            console.log("Hey dude", profile);
        });
    }
}

export class AuthUserNode {
    getUser(token: string) {
        
        return {};
    }
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
