
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import workflowRoutes from './routes/workflowRoutes.js';
import { supabase } from './config/supabase.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// app.get('/api/health', async (req, res) => {
//   try {
//     // Perform a simple query to check the database
//     const { data, error } = await supabase
//       .from('workflows') // Replace with any table you have created
//       .select('count', { count: 'exact', head: true });

//     if (error) throw error;

//     res.status(200).json({ status: 'connected', message: 'Supabase is reachable!' });
//   } catch (error: any) {
//     console.error('Supabase connection failed:', error);
//     res.status(500).json({ status: 'error', message: 'Could not connect to Supabase' });
//   }
// });

// app.get("/",(req,res)=>{
//     return res.status(200).send("Hello from server")
// })

// Routes
app.use('/api/workflows', workflowRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));