export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  homeAddress: string;
  city: string;
  state: string;
  zipCode: string;
  public clear(): void {
    this.firstName = '';
    this.lastName = '';
    this.emailAddress = '';
    this.homeAddress = '';
    this.city = '';
    this.state = '';
    this.zipCode = '';
  }
  public setState(value: string): void {
    this.state = value;
  }
  public getString(): string {
    let myString = '';
    myString += 'First Name: ' + this.firstName + '\n';
    myString += 'Last Name: ' + this.lastName + '\n';
    myString += 'Email Address: ' + this.emailAddress + '\n';
    myString += 'Home Address: ' + this.homeAddress + '\n';
    myString += 'City: ' + this.city + '\n';
    myString += 'State: ' + this.state + '\n';
    myString += 'Zip Code: ' + this.zipCode + '\n';
    console.log(myString);
    return myString;
  }
}
