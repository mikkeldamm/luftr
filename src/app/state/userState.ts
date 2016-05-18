export class UserState {
    
    private _userId: string;
    
    set UserId(userId: string) {
        this._userId = userId;
    }
    
    get UserId() {
        return this._userId;
    }
}