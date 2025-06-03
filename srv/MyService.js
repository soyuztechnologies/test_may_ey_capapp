module.exports = (srv) => {

    //implementation
    srv.on('hello', (req, res) => {
        return 'Hey Amigo ' + req.data.name;
    });
    
}