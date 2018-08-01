import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatosProvider {

  constructor(public storage: Storage) {
  }

  buscarUsuario(usuario, password) {
    let prom = new Promise((resolve, reject) => {
      this.storage.get(usuario).then((pass) => {
        if (pass !== null) {
          if (pass === password) {
            resolve();
          }
          else {
            reject("La contraseña digitada no coincide");
          }
        }
        else {
          reject("Usuario no registrado")
        }
      }).catch(() => {
        reject("El usuario no existe");
      })
    });
    return prom;
  }


  guardarUsuario(usuario, password) {
    let prom = new Promise((resolve, reject) => {
      this.storage.set(usuario, password).then((info) => {
        console.log("=>"+info);
        if (info !== null) {
          resolve();
        }
        else {
          reject("No se pudo registrar el usuario")
        }
      }).catch(() => {
        reject("No se pudo registrar el usuario");
      })
    });
    return prom;
  }

}
