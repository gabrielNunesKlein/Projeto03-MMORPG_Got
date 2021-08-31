module.exports.jogo = function(application, req, res){
 
    if(req.session.autorizado !== true){
        res.send('Usuário precisa realizar o login');
        return;
    }

    var comando_invalido = 'N';
    if(req.query.comando_invalido == 'S'){
        comando_invalido = 'S';
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);

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
    
    res.render("pergaminhos");
}

module.exports.order_acao_suditos = function(application, req, res){
    var dadosForm = req.body;

    req.assert("acao", "A ação deve ser informada").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada").notEmpty();
    var erros = req.validationErrors();

    console.log(erros);
    if(erros){
        res.redirect('jogo?comando_invalido=S');
        return;
    }

    console.log(dadosForm);
    res.send("Tudo Ok");
}