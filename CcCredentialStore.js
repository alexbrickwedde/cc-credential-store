"use strict";

class CcCredentialStore {
  constructor() {
    this.isSupported = window.PasswordCredential || window.FederatedCredential && true
  }

  store(username, password) {
    if (!this.isSupported) {
      return Promise.reject();
    }

    const credential = new PasswordCredential({
      id: username,
      password: password,
    });
    return navigator.credentials.store(credential);
  }

  get() {
    if (!this.isSupported) {
      return Promise.reject();
    }

    return navigator.credentials.get(
    {
      password: true,
      mediation: 'optional',
    });    
  }

  manuallyLoggedOut() {
    if (this.isSupported) {
      navigator.credentials.preventSilentAccess();
    }
  }
}
