function UsuarioDAO(connection){
    this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);

            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsuarioDAO;
}