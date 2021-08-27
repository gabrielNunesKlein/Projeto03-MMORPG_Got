module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){

    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'casa não pode ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
        return;
    }

    var connection = application.config.dbConnection;
    var usuarioDAO = new application.app.models.UsuariosDAO(connection);
    usuarioDAO.inserirUsuario(dadosForm);

    res.send('pode cadastrar');
}