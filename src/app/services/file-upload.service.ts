import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class FileUploadService {

  constructor(private http: Http, private _tokenService: Angular2TokenService) { }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('image', file, 'file.name');

        let headers = this._tokenService.currentAuthHeaders;
        let options = new RequestOptions({
          headers: headers
         });
        return this.http.put('http://localhost:3000/professors', formData, options)
    }
  }

}
