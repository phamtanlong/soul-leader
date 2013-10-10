﻿
var NODE_CLIENT = null;

//Init a new SocketClient
//parent: MainGame reference
function NodeJSClient(parent) {

    //reference to MainGame
    this.parent = parent;


    //connect socket
    this.socket = null;

    //username of this user
    this.username = 'user' + Math.floor(Math.random() * 1000);

    /*
        {
            username: username,
            password: password,
            gender: gender,
            coin: coin
        }
    */
    this.user = null;


    /*
        {
            matchId: matchId,
            mapId: mapId,
            turn: turn,
            players: [
                {
                    username: username0,
                    gender: gender0,
                    coin: coin0
                },
                {
                    username: username1,
                    gender: gender1,
                    coin: coin1
                }
            ],
            status: [
                {
                    position: position0,
                    direction: direction0
                    angle: angle0
                },{
                    position: position1,
                    direction: direction1,
                    angle: angle1           
                }
            ]
        }
    */
    this.match = null;

    /*
        {
            position: position0,
            direction: direction0
            angle: angle0
        }
    */
    this.matchStatus = null;


    //a callback function will be call when connection successful
    this.connectSuccessHandler = null;

    //-------------------------- PUBLIC FUNCTIONS -----------------------------

    //Add a handler to handle an event
    //eventName: string, Ex: 'SendData'
    //handler: function, receive data, with 1 argument as a object, Ex: handler(data)
    this.AddHandler = function (eventName, handler) {
        this.socket.on(eventName, handler);
    };


    //Send a object to server
    //eventName: string, name of event, Ex: 'Fire'
    //data: object, contain data you want to send to server
    this.SendData = function (eventName, data) {
        this.socket.emit(eventName, data);
    };



    //Các hàm gửi dữ liệu ---------------------------------
    //send data functions -------------------------------------------------------



    //Log in at after connect successful
    this.UserOnline = function () {
        this.socket.emit('UserOnline', {
            username: this.username
        });
    }

    //Get user's infomation
    this.GetUser = function () {
        this.socket.emit('GetUser', {
            username: this.username
        });
    }

    //Get list of all online user
    this.GetAllUserOnline = function () {
        this.socket.emit('GetAllUserOnline', {});
    }

    //Get the leaderboard, order by coin
    this.GetLeaderBoard = function () {
        this.socket.emit('GetLeaderBoard', {});
    }

    //Create a random match
    this.CreateRandomMatch = function () {
        this.socket.emit('CreateRandomMatch', {
            username: this.username
        });
    }

    //When player move, rotate, ...
    this.ChangeStatus = function () {
        //random position change
        this.matchStatus.position.x += Math.floor(Math.random() * 5);

        //send
        this.socket.emit('ChangeStatus', {
            matchId: this.match.matchId,
            username: this.username,
            status: this.matchStatus
        });
    }

    //Called when player fire
    this.Fire = function (data) {
        var data = {
            matchId: this.match.matchId,
            username: this.username,
            data: data
        }

        this.socket.emit('Fire', data);
    }

    //Called when player lose turn
    this.ChangeTurn = function () {
        var data = {
            matchId: this.match.matchId,
            username: this.username //old_username
        };

        this.socket.emit('ChangeTurn', data);
    }

    //Called when player 
    this.SendMatchResult = function () {
        var data = {
            matchId: this.match.matchId,
            win: this.username
        };

        this.socket.emit('SendMatchResult', data);
    }


    //Init and receive data ----------------------------------------------------


    //Connect to NodeJS server, before call Init
    //ip: string, default = 127.0.0.1
    //port: integer, default = 5000
    this.Connect = function (ip, port) {
        if (ip == undefined) ip = '127.0.0.1';
        if (port == undefined) port = 5000;

        var strConnect = ip + ':' + port;
        this.socket = io.connect(strConnect);

        this.Init();
    }


    //Các hàm nhận dữ liệu ------------------
    //handle receive data event


    //Khi game chạy lên, nó sẽ gọi connect ở trên
    //Sau khi connect thành công, thì sever gửi 1 message về, và hàm này nhận được nó
    //Say hello from server
    this._connect_success = function (data) {
        Log(data);

        //Log in
        NODE_CLIENT.UserOnline();
    }



    /*
        {
            username: username,
            password: password,
            gender: gender,
            coin: coin
        }
    */
    //UserOnline
    this._user_online = function (data) {
        Log(data);
        NODE_CLIENT.user = data;

        if (NODE_CLIENT.connectSuccessHandler != null) {
            NODE_CLIENT.connectSuccessHandler();
        }
    }



    //GetUser
    this._get_user = function (data) {
        Log(data);
    }




    //GetAllUserOnline
    this._get_all_user_online = function (data) {
        Log(data);
    }



    //GetLeaderBoard
    this._get_leaderboard = function (data) {
        Log(data);
    }




    /*
        {
            matchId: matchId,
            mapId: mapId,
            turn: turn,
            players: [
                {
                    username: username0,
                    gender: gender0,
                    coin: coin0
                },
                {
                    username: username1,
                    gender: gender1,
                    coin: coin1
                }
            ],
            status: [
                {
                    position: position0,
                    direction: direction0
                    angle: angle0
                },{
                    position: position1,
                    direction: direction1,
                    angle: angle1           
                }
            ]
        }
    */
    this._create_random_match = function (data) {
        Log(data);

        NODE_CLIENT.match = data;

        if (NODE_CLIENT.match.players[0].username == NODE_CLIENT.username) {
            NODE_CLIENT.matchStatus = NODE_CLIENT.match.status[0];
        } else {
            NODE_CLIENT.matchStatus = NODE_CLIENT.match.status[1];
        }

        //check your turn
        if (NODE_CLIENT.username == data.players[data.turn].username) {
            NODE_CLIENT.parent.m_eTurn = 0; //you first
        } else {
            NODE_CLIENT.parent.m_eTurn = 1; //other first
        }
    }




    /*
        {
            matchId: matchId,
            username: username,
            status: {
                position: new_position,
                direction: new_direction,
                angle: new_angle
            }
        }
    */
    this._change_status = function (data) {
        Log(data);
    }




    /*
        {
            matchId: matchId,
            username: username,
            data: data
        }
    */
    this._fire = function (data) {
        Log(data);

        NODE_CLIENT.parent.computerFire(data.data);
    }




    /*
        {
            matchId: matchId,
            username: new_username
        }
    */
    this._change_turn = function (data) {
        Log(data);
        if (data.username == NODE_CLIENT.username) {
            alert('This is my turn');
        }
    }




    /*
        {
            matchId: matchId,
            win: win_username
            coinForWin: coinForWin //thưởng cho user win
        }
    */
    this._send_match_result = function (data) {
        Log(data);

        if (data.win == NODE_CLIENT.username) { //you win
            alert('You win :D\n' + 'WinCoin: ' + data.winCoin);
        } else { //you lose
            alert('You lose :(');
        }
    }


    //Init all default handler
    //After call Connect
    this.Init = function () {

        //tự động gửi về từ server
        this.socket.on('ConnectSuccess', this._connect_success);

        this.socket.on('GetUser', this._get_user);
        this.socket.on('UserOnline', this._user_online);
        this.socket.on('GetAllUserOnline', this._get_all_user_online);
        this.socket.on('GetLeaderBoard', this._get_leaderboard);
        this.socket.on('CreateRandomMatch', this._create_random_match);
        this.socket.on('ChangeStatus', this._change_status);
        this.socket.on('Fire', this._fire);
        this.socket.on('ChangeTurn', this._change_turn);
        this.socket.on('SendMatchResult', this._send_match_result);
    }

    NODE_CLIENT = this;
};

