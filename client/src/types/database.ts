export interface User {
    id : number,
    username : string
}


export interface Store {
    user : User | null;
    addUser : (user : User ) => void;
    removeUser : () => void;
}


export interface UserData {
    id : number 
    user : User
    image : string | null
}