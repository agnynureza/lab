import express from 'express';

const app = express();
const PORT = 3000;

app.use((req, res, next)=>{
    if(req.ip == '127.0.0.1'){
        return res.status(403).send('You cant make request')
    }
    next();
});
 
app.get('/home', (req, res) => {
  return res.status(200).send('Selamat Datang di Home');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});