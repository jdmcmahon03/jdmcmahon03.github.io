const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

// PostgreSQL database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(cors());

// Route to get grade data
app.get('/api/grades', async (req, res) => {
  try {
    const query = `
      SELECT 
        s.first_name,
        s.last_name,
        SUM(a.grade) AS total_grade
      FROM students s
      JOIN assignments a ON s.student_id = a.student_id
      GROUP BY s.student_id, s.first_name, s.last_name
      ORDER BY s.last_name, s.first_name;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying grades:', err);
    res.status(500).json({ error: 'Failed to retrieve grades' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
