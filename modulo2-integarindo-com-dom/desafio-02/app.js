new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods:{
        exibeAlerta(){
            alert("O alerta de evento disparado");
        },
        escutandoKeyDown(event){
            return this.valor = event.target.value ;
        }
    }
})