import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatosProvider } from "../../providers/datos"
import { MensajesProvider } from "../../providers/mensajes"
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = "";
  password = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mens: MensajesProvider,
    private datos: DatosProvider) {
  }

  ionViewDidLoad() {
  }


  login() {
    console.log("Login");
    this.usuarioValido().then(() => {
      this.navCtrl.push(HomePage);
    }).catch((err) => { console.log(err) });
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }

  remember() {
    let titulo = "Recuperar contraseña";
    let mensaje = "Escriba el correo que registro al momento de crear su cuenta para enviarle un vinculo para recuparar su contraseña";
    let campo = 'email'
    let btnOK = "Recuperar";
    let mtdOK = data => {
      console.log(data);
      this.mens.verAlerta("Enviado", "Se envio un correo con las instrucciones de recuperacion al correo " + data.email, ["OK"]);
    };
    let btnCancel = "Salir";
    let mtdCancel = () => {
      console.log("Cancelado")
    };
    this.mens.verPrompt(titulo, mensaje, campo, btnOK, mtdOK, btnCancel, mtdCancel);
  }

  evalCampos() {
    if (this.usuario === "" || this.password === "") {
      this.mens.verAlerta("Informacion vacia", "Es necesario que diligencie usuario y contraseña", ["Listo"]);
      return false;
    }
    return true;
  }

  usuarioValido() {
    let prom = new Promise((resolve, reject) => {
      if (this.evalCampos()) {

        console.log("Aqui");
        this.datos.buscarUsuario(this.usuario, this.password).then(() => {
          resolve();
        }).catch((err) => {
          this.mens.verAlerta("Error", err, ["OK"]);
          reject();
        });
      }
      else {
        reject();
      }
    });
    console.log("Pase!");
    return prom;
  }

}
