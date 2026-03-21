import { useState } from 'react';
// Importamos o arquivo CSS na mesma pasta, chamando-o de "styles"
import styles from './Login.module.css'; 
import { Mail, Lock } from 'lucide-react'; // Importando ícones (necessário rodar: npm install lucide-react)

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Mantemos a sua lógica async intacta
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // O fetch vai até o backend na sua URL de produção do Codespaces
      const resposta = await fetch('https://stunning-engine-4jw796g46jqg2jxvw-5000.app.github.dev/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }), // Transforma as variáveis em texto para enviar
      });

      // Recebemos a resposta
      const dados = await resposta.json();

      if (dados.sucesso) {
        alert(dados.mensagem); // Mensagem de sucesso!
        // Aqui você pode redirecionar para o painel de operações depois
      } else {
        alert('Erro: ' + dados.mensagem);
      }

    } catch (erro) {
      console.error('Falha na comunicação:', erro);
      alert('Não foi possível conectar ao servidor do Instituto Mondó.');
    }
  };

  return (
    // Componente principal com classe global do arquivo CSS
    <div className={styles.container}>
      
      {/* Formas geométricas decorativas de fundo (para o visual moderno) */}
      <div className={styles.bg_pattern}>
        <div className={`${styles.bg_shape} ${styles.bg_shape_1}`}></div>
        <div className={`${styles.bg_shape} ${styles.bg_shape_2}`}></div>
        <div className={`${styles.bg_shape} ${styles.bg_shape_3}`}></div>
      </div>

      {/* Card central de login */}
      <div className={styles.card}>
        <div className={styles.logo_container}>
          {/* Logo simulado por divs para o design (depois você troca por <img />) */}
          <div className={styles.geometric_logo}>
            <div style={{ backgroundColor: '#ff9933' }}></div>
            <div style={{ backgroundColor: '#009999' }}></div>
            <div style={{ backgroundColor: '#ff9999' }}></div>
            <div style={{ backgroundColor: '#491b02' }}></div>
            <div style={{ backgroundColor: '#d24a20' }}></div>
            <div style={{ backgroundColor: '#3b722f' }}></div>
            <div style={{ backgroundColor: '#c0272d' }}></div>
            <div style={{ backgroundColor: '#ffffff', opacity: 0.8 }}></div>
          </div>
          <h1 className={styles.title}>INSTITUTO MONDÓ</h1>
          <p className={styles.subtitle}>Acesse o Portal de Operações</p>
        </div>
        
        <form onSubmit={handleLogin} className={styles.form}>
          {/* Grupo do input de e-mail com ícone integrado */}
          <div className={styles.input_group}>
            <Mail className={styles.input_icon} size={20} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="nome@institutomondo.org" // Placeholder moderno
            />
          </div>

          {/* Grupo do input de senha com ícone integrado */}
          <div className={styles.input_group}>
            <Lock className={styles.input_icon} size={20} />
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.input}
              placeholder="Sua senha segura" // Placeholder moderno
            />
          </div>

          <button type="submit" className={styles.button}>
            Entrar no Sistema
          </button>
        </form>

        <div className={styles.footer_links}>
          <a href="#" className={styles.link}>Esqueci minha senha</a>
          <a href="#" className={styles.link}>Criar nova conta</a>
        </div>

        {/* Barra de cores da paleta do Instituto (no rodapé do card) */}
        <div className={styles.color_accent_bar}>
          <div className={styles.color_dot} style={{ backgroundColor: '#ff9933' }}></div>
          <div className={styles.color_dot} style={{ backgroundColor: '#ff9999' }}></div>
          <div className={styles.color_dot} style={{ backgroundColor: '#d24a20' }}></div>
          <div className={styles.color_dot} style={{ backgroundColor: '#3b722f' }}></div>
          <div className={styles.color_dot} style={{ backgroundColor: '#c0272d' }}></div>
        </div>
      </div>
    </div>
  );
}