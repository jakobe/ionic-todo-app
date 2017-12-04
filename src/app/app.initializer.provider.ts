import { ToastController } from 'ionic-angular';

export function registerServiceWorkerAndCheckForUpdate(toastCtrl: ToastController) {
    function presentUpdateAvailable() {
      let toast = toastCtrl.create({
        message: 'New version available, drag down to refresh ↓',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    }
  
    function registerServiceWorker() {
      navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        //console.log('service worker registered', reg);
      })
      .catch(err => console.log('service worker error', err));
    }
  
  
    return () => {
        if ('serviceWorker' in navigator) {
            //console.log("APP_INITIALIZER...");
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                //console.log("SW controller changed - display new version available"); 
                presentUpdateAvailable();
            });
            //Postpone first registration until first load has settled:
            window.addEventListener('load', () => {
                //console.log("window.onLoad: Register SW...");
                registerServiceWorker();
            });
        }
    };
}