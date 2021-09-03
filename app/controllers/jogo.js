module.exports.jogo = function(application, req, res){
 
    if(req.session.autorizado !== true){
        res.send('Usuário precisa realizar o login');
        return;
    }

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, usuario, casa, msg);

}

module.exports.sair = function(application, req, res){

    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });
}

module.exports.suditos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário precisa realizar o login');
        return;
    }

    res.render("aldeoes");
}

module.exports.pergaminhos = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário precisa realizar o login');
        return;
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    var usuario = req.session.usuario;

    jogoDAO.getAcoes(usuario, res);
    
}

module.exports.order_acao_suditos = function(application, req, res){
    var dadosForm = req.body;

    req.assert("acao", "A ação deve ser informada").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada").notEmpty();
    var erros = req.validationErrors();

    console.log(erros);
    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    jogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = function(application, req, res){
    var url_query = req.query;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    var _id = url_query.id_acao;
    
    jogoDAO.removerAcao(_id, res);
}