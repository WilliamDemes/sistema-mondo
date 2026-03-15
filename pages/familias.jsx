import { useState, useEffect } from 'react';

export default function Familias() {
  // 1. Onde guardamos o que o usuário digita
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  
  // 2. Onde guardamos a lista de famílias que vem do banco de dados
  const [listaFamilias, setListaFamilias] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // ATENÇÃO: Cole aqui a mesma URL que você usou na tela de Login!
  // Vai ser algo como 'https://stunning-engine-...-5000.app.github.dev/api/familias'
  const URL_BACKEND = 'https://stunning-engine-4jw796g46jqg2jxvw-5000.app.github.dev/api/familias';

  // 3. Função para buscar as famílias na despensa logo que a tela abre
  const carregarFamilias = async () => {
    try {
      const resposta = await fetch(URL_BACKEND);
      const dados = await resposta.json();
      
      // BLINDAGEM: Verifica se 'dados' é realmente uma lista antes de salvar
      if (Array.isArray(dados)) {
        setListaFamilias(dados);
      } else {
        console.error('O servidor não mandou uma lista! Ele mandou:', dados);
        setListaFamilias([]); // Garante que continue sendo uma lista vazia
      }
    } catch (erro) {
      console.error('Erro ao buscar famílias:', erro);
      setListaFamilias([]); // Se der erro de internet, mantém a lista vazia
    }
  };

  // O useEffect faz a função carregarFamilias rodar sozinha ao abrir a página
  useEffect(() => {
    carregarFamilias();
  }, []);

  // 4. Função para enviar o formulário para o Gerente (Backend)
  const salvarFamilia = async (evento) => {
    evento.preventDefault(); // Impede a página de recarregar
    setMensagem('Salvando...');

    try {
      const resposta = await fetch(URL_BACKEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeResponsavel, cpf, telefone, endereco })
      });

      const dados = await resposta.json();
      
      if (dados.sucesso) {
        setMensagem('Família cadastrada com sucesso!');
        // Limpa os campos
        setNomeResponsavel('');
        setCpf('');
        setTelefone('');
        setEndereco('');
        // Atualiza a lista na tela automaticamente!
        carregarFamilias(); 
      } else {
        setMensagem('Erro: ' + dados.mensagem);
      }
    } catch (erro) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Gestão de Famílias - Instituto Mondó</h1>
      
      {/* FORMULÁRIO DE CADASTRO */}
      <div style={{ background: '#f0f4f8', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2>Cadastrar Nova Família</h2>
        <form onSubmit={salvarFamilia} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="Nome do Responsável" required
            value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input 
            type="text" placeholder="CPF (opcional)" 
            value={cpf} onChange={(e) => setCpf(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input 
            type="text" placeholder="Telefone" 
            value={telefone} onChange={(e) => setTelefone(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input 
            type="text" placeholder="Endereço" 
            value={endereco} onChange={(e) => setEndereco(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px', background: '#0056b3', color: 'white', border: 'none', cursor: 'pointer' }}>
            Salvar Família
          </button>
        </form>
        {mensagem && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensagem}</p>}
      </div>

      {/* LISTA DE FAMÍLIAS CADASTRADAS */}
      <div>
        <h2>Famílias Atendidas ({listaFamilias.length})</h2>
        {listaFamilias.length === 0 ? (
          <p>Nenhuma família cadastrada ainda.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {listaFamilias.map((familia) => (
              <li key={familia.id} style={{ background: '#fff', border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                <strong>{familia.nomeResponsavel}</strong><br/>
                <small>CPF: {familia.cpf || 'Não informado'} | Tel: {familia.telefone || 'Não informado'}</small><br/>
                <small>Endereço: {familia.endereco || 'Não informado'}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}