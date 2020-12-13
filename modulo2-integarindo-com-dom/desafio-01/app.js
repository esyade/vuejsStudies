new Vue({
    el:"#desafio",
    data:{
        SEU_NOME: "Erick Cardoso Syade",
        IDADE:31,
        imagem: "https://img.olx.com.br/images/43/435042093785131.jpg",
        valorInicial: "Erick Cardoso Syade"
    },
    methods:{
        minhaIdadeMultiplicadaPorTres: function(){
            return (this.IDADE * 3)
        },
        numeroRandomico: function(){
            return Math.random();
        }
    }
});