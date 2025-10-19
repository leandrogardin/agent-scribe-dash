# Guia para Criar a API Backend

A Dashboard agora está configurada para consumir dados de uma API REST. Você precisa criar uma API backend que exponha os seguintes endpoints:

## Configuração

1. **URL da API**: Adicione a URL da sua API nas Configurações do sistema, ou ela usará `http://localhost:3000` por padrão.

## Endpoints Necessários

### 1. GET /api/metrics
Retorna as métricas agregadas do dashboard.

**Query Parameters:**
- `period`: string - "today" | "7days" | "30days"

**Response:**
```json
{
  "clientsServed": 42,
  "totalMessages": 286,
  "openTickets": 8
}
```

### 2. GET /api/clients
Retorna a lista de clientes com suas interações.

**Query Parameters:**
- `period`: string - "today" | "7days" | "30days"

**Response:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "messages": 15,
    "status": "aberto",
    "lastInteraction": "2025-10-17 14:30"
  },
  {
    "id": 2,
    "name": "Maria Santos",
    "messages": 23,
    "status": "fechado",
    "lastInteraction": "2025-10-17 13:45"
  }
]
```

## Exemplo de Implementação (Node.js/Express)

```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do PostgreSQL
const pool = new Pool({
  host: 'seu_host',
  port: 5432,
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco'
});

// Endpoint de métricas
app.get('/api/metrics', async (req, res) => {
  const { period } = req.query;
  
  try {
    // Ajuste a query conforme sua estrutura de banco
    const dateFilter = period === 'today' ? "DATE(data_coluna) = CURRENT_DATE" :
                       period === '7days' ? "data_coluna >= CURRENT_DATE - INTERVAL '7 days'" :
                       "data_coluna >= CURRENT_DATE - INTERVAL '30 days'";
    
    const metricsQuery = `
      SELECT 
        COUNT(DISTINCT cliente_coluna) as clientsServed,
        COUNT(*) as totalMessages,
        COUNT(*) FILTER (WHERE status_coluna = 'aberto') as openTickets
      FROM sua_tabela
      WHERE ${dateFilter}
    `;
    
    const result = await pool.query(metricsQuery);
    res.json({
      clientsServed: parseInt(result.rows[0].clientsserved),
      totalMessages: parseInt(result.rows[0].totalmessages),
      openTickets: parseInt(result.rows[0].opentickets)
    });
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    res.status(500).json({ error: 'Erro ao buscar métricas' });
  }
});

// Endpoint de clientes
app.get('/api/clients', async (req, res) => {
  const { period } = req.query;
  
  try {
    const dateFilter = period === 'today' ? "DATE(data_coluna) = CURRENT_DATE" :
                       period === '7days' ? "data_coluna >= CURRENT_DATE - INTERVAL '7 days'" :
                       "data_coluna >= CURRENT_DATE - INTERVAL '30 days'";
    
    const clientsQuery = `
      SELECT 
        ROW_NUMBER() OVER (ORDER BY MAX(data_coluna) DESC) as id,
        cliente_coluna as name,
        COUNT(*) as messages,
        CASE 
          WHEN COUNT(*) FILTER (WHERE status_coluna = 'aberto') > 0 THEN 'aberto'
          ELSE 'fechado'
        END as status,
        TO_CHAR(MAX(data_coluna), 'YYYY-MM-DD HH24:MI') as lastInteraction
      FROM sua_tabela
      WHERE ${dateFilter}
      GROUP BY cliente_coluna
      ORDER BY MAX(data_coluna) DESC
    `;
    
    const result = await pool.query(clientsQuery);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
```

## Próximos Passos

1. Crie o arquivo da API backend (Node.js, Python, etc.)
2. Instale as dependências necessárias
3. Configure as credenciais do banco de dados
4. Ajuste as queries SQL conforme os nomes das suas colunas
5. Rode a API: `node server.js`
6. Configure a URL da API nas Configurações do sistema
7. Teste os endpoints no navegador ou Postman

## Segurança

- Adicione validação de entrada
- Implemente rate limiting
- Use variáveis de ambiente para credenciais
- Configure CORS apropriadamente para produção
- Adicione autenticação/autorização se necessário
