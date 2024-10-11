// Definindo a classe "Carro"
class Carro {
	// O construtor é chamado quando um objeto da classe é criado
	constructor(marca, modelo, ano) {
		this.marca = marca; // Propriedade pública da classe
		this.modelo = modelo; // Propriedade pública da classe
		this.ano = ano; // Propriedade pública da classe
		this._quilometragem = 0; // Propriedade privada (convenção, não é realmente privada)
	}

	// Método público (está disponível para qualquer instância da classe)
	dirigir(distancia) {
		this._quilometragem += distancia;
		console.log(`${this.modelo} dirigiu ${distancia} km.`);
	}

	// Método para exibir as informações do carro
	exibirInfo() {
		console.log(`Carro: ${this.marca} ${this.modelo}, Ano: ${this.ano}`);
	}

	// Getter para acessar a quilometragem (propriedade "privada")
	get quilometragem() {
		return this._quilometragem;
	}

	// Setter para alterar a quilometragem, com validação
	set quilometragem(valor) {
		if (valor >= 0) {
			this._quilometragem = valor;
		} else {
			console.log("Quilometragem inválida.");
		}
	}

	// Método estático (não depende de uma instância da classe, pertence à classe)
	static compararCarros(carro1, carro2) {
		if (carro1.ano > carro2.ano) {
			console.log(`${carro1.modelo} é mais novo que ${carro2.modelo}.`);
		} else if (carro1.ano < carro2.ano) {
			console.log(`${carro1.modelo} é mais velho que ${carro2.modelo}.`);
		} else {
			console.log(`${carro1.modelo} e ${carro2.modelo} têm o mesmo ano.`);
		}
	}
}

// Criando instâncias (objetos) da classe "Carro"
const carro1 = new Carro("Toyota", "Corolla", 2019);
const carro2 = new Carro("Honda", "Civic", 2020);

// Usando métodos públicos
carro1.exibirInfo();
carro1.dirigir(50);
console.log(`Quilometragem do carro 1: ${carro1.quilometragem} km`);

// Usando método estático
Carro.compararCarros(carro1, carro2);

// Alterando a quilometragem usando o setter
carro1.quilometragem = 100;
console.log(`Nova quilometragem do carro 1: ${carro1.quilometragem} km`);
