import { Injectable, Directive } from '@angular/core';

'use strict';

export var token = '';

export function setToken(val) {
  token = val;
}

export function getToken() {
	
	return token;
}