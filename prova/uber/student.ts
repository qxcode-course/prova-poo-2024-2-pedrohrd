function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa {
    private nome: string;
    private dinheiro: number;

    public constructor(nome: string, dinheiro: number){
        this.nome = nome;
        this.dinheiro = dinheiro;
    }

    public getNome(): string {
        return this.nome;
    }

    public getDinheiro(): number {
        return this.dinheiro;
    }

    public setNome(valor: string): void {
        this.nome = valor;
    }

    public setDinheiro(valor: number): void {
        this.dinheiro += valor;
        if (valor == 0){
            this.dinheiro = 0;
        }
    }
}

class Moto {
    private custo: number;
    private motorista: null | Pessoa;
    private passageiro: null | Pessoa;

    public constructor(){
        this.custo = 0;
        this.motorista = null;
        this.passageiro = null;
    }

    public addMotorista(pessoa: Pessoa): void {
        this.motorista = pessoa;
    }

    public addPassageiro(pessoa: Pessoa): void {
        this.passageiro = pessoa;
    }

    public rodar(valor: number): void{
        this.custo += valor;
    }

    public descerPassageiro(): void {
        this.passageiro?.setDinheiro(- this.custo);

        this.motorista?.setDinheiro(this.custo);

        if (this.passageiro?.getDinheiro() < this.custo){
            console.log("fail: Passenger does not have enough money");
            this.passageiro?.setDinheiro(0);
        }

        this.custo = 0;
        
        console.log(`${this.passageiro?.getNome()}:${this.passageiro?.getDinheiro()} leave`);

        this.passageiro = null;
    }

    public toString(): string {
        let saida = "";
        saida += `Cost: ${this.custo}, `;
        if (this.motorista == null){
            saida += `Driver: None, `;
        } else {
            saida += `Driver: ${this.motorista.getNome()}:${this.motorista.getDinheiro()}, `;
        }
        if (this.passageiro == null){
            saida += `Passenger: None`;
        } else {
            saida += `Passenger: ${this.passageiro.getNome()}:${this.passageiro.getDinheiro()}`;
        }
        return saida;
    }
}

class Adapter {
    motoca: Moto = new Moto();

    setDriver(name: string, money: number): void {
        this.motoca.addMotorista(new Pessoa(name, money));
    }

    setPassenger(name: string, money: number): void {
        this.motoca.addPassageiro(new Pessoa(name, money));
    }

    drive(distance: number): void {
        this.motoca.rodar(distance);
    }

    leavePassenger(): void {
        this.motoca.descerPassageiro();
    }

    show(): void {
        console.log(this.motoca.toString());
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
