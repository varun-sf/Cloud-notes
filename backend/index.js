const connectTomongo = require('./db');
var express = require('express')
var cors = require('cors')
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const app = express()

app.use(cors())
connectTomongo();
const port = 5000

app.use(express.json())
app.use('/api/auth',authRouter )
app.use('/api/notes',notesRouter )
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('*',(req,res)=>{
  res.status(404).json({
      message: `${req.originalUrl}- Route not found`,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
