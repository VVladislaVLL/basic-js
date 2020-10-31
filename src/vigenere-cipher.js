const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  	#type = true;

  	constructor(flag) {
  	  	if (flag === undefined || flag === true) {
  	  	  this.type = true;
  	  	}
  	  	else {
  	  	  this.type = false;
  	  	}
  	}

  	encrypt(message, key) {
    	if(message === undefined || key === undefined) {
			throw new UserException("Should be 2 parameters");
		}

		let result = this._doCrypt(false, message, key);
		return (this.type) ? result : result.split('').reverse().join('');
  	} 
  
  
  	decrypt(encryptedMessage, key) {
		if(encryptedMessage === undefined || key === undefined) {
			throw new UserException("Should be 2 parameters");
		}

		let result = this._doCrypt(true, encryptedMessage, key);
		return (this.type) ? result : result.split('').reverse().join('');
  	}

	_doCrypt(isDecrypt, text, keyString) {
		let key = this._filterKey(keyString);

		if (isDecrypt) {
			key = key.map(element => (26 - element) % 26 );
		}
		return this._crypt(text, key);
	}

	_crypt(input, key) {
		let output = "";
		for (let i = 0, j = 0; i < input.length; i++) {
			let letter = input.charCodeAt(i);
			if (this._isUppercase(letter)) {
				output += String.fromCharCode((letter - 65 + key[j % key.length]) % 26 + 65);
				j++;
			} else if (this._isLowercase(letter)) {
				output += String.fromCharCode((letter - 97 + key[j % key.length]) % 26 + 97);
				j++;
			} else {
				output += input.charAt(i);
			}
		}
		return output.toUpperCase();
	}

	_filterKey(key) {
		let result = [];
		for (let i = 0; i < key.length; i++) {
			let letter = key.charCodeAt(i);
			if (this._isLetter(letter)) {
				result.push((letter - 65) % 32);
			}
		}
		return result;
	}

	_isLetter(letter) {
		return this._isUppercase(letter) || this._isLowercase(letter);
	}

	_isUppercase(letter) {
		return 65 <= letter && letter <= 90;
	}

	_isLowercase(letter) {
		return 97 <= letter && letter <= 122;
	}
}

module.exports = VigenereCipheringMachine;
