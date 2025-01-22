import express from 'express';
const app = express();
// 서버 포트와 IP 설정
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
app.get('/', (req, res) => {
    res.send('Typescript + Node.js + Express Server');
});
app.listen(app.get('port'), app.get('host'), () => console.log('Server is running on: ' + app.get('host') + ':' + app.get('port')));
