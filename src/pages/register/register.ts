import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MensajesProvider } from '../../providers/mensajes'
import { DatosProvider } from '../../providers/datos'
import { LoginPage } from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usuario = '';
  password = '';
  passconf = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mens: MensajesProvider,
    private datos: DatosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register() {
    this.registerUser().then(() => {
      this.mens.verToast('usuario registrado, puede acceder');
      this.navCtrl.push(LoginPage);
    }).catch((err) => {
      console.log(err);
    })
  }

  checkCampos() {
    if (this.usuario === '' && this.password === '' && this.passconf === '') {
      this.mens.verAlerta('Campos incompletos', 'Es necesario que diligencie todos los campos para registrar el usuario', ['OK']);
      return false;
    }
    return true;
  }

  checkPasswords() {
    if (this.checkCampos()) {
      if (this.password !== this.passconf) {
        this.mens.verAlerta('Contraseña errada', 'La contraseña y su confirmacion no coinciden', ['OK']);
        return false;
      }
      return true;
    }
  }

  registerUser() {
    let prom = new Promise((resolve, reject) => {
      if (this.checkPasswords()) {
        this.datos.guardarUsuario(this.usuario, this.password).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      }
      else{
        reject();
      }
    });
    return prom;
  }

}
