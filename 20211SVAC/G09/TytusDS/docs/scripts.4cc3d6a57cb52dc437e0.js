class Nodo{constructor(o){this.dato=o,this.siguiente=null,this.anterior=null}}class Lista{constructor(){this.primero=null,this.ultimo=null,this.size=0}add(o){let t=new Nodo(o);null==this.primero?(this.primero=t,this.ultimo=this.primero,this.size++):(this.ultimo.siguiente=t,t.anterior=this.ultimo,this.ultimo=t,this.size++)}print(){console.log("Entro al print");var o=[];let t=this.primero;for(;null!=t;)o.push(t.dato),console.log("Dato:",t.dato),t=t.siguiente;return console.log("Paso por el while"),o}}function f1(){console.log("Algo por favor funciona we"),console.log("Prueba no.2")}module.exports=Lista,module.exports=Nodo;