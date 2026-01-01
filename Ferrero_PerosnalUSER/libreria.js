"use strict";


class Ajax {
	
 // Properties, omettere let/const/ecc.
 _URL = "https://randomuser.me"
 
 // Methods, anche per i metodi ometto il function
 // method = GET/POST - url = risorsa da richiedere al server (ES: /api) - parameters = contiene i paramteri della richiesta scritti in JSON
 // in caso di chiamata GET, sarà sendRequest a convertitre questi parametri in un url-econded e accodarli alla URL
 sendRequest(method, url, parameters={}) {
	let options={
		"baseURL":this._URL, // Indirizzo del server
		"url":  url, // risorsa da richiedere 
		"method": method.toUpperCase(), // il metodo della richiesta
		"headers": {"Accept": "application/json"}, // Consigliata
		"responseType": "json", // Il formato della risposta 
		"timeout": 5000, // tempo massimo di attesa
	}

	if(method.toUpperCase() == "GET"){
		// Content type dell'URL encoded, in caso di chiamate GET
		options.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
		// Prende i paramters, li converte in URL encoded e li accoda alla URL
		options.params = parameters
	}
	else{
		// Nel caso di chimate diverse da GET, come POST, parametri saranno passati in JSON
		options.headers["Content-Type"] = "application/json;charset=utf-8"
		options.data = parameters // Scrive i parametri nel body della http request
	}

	let promise = axios(options) // restituisce una promise 
	return promise
 }

 errore(err) {
	if(!err.response) 
		alert("Connection Refused or Server timeout");	
	else if (err.response.status == 200) // Con il n 200 si intende che non ci sono stati errori lato server, però il risultato è stato restituito come JSON non valido, per cui sul client va errore il parsing. 
        alert("Formato dei dati non corretto : " + err.response.data);
    else 
        alert("Server Error: " +err.response.status + " - " +err.response.data)
 }

}

let ajax = new Ajax()
