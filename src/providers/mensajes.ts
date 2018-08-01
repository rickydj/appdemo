import { Injectable } from '@angular/core';
import { AlertController, ToastController, ModalController } from 'ionic-angular';


/*
  Generated class for the MensajesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensajesProvider {

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private modal: ModalController) {
    console.log('Hello MensajesProvider Provider');
  }

  verAlerta(titulo, mensaje, botones) {
    let alert = this.alert.create({
      title: titulo,
      subTitle: mensaje,
      buttons: botones
    });
    alert.present();

  }

  verToast(mensaje, duracion = 3000, posicion = 'bottom') {
    let toast = this.toast.create({
      message: mensaje,
      duration: duracion,
      position: posicion
    });
    toast.present();
  }

  verConfirm(titulo, mensaje, textoOK, handlerOK, textoCancel, handlerCancel) {
    const confirm = this.alert.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: textoOK,
          handler: handlerOK
        },
        {
          text: textoCancel,
          handler: handlerCancel
        }
      ]
    });
    confirm.present();
  }

  verPrompt(titulo, mensaje, campo, textOK, handlerOK, textCancel, handlerCancel) {
    const prompt = this.alert.create({
      title: titulo,
      message: mensaje,
      inputs: [
        {
          name: campo,
          placeholder: campo
        },
      ],
      buttons: [
        {
          text: textOK,
          handler: handlerOK
        },
        {
          text: textCancel,
          handler: handlerCancel
        }
      ]
    });
    prompt.present();
  }


}
