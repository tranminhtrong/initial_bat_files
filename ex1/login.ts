interface IPerson{
    fullName:string;
    address:string;
    dob:Date;

}

class User implements IPerson{
    fullName:string;
    address:string;
    dob:Date;

    //Own user class property
    userName: string;
    pwd: string;
}

function printUsers(user: User){
    console.log("Full name: "+ user.fullName);
    console.log("User name: "+ user.userName)
}