if(process.env.NODE_ENV === 'production'){
    console.log("prod 실행");
    module.exports = require('./prod');
}else{
    console.log("dev 실행");
    module.exports = require('./dev');
}