import { useState, useEffect } from 'react';

export default function Acoes() {
  // 1. Onde guardamos os dados da nova Ação
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataDaAcao, setDataDaAcao] = useState('');
  
  // 2. Onde guardamos a lista que vem do banco
  const [listaAcoes, setListaAcoes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // ATENÇÃO: Cole a URL do seu backend aqui (terminando com /api/acoes)
  const URL_BACKEND = 'https://stunning-engine-4jw796g46jqg2jxvw-5000.app.github.dev/api/acoes';

  // 3. Função para buscar as ações na despensa
  const carregarAcoes = async () => {
    try {
      const resposta = await fetch(URL_BACKEND);
      const dados = await resposta.json();
      
      if (Array.isArray(dados)) {
        setListaAcoes(dados);
      } else {
        console.error('O servidor não mandou uma lista!', dados);
        setListaAcoes([]);
      }
    } catch (erro) {
      console.error('Erro ao buscar ações:', erro);
      setListaAcoes([]);
    }
  };

  useEffect(() => {
    carregarAcoes();
  }, []);

  // 4. Função para enviar a nova ação
  const salvarAcao = async (evento) => {
    evento.preventDefault();
    setMensagem('Salvando...');

    try {
      const resposta = await fetch(URL_BACKEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao, dataDaAcao })
      });

      const dados = await resposta.json();
      
      if (dados.sucesso) {
        setMensagem('Ação cadastrada com sucesso!');
        setNome('');
        setDescricao('');
        setDataDaAcao('');
        carregarAcoes(); // Atualiza a lista na hora
      } else {
        setMensagem('Erro: ' + dados.mensagem);
      }
    } catch (erro) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Gestão de Ações - Instituto Mondó</h1>
      
      {/* FORMULÁRIO DE CADASTRO */}
      <div style={{ background: '#eef2f5', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2>Cadastrar Nova Ação/Atividade</h2>
        <form onSubmit={salvarAcao} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="Nome da Ação (Ex: Oficina de Leitura)" required
            value={nome} onChange={(e) => setNome(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <textarea 
            placeholder="Descrição da atividade..." 
            value={descricao} onChange={(e) => setDescricao(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', minHeight: '80px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>Data da Ação:</label>
            <input 
              type="date" required
              value={dataDaAcao} onChange={(e) => setDataDaAcao(e.target.value)}
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            Salvar Ação
          </button>
        </form>
        {mensagem && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '15px' }}>{mensagem}</p>}
      </div>

      {/* LISTA DE AÇÕES */}
      <div>
        <h2>Ações Cadastradas ({listaAcoes.length})</h2>
        {listaAcoes.length === 0 ? (
          <p>Nenhuma ação cadastrada ainda.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {listaAcoes.map((acao) => {
              // Formatando a data para o padrão brasileiro visualmente
              const dataFormatada = acao.dataDaAcao ? new Date(acao.dataDaAcao).toLocaleDateString('pt-BR') : 'Não informada';
              
              return (
                <li key={acao.id} style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px', borderLeft: '5px solid #28a745' }}>
                  <strong style={{ fontSize: '18px' }}>{acao.nome}</strong><br/>
                  <small style={{ color: '#666' }}>Data: {dataFormatada}</small>
                  <p style={{ marginTop: '8px', marginBottom: 0 }}>{acao.descricao || 'Sem descrição.'}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}