module.exports.jogo = function(application, req, res){
 
    if(req.session.autorizado !== true){
        res.send('Usuário precisa realizar o login');
        return;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, usuario, casa);

}

module.exports.sair = function(application, req, res){

    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });
}