class User {
  private userId: number;
  private avatar: string;
  private firstName: string;
  private lastName: string;
  private userName: string;
  private passwd: string;
  private gender: string;
  private email: string;
  private phoneNumber: string;
  private buyingAddress: string;
  private shippingAddress: string;

  constructor(
    userId: number,
    avatar: string,
    firstName: string,
    lastName: string,
    userName: string,
    passwd: string,
    gender: string,
    email: string,
    phoneNumber: string,
    buyingAddress: string,
    shippingAddress: string
  ) {
    this.userId = userId;
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passwd = passwd;
    this.gender = gender;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.buyingAddress = buyingAddress;
    this.shippingAddress = shippingAddress;
  }

  // Getters
  public getUserId(): number {
    return this.userId;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getUserName(): string {
    return this.userName;
  }

  public getPasswd(): string {
    return this.passwd;
  }

  public getGender(): string {
    return this.gender;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getBuyingAddress(): string {
    return this.buyingAddress;
  }

  public getShippingAddress(): string {
    return this.shippingAddress;
  }

  // Setters
  public setUserId(userId: number): void {
    this.userId = userId;
  }

  public setAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setUserName(userName: string): void {
    this.userName = userName;
  }

  public setPasswd(passwd: string): void {
    this.passwd = passwd;
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }

  public setBuyingAddress(buyingAddress: string): void {
    this.buyingAddress = buyingAddress;
  }

  public setShippingAddress(shippingAddress: string): void {
    this.shippingAddress = shippingAddress;
  }
}

export default User;
