import { useState } from 'react';
// 1. Importamos o arquivo CSS que acabamos de criar, chamando-o de "styles"
import styles from './Login.module.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Colocamos o "async" aqui porque a comunicação com o servidor leva alguns milissegundos
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // O fetch vai até o backend na porta 5000 e entrega os dados no formato JSON
      const resposta = await fetch('https://stunning-engine-4jw796g46jqg2jxvw-5000.app.github.dev/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }), // Transforma as variáveis em texto para enviar
      });

      // Aqui recebemos a resposta que o Node.js nos enviou de volta
      const dados = await resposta.json();

      if (dados.sucesso) {
        alert(dados.mensagem); // Mostra a mensagem de sucesso vinda do servidor!
      } else {
        alert('Erro: ' + dados.mensagem);
      }

    } catch (erro) {
      console.error('Falha na comunicação:', erro);
      alert('Não foi possível conectar ao servidor do Instituto Mondó.');
    }
  };

  return (
    // 2. Usamos className={styles.nomeDaClasse} em vez de style={{...}}
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Instituto Mondó</h1>
        <h2 className={styles.subtitle}>Acesso ao Sistema</h2>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <label className={styles.label}>E-mail da Equipe:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="nome@institutomondo.org"
          />

          <label className={styles.label}>Senha:</label>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            placeholder="Sua senha segura"
          />

          <button type="submit" className={styles.button}>
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}