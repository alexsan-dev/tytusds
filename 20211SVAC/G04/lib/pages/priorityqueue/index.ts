class NodoSimpleQ{

    public valor: any

    public siguiente: any

    public anterior: any

    public priority:number

    constructor(valor:any,priority:number){
        
        this.priority = priority
        
        this.valor = valor

        this.siguiente = null

        this.anterior = null
    }
}

class Queue{

    private raiz: any

    private tamaño: number

    public nodoActual: any



    constructor(){

        this.raiz = null

        this.tamaño = 0 

        this.nodoActual = null
    }

    //Validar si la cola esta vacia
    
    vacia(){

        if (this.raiz == null){

            return true
        }

    }

    //Encolar caracter con prioridad

    encolar(valor:any,priority:any){

        let aux = new NodoSimpleQ(valor,priority)


        if (this.raiz.priority > priority){

            aux.siguiente = this.raiz

            this.raiz = aux

            this.tamaño++
        }
        else{

            while(this.raiz.siguiente != null && this.raiz.siguiente.priority < priority){
                
                this.raiz = this.raiz.siguiente
            }

            aux.siguiente = this.raiz.siguiente

            this.raiz.siguiente = aux;

            this.tamaño++

        }

        return this.raiz
    }






}