const jogo = new Vue({
    el: "#jogo",
    data: {
        start: false,
        superHeroi: {
            nome: "Destruidor de Monstros",
            forcaRegeneracao: 25,
            energia: 100,
            ataque: {
                forca: 10,
                posicaoInicial: 30,
                alcance: 72,
                larguraInicial: 1,
                larguraIntermediaria: 60,
                larguraFinal: 80,
                alturaInicial: 1,
                alturaIntermediaria: 60,
                alturaFinal: 80,
                corInicial: 'yellow',
                corFinal: '#00af00',
                sombraInicial: 50,
                sombraFinal: 60,
                camada: 1,
                velocidade: 0.2
            }
        },
        ataqueSuperHeroi: {
            forca: 0,
            posicao: 30,
            largura: 0,
            altura: 0,
            cor: 'none',
            sombra: 50,
            camada: 0,
            tempoTransicao: 0.2
        },
        monstro: {
            nome: "Monstro",
            forcaRegeneracao: 15,
            energia: 100,
            ataque: {
                forca: 20,
                posicaoInicial: 65,
                alcance: 22,
                larguraInicial: 1,
                larguraIntermediaria: 90,
                larguraFinal: 110,
                alturaInicial: 1,
                alturaIntermediaria: 90,
                alturaFinal: 110,
                corInicial: 'brown',
                corFinal: '#00af00',
                sombraInicial: 50,
                sombraFinal: 60,
                camada: 1,
                velocidade: 0.2
            }
        },
        ataqueMonstro: {
            forca: 0,
            posicao: 65,
            largura: 0,
            altura: 0,
            cor: 'none',
            sombra: 50,
            camada: 0,
            tempoTransicao: 0.2
        },
        posicaoAtaquePersonagens: 1,
        tempoPadraoAnimacao: 200,
        acoesPersonagens:
        {
            acoesSuperHeroi: [],
            acoesMonstro: []
        }
    },
    watch: {
        posicaoAtaquePersonagens(n, v) {
            if (this.ataqueSuperHeroi.posicao == this.superHeroi.ataque.alcance) {
                setTimeout(() => {
                    this.ataqueSuperHeroi.posicao = this.superHeroi.ataque.posicaoInicial;
                    this.ataqueSuperHeroi.largura = this.superHeroi.ataque.larguraInicial;
                    this.ataqueSuperHeroi.altura = this.superHeroi.ataque.alturaInicial;
                    this.ataqueSuperHeroi.cor = this.superHeroi.ataque.corFinal;
                    this.ataqueSuperHeroi.sombra = this.superHeroi.ataque.sombraFinal * 0;
                    this.ataqueSuperHeroi.tempoTransicao = (this.superHeroi.ataque.velocidade - this.superHeroi.ataque.velocidade);
                    this.ataqueMonstro.posicao = this.monstro.ataque.posicaoInicial;
                    this.ataqueMonstro.largura = this.monstro.ataque.larguraInicial;
                    this.ataqueMonstro.altura = this.monstro.ataque.alturaInicial;
                    this.ataqueMonstro.cor = this.monstro.ataque.corFinal;;
                    this.ataqueMonstro.sombra = this.monstro.ataque.sombraFinal * 0;
                    this.ataqueMonstro.tempoTransicao = (this.superHeroi.ataque.velocidade - this.superHeroi.ataque.velocidade)
                }, this.tempoPadraoAnimacao)
            }
        }
    },
    computed: {
        estiloAtaqueSuperHeroi() {
            return this.buildStyleAtaque(this.ataqueSuperHeroi);
        },
        estiloAtaqueMonstro() {
            return this.buildStyleAtaque(this.ataqueMonstro);
        },
        estiloBarraEnergiaSuperHeroi() {
            return {
                width: this.superHeroi.energia + "%",
                backgroundColor: this.superHeroi.energia > 20 ? 'green' : 'red',
                height: "40px",
                textAlign: 'center',
                color: "white",
                textMargin: "5px",
                transition: "width 0.3s",
                transitionDelay: "0.1s"

            }
        },
        estiloBarraEnergiaMonstro() {
            return {
                width: this.monstro.energia + "%",
                backgroundColor: this.monstro.energia > 20 ? 'green' : 'red',
                height: "40px",
                textAlign: 'center',
                color: "white",
                textMargin: "5px",
                transition: "width 0.3s",
                transitionDelay: "0.1s"

            }
        },
        resultadoJogo(){
            let resultado = "Destruidor de Monstros" ;
            
            if(this.monstro.energia <= 0 && this.superHeroi.energia > 0){
                resultado = "VOCÊ GANHOU";
                this.start = false;
                this.reset();

            }
            else if (this.superHeroi.energia == 0 && this.monstro.energia == 0) {
                resultado = "O JOGO EMPATOU";
                this.start = false;
                this.reset();
            }
            else if (this.superHeroi.energia == 0 && this.monstro.energia > 0) {
                resultado = "VOCÊ PERDEU";
                this.start = false;
                this.reset();
            }
            else if(this.superHeroi.energia == -1){
                resultado = "VOCÊ SE RENDEU";
                this.start = false;
                this.reset();
            }
            return resultado ;
        }
    },
    methods: {
        buildStyleAtaque(ataquePersonagem) {
            return {
                width: ataquePersonagem.largura + "px",
                height: ataquePersonagem.altura + "px",
                backgroundColor: ataquePersonagem.cor,
                bottom: '40px',
                marginLeft: ataquePersonagem.posicao + "%",
                borderRadius: "75px 75px 75px 75px",
                boxShadow: this.selecionaSombraPersonagem(ataquePersonagem),
                transition: ataquePersonagem.tempoTransicao + "s",
                zIndex: ataquePersonagem.camada
            }
        },
        selecionaSombraPersonagem(ataquePersonagem) {
            if (ataquePersonagem.posicao == this.ataqueMonstro.posicao) {
                return `${ataquePersonagem.cor} ${-ataquePersonagem.sombra}px 0px ${ataquePersonagem.sombra * 0.5}px ${ataquePersonagem.sombra}px`
            } else {
                return `${ataquePersonagem.cor} ${ataquePersonagem.sombra}px 0px ${ataquePersonagem.sombra}px ${ataquePersonagem.sombra}px`
            }
        },
        diminuirConteudoBarraEnergia(personagem, valor) {
            if (personagem.energia >= valor) {
                    personagem.energia -= valor;
            }
            else {
                this.zeraBarraEnergia(personagem);
            }
        },
        zeraBarraEnergia(personagem) {
            setTimeout(() => {
                personagem.energia = 0;
            }, this.tempoPadraoAnimacao);
        },
        aumentarConteudoBarraEnergia(personagem, valor) {
            if (personagem.energia < 100) {
                if (personagem.energia + valor < 100) {
                        personagem.energia += valor;
                } else {
                    personagem.energia += 100 % personagem.energia;
                }
            } else {
                personagem.energia = 100;
            }
        },
        atacar() {
            this.adicionaraAcaoUmPersonagem(this.superHeroi, `O ${this.superHeroi.nome} atacou com uma força de ${this.superHeroi.ataque.forca}`);
            this.adicionaraAcaoUmPersonagem(this.monstro, `O ${this.monstro.nome} atacou com uma força de ${this.monstro.ataque.forca}`);
            this.avancarAtaque(this.ataqueSuperHeroi, this.superHeroi);
            this.avancarAtaque(this.ataqueMonstro, this.monstro);
            this.diminuirConteudoBarraEnergia(this.superHeroi, this.monstro.ataque.forca);
            this.diminuirConteudoBarraEnergia(this.monstro, this.superHeroi.ataque.forca);
        },
        regenerar() {
            this.adicionaraAcaoUmPersonagem(this.superHeroi, `O ${this.superHeroi.nome} regenerou com uma força de ${this.superHeroi.forcaRegeneracao}`);
            this.aumentarConteudoBarraEnergia(this.superHeroi, this.superHeroi.forcaRegeneracao);
            this.adicionaraAcaoUmPersonagem(this.monstro, `O ${this.monstro.nome} regenerou com uma força de ${this.monstro.forcaRegeneracao}`);
            this.aumentarConteudoBarraEnergia(this.monstro, this.monstro.forcaRegeneracao);
        },
        superAtacar() {
            this.adicionaraAcaoUmPersonagem(this.superHeroi, `O ${this.superHeroi.nome} deu um super ataque com uma força de ${this.superHeroi.ataque.forca}`);
            this.adicionaraAcaoUmPersonagem(this.monstro, `O ${this.monstro.nome} deu um super ataque com uma força de ${this.monstro.ataque.forca}`);
            this.avancarAtaque(this.ataqueSuperHeroi, this.superHeroi);
            this.avancarAtaque(this.ataqueMonstro, this.monstro);
            this.diminuirConteudoBarraEnergia(this.superHeroi, this.monstro.ataque.forca * 1.3);
            this.diminuirConteudoBarraEnergia(this.monstro, this.superHeroi.ataque.forca * 2);
        },
        adicionaraAcaoUmPersonagem(personagem, msg) {
            if (personagem.nome == this.superHeroi.nome) {
                this.acoesPersonagens.acoesSuperHeroi.unshift(msg);
            } else {
                this.acoesPersonagens.acoesMonstro.unshift(msg);
            }
        },
        avancarAtaque(ataque, personagem) {
            ataque.posicao = personagem.ataque.posicaoInicial;
            ataque.largura = personagem.ataque.larguraIntermediaria;
            ataque.altura = personagem.ataque.alturaIntermediaria;
            ataque.cor = personagem.ataque.corInicial;
            ataque.sombra = personagem.ataque.sombraInicial;
            ataque.camada = personagem.ataque.camada;
            ataque.tempoTransicao = personagem.ataque.velocidade;
            this.posicaoAtaquePersonagens = 2;
            setTimeout(() => {
                ataque.posicao = personagem.ataque.alcance;
                ataque.largura = personagem.ataque.larguraFinal;
                ataque.altura = personagem.ataque.alturaFinal;
                ataque.sombra = personagem.ataque.sombraFinal;
                this.posicaoAtaquePersonagens = 3;
            }, this.tempoPadraoAnimacao);
        },
        reset() {
            this.monstro.energia = 100;
            this.superHeroi.energia = 100;
            this.acoesPersonagens.acoesSuperHeroi = [];
            this.acoesPersonagens.acoesMonstro = [];
        },
        seRender(){
            this.superHeroi.energia = -1
        }
    }
});