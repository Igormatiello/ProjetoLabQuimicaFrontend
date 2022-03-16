export class PessoaInstituicao   {
    creditoVigente: 0;
    ehAtivo: true;
    ehProfessor: true;
    id: 0;
    instituicao: {
        cidade: {
            id: 0;
            nome: string;
            uf: string
        };
        id: 0;
        nome: string;
        tipoInstituicao: string;
    };
    pessoa: {
        bairro: string,
        celular: string,
        cep: string,
        cidade: {
            id: 0,
            nome: string,
            uf: string
        },
        complemento: string,
        dataCriacao: string,
        documento: string,
        ehAtivo: true,
        email: string,
        endereco: string,
        id: 0,
        inscricaoEstadual: string,
        nome: string,
        numero: string,
        telefone: string,
        tipoPessoa: "Fisica"
    }
}
