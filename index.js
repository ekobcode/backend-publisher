import express from "express";
import cors from "cors";
const app = express();
import amqp from 'amqplib/callback_api.js';
import 'dotenv/config'

app.use(cors());
app.use(express.json());

app.post('/publisher', (req, res) => {
    try {
    amqp.connect(process.env.RABBITMQ_ACCESS, function(err0, conn) {
        if (err0) {
            throw err0;
        }

        conn.createChannel(function(err1, channel) {
            if (err1) {
                throw err1;
            }

            var ex = "exchange";
            var msg = req.body.data

            channel.publish(ex,"", Buffer.from(msg));
        });
    });
    res.status(200).json({
        "message": "Data Terkirim"
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
})

app.post('/publisher2', (req, res) => {
    try {
    amqp.connect(process.env.RABBITMQ_ACCESS, function(err0, conn) {
        if (err0) {
            throw err0;
        }

        conn.createChannel(function(err1, channel) {
            if (err1) {
                throw err1;
            }

            var ex = "tdw";
            var msg = [];
            var data = req.body.data
            console.log(data)
            while(msg.length < data){
                var r = Math.floor(Math.random() * 100) + 1;
                if(msg.indexOf(r) === -1) msg.push(r);
                var message = 'data-'+r
                channel.publish(ex,"", Buffer.from(JSON.stringify(message)));
            }  
        });
    });
    res.status(200).json({
        "message": "Data Terkirim"
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
})



app.listen(process.env.PORT, () => console.log('Server running at port'+process.env.PORT));