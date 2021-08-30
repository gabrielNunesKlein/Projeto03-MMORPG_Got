module.exports.index = function(application, req, res){
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){

    var dadosForm = req.body;
    
    req.assert("usuario", "Usuário não pode ficar em branco").notEmpty();
    req.assert("senha", "Nome não pode ficar em branco").notEmpty();
    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao: erros});
        return;
    }

    var connection = application.config.dbConnection;
    var usuarioDAO = new application.app.models.UsuariosDAO(connection);

    usuarioDAO.autenticar(dadosForm, req, res);

    //res.send("tudo ok para criar sessão");
}