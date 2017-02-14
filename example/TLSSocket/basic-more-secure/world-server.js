const ipc=require('../../../node-ipc');

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'world';
ipc.config.retry= 1500;
ipc.config.tls={
    public: __dirname+'/../../../local-node-ipc-certs/server.pub',
    private: __dirname+'/../../../local-node-ipc-certs/private/server.key',
    dhparam: __dirname+'/../../../local-node-ipc-certs/private/dhparam.pem',
    requestCert: true,
    rejectUnauthorized:false,
    trustedConnections: [
        __dirname+'/../../../local-node-ipc-certs/client.pub'
    ]
};

ipc.serveNet(
    function(){
        ipc.server.on(
            'message',
            function(data,socket){
                ipc.log('got a message from ', socket.id, data);
                ipc.server.emit(
                    socket,
                    'message',
                    data+' world!'
                );
            }
        );

        ipc.server.on(
            'socket.disconnected',
            function(socket,id){
                ipc.log('DISCONNECTED from ',id,'\n\n');
            }
        );
    }
);

ipc.server.on(
    'error',
    function(err){
        ipc.log('Got an ERROR!',err);
    }
);

ipc.server.start();
