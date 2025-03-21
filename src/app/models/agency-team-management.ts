export class TeamMemberGridDto{
    public UserSystemId! : number;
    public UserFullName! : string;// Full Name
    public UserMail! : string;// Email
    public UserContactNo! : string;// Contact
    public UserCategoryName! : string;// Category
    public UserCategoryId! : string;// Category
    public UserRoleName! : string;// Role
    public UserRoleId! : string;// Role
    public UserName! : string;// Username
    public UserActiveStatus! : number;// Status
}

export class TeamMemberFormDto{
    public UserSystemId! : number;
    public UserUniqueCode! : string;
    public UserFirstName! : string;// First Name
    public UserLastName! : string;// Last Name
    public UserMail! : string;// Email
    public UserContactNo! : string;// Contact
    public UserCategoryId! : number;// Category
    public UserRoleId! : number;// Role
    public UserName! : string;// Username
    public UserPassword! : string;// Password
}