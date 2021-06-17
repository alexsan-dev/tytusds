class Nodo{
    constructor(data, next){
        this.data = data;
        this.next = next;
    }
}
class listaSimple{
    constructor(){
        this.head = null;
        this.size = 0;
    }
    
    add(data){
    const newNodo = new Nodo(data, null);
    if(this.head){        
        let current = this.head;
        while(current.next){
        current = current.next;
        }
        current.next = newNodo;
    }else{
        this.head = newNodo
    }
    this.size++
    }
delete(data){
    let aux = this.head
    let aux2
    if(data==aux.data){this.head=aux.next 
        return}
    while(aux != null){
        aux2=aux.next;
        console.log(aux.data+"  "+aux2.data)
        if(aux2.data==data){  
        aux2=aux2.next
        aux.next=aux2
        this.size--
        break
    }   
    else{
        aux=aux.next}
    }
}
refresh(dataActual,dataFinal){
    let aux = this.head
    while (aux.next != null) {
        if (aux.data==dataActual) {
        aux.data=dataFinal
        return
        }
        aux=aux.next
    }
    }

search(data){
    let aux = this.head
    while (aux.next != null) {
        if (aux.data==data) {
        return true
        }   
        aux=aux.next
    }return false
    }

cargar(){}

guardar(){}

print(){
    var valores = []
        let aux = this.head;
        while (aux != null) {
            valores.push(aux.data);
            aux = aux.next;
        }
        return valores;
    }
}

const listSimple = new listaSimple();



function lsimpleAdd(date){
listSimple.add(date);
return listSimple.print()
}

function lsimpleDelete(date){
listSimple.delete(date);
}
function lsimpleRefresh(date1,date2){
listSimple.refresh(date1,date2); 
}
function lsimpleSearch(date){
return listSimple.search(date); 
}
function lsimpleCargar(date){
listSimple.cargar();
}
function lsimpleGuardar(date){
listSimple.guardar();
}
function lsimplePrint(){return print()}