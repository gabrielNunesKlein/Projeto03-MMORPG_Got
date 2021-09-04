var crypto = require('crypto');

function UsuarioDAO(connection){
    this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){

            var senha_crypto = crypto.createHash("md5").update(usuario.senha).digest("hex");
            usuario.senha = senha_crypto;

            collection.insert(usuario);

            mongoclient.close();
        });
    });
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            var senha_crypto = crypto.createHash("md5").update(usuario.senha).digest("hex");
            usuario.senha = senha_crypto;
            
            collection.find(usuario).toArray(function(err, result){
                console.log(result[0]);
                
                if(result[0] != undefined){
                    req.session.autorizado = true;

                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if(req.session.autorizado){
                    res.redirect("Jogo");
                } else{
                    res.render("index", {validacao: {}, dadosForm: usuario, msg: {msg: "usuário/senha inválidos"}});
                }
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsuarioDAO;
}