import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CustomerService} from '../customer.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  myFile: File;
  errorMessage = '';
  uploadFile(): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.customerService.postCustomerFormData(fileReader.result)
        .subscribe(results => {
          console.log(results.toString());
          results.forEach(item => {
            if (item === 1062) {
              this.errorMessage = 'Duplicate customer in txt file!';
            } else if ( item === 3 ) {
              this.errorMessage = 'Fields have incorrect format. Please seperate 7 fields between commas!';
            } else if ( item === 4 ) {
              this.errorMessage = 'Email address has incorrect format!';
            } else if ( item === 5 ) {
              this.errorMessage = 'A customer has a invalid state property. Please provide state with 2 character state codes!';
            } else {
            }
          });
        });
    };
    fileReader.readAsText(this.myFile);
  }
  onChange(event) {
    const fileName = event.srcElement.files[0].name;
    const extention = fileName.substring(fileName.length - 3, fileName.length);
    if ( extention === 'txt') {
      this.errorMessage = '';
      this.myFile = event.srcElement.files[0];
    } else {
      this.errorMessage = 'File not a text file. Please upload a text file instead!';
      this.myFile = null;
    }
  }
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

}
