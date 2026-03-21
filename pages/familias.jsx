import { useState, useEffect } from 'react';
// 1. Importando o CSS Module e os ícones
import styles from './Familias.module.css'; 
import { User, FileText, Phone, MapPin } from 'lucide-react'; 

export default function Familias() {
  // Mantemos todo o seu estado e lógica exatamente como você forneceu
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  
  const [listaFamilias, setListaFamilias] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Mantemos a URL do Backend intacta
  const URL_BACKEND = 'https://stunning-engine-4jw796g46jqg2jxvw-5000.app.github.dev/api/familias';

  const carregarFamilias = async () => {
    try {
      const resposta = await fetch(URL_BACKEND);
      const dados = await resposta.json();
      
      if (Array.isArray(dados)) {
        setListaFamilias(dados);
      } else {
        console.error('O servidor não mandou uma lista! Ele mandou:', dados);
        setListaFamilias([]);
      }
    } catch (erro) {
      console.error('Erro ao buscar famílias:', erro);
      setListaFamilias([]);
    }
  };

  useEffect(() => {
    carregarFamilias();
  }, []);

  const salvarFamilia = async (evento) => {
    evento.preventDefault();
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
        setNomeResponsavel('');
        setCpf('');
        setTelefone('');
        setEndereco('');
        carregarFamilias(); 
      } else {
        setMensagem('Erro: ' + dados.mensagem);
      }
    } catch (erro) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    // 2. Usando className={styles.container} em vez de inline styles
    <div className={styles.container}>
      <div className={styles.bg_pattern}>
        <div className={`${styles.bg_shape} ${styles.bg_shape_1}`}></div>
        <div className={`${styles.bg_shape} ${styles.bg_shape_2}`}></div>
        <div className={`${styles.bg_shape} ${styles.bg_shape_3}`}></div>
      </div>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestão de Famílias - Instituto Mondó</h1>
      </div>
      
      {/* FORMULÁRIO DE CADASTRO (Novo layout Card) */}
      <div className={styles.form_card}>
        <h2 className={styles.card_subtitle}>Cadastrar Nova Família</h2>
        <form onSubmit={salvarFamilia} className={styles.form}>
          
          {/* Grupo de input moderno: Ícone + Placeholder claro */}
          <div className={styles.input_group}>
            <User className={styles.input_icon} size={20} />
            <input 
              type="text" placeholder="Nome Completo do Responsável" required
              value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)}
              className={styles.input_field}
            />
          </div>

          <div className={styles.input_group}>
            <FileText className={styles.input_icon} size={20} />
            <input 
              type="text" placeholder="CPF (opcional)" 
              value={cpf} onChange={(e) => setCpf(e.target.value)}
              className={styles.input_field}
            />
          </div>

          <div className={styles.input_group}>
            <Phone className={styles.input_icon} size={20} />
            <input 
              type="text" placeholder="Telefone de Contato" 
              value={telefone} onChange={(e) => setTelefone(e.target.value)}
              className={styles.input_field}
            />
          </div>

          <div className={styles.input_group}>
            <MapPin className={styles.input_icon} size={20} />
            <input 
              type="text" placeholder="Endereço Completo (Rua, Nº, Bairro, Cidade-UF)" 
              value={endereco} onChange={(e) => setEndereco(e.target.value)}
              className={styles.input_field}
            />
          </div>

          <button type="submit" className={styles.primary_button}>
            Salvar Família
          </button>
        </form>
        {mensagem && <p className={styles.status_mensagem}>{mensagem}</p>}
      </div>

      {/* LISTA DE FAMÍLIAS CADASTRADAS */}
      <div className={styles.list_section}>
        <h2 className={styles.section_subtitle}>Famílias Atendidas ({listaFamilias.length})</h2>
        {listaFamilias.length === 0 ? (
          <p className={styles.no_data_text}>Nenhuma família cadastrada ainda.</p>
        ) : (
          <div className={styles.list_grid}>
            {listaFamilias.map((familia) => (
              <div key={familia.id} className={styles.family_card}>
                <strong className={styles.family_name}>{familia.nomeResponsavel}</strong><br/>
                <small className={styles.family_details}>CPF: {familia.cpf || 'Não informado'} | Tel: {familia.telefone || 'Não informado'}</small><br/>
                <small className={styles.family_address}>Endereço: {familia.endereco || 'Não informado'}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}