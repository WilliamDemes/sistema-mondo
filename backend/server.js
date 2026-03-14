const express = require('express');
const cors = require('cors');
// 1. Importamos o comunicador do Prisma
const { PrismaClient } = require('@prisma/client'); 

const app = express();
// 2. Ligamos o comunicador
const prisma = new PrismaClient(); 

app.use(cors());
app.use(express.json());

// 3. Colocamos a palavra "async" aqui, pois conversar com o banco leva um tempinho
app.post('/api/login', async (req, res) => { 
  const { email, senha } = req.body;

  console.log('Tentando cadastrar:', email, senha);

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'E-mail ou senha ausentes.' });
  }

  try {
    // 4. A Mágica do Prisma! Em vez de simular, agora nós SALVAMOS de verdade:
    const novoUsuario = await prisma.usuario.create({
      data: {
        email: email,
        senha: senha // Nota: Em um sistema 100% pronto, nós criptografaríamos essa senha antes!
      }
    });

    console.log('Salvo no banco de dados com sucesso:', novoUsuario);

    return res.json({ 
      sucesso: true, 
      mensagem: 'Membro da equipe cadastrado com sucesso no banco de dados!' 
    });

  } catch (erro) {
    console.error('Erro ao acessar o banco:', erro);
    // Se você tentar cadastrar o mesmo e-mail duas vezes, o Prisma bloqueia e cai neste erro
    return res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao cadastrar. Verifique se o e-mail já existe.' 
    });
  }
});

const PORTA = 5000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORTA}`);
});