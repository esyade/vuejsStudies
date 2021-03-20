new Vue({
	el: '#desafio',
	data: {
		classeEfeito: "",
		aplicaSombra:"sombra",
		aplicaBorda:"borda",
		classeUsuario: "",
		opcaoUsuario:"desativar",
		objetoQuadrado: false,
		widthPorcentagem: 0,

	},
	computed:{
		aplicaClasses(){
			console.log(this.opcaoUsuario)
			return this.opcaoUsuario == "ativar" ? this.classeUsuario: this.aplicaSombra
		},
		estilos(){
				return {
					objetoRedondo: !this.objetoQuadrado,
					estiloQuadrado: this.objetoQuadrado
			}
		},
		estiloBarraProgresso(){
			return {
				width: this.widthPorcentagem+"px",
				height: "20px",
				backgroundColor: "#c20000"
			}
		}
	},
	watch:{
		widthPorcentagem(novo,antigo){
			if(this.widthPorcentagem == 100){
				this.widthPorcentagem = 0;
			}
		}
	},
	methods: {
		iniciarEfeito() {
			setInterval(()=>{
					this.classeEfeito = "encolher";
			}, 3000);
			this.classeEfeito = "destaque";
		},
		iniciarProgresso() {
			setInterval(()=>{
				console.log(this)
				this.widthPorcentagem++;
				console.log(this.widthPorcentagem);
			}, 100);
		}
	}
})
