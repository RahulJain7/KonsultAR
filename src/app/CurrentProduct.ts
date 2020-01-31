import { Injectable, Directive } from '@angular/core';

'use strict';

export var currentProduct = '';

export function setProduct(val) {
  currentProduct = val;
}

export function getProduct() {
	
	return currentProduct;
}