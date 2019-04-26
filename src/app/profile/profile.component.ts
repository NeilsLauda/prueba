import { AuthenticationService } from './../services/authentication.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { ImageCroppedEvent } from 'ngx-image-cropper';


import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  pictures: any;
  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      });
    });
  }
  ngOnInit() {
  }
  saveSettings() {
    if (this.croppedImage) {
      const currentPicturedId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPicturedId +
        '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.pictures = this.firebaseStorage.ref('pictures/' + currentPicturedId +
          '.jpg').getDownloadURL();
        this.pictures.subscribe((p) => {
          this.userService.setAvatar(p, this.user.uid).then(() => {
            alert('IMAGEN SUBIDO');
          }).catch((err) => {
            console.log(err);
          });
        });
      }).catch((error) => {
        console.log(error);
      });

    } else {
      this.userService.editUser(this.user).then((data) => {
        alert('Cambios Guardados');
      }).catch((error) => {
        console.log(error);
      });
    }
  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
