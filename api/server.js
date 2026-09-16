const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3000;

// Configuración de la conexión a PostgreSQL con variables de entorno
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST, // Nombre del servicio en docker-compose
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10),
});

// Función para inicializar la tabla users de forma automática
async function initDatabase(retries = 5, delay = 3000) {
  while (retries > 0) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL
        );
      `);
      console.log('✅ Base de datos inicializada: tabla "users" lista.');
      return;
    } catch (error) {
      retries -= 1;
      console.error(`⚠️ Error al conectar con PostgreSQL (${error.message}). Reintentos restantes: ${retries}`);
      if (retries === 0) {
        console.error('❌ No se pudo conectar a la base de datos tras múltiples intentos.');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// 4. Endpoint GET /health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

// 5. Endpoint GET /users - Consultar usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ error: 'Error interno al consultar usuarios' });
  }
});

// 6. Endpoint POST /users - Crear usuario
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Campos name y email son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar usuario:', error.message);
    res.status(500).json({ error: 'Error interno al guardar usuario' });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 API corriendo exitosamente en el puerto ${PORT}`);
  await initDatabase();
});
