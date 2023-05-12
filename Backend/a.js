const axios=require('axios')
const http=require('http')


http.createServer(function (req,res) {//it will use to create server. and res ,req will send the req and recive the response.
    axios.post('',{
        "name":"jenil",
        "email":"example",
        "password":"78578"
      }).then(function (res) {
        console.log(res);
      })
      res.end()
}).listen(2020)//it will running on 2020 port.