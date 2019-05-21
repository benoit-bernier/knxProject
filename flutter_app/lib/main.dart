import 'package:flutter/material.dart';

import 'package:flutter/rendering.dart';
import 'package:socket_io/socket_io.dart';
import 'dart:convert';

void main() {
  runApp(MaterialApp(
      title: 'KNX App',
      theme: new ThemeData(
        primarySwatch: Colors.pink,
      ),
      //color: Colors.pink,
      home: MyApp()));
}

bool isConnected = true;
bool isListening = false;

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool isConnectedToServer = false;
  var socket;
  @override
  void initState() {
    super.initState();
    initialize().then((socket) {
      setState(() {
        this.socket = socket;
        this.isConnectedToServer = isConnectedToServer;
      });
    });
  }

//TODO: get the different status
  Future initialize() async {
    const uri = 'http://192.168.1.113:5000';
    socket = await SocketIO.createNewInstance(uri);
    await socket.on(SocketIOEvent.connecting, () async {
      print('connecting');
    });
    await socket.on(SocketIOEvent.connect, () async {
      print('Connected.');
      final id = await socket.id;

      //TODO: initialize then the buttons etc.
      print('Client SocketID: $id');
    });
    await socket.on(SocketIOEvent.connectError, (error) {
      print('Error: $error');
    });
    await socket.on('sayHello', (greeting) {
      print('Hello, ${greeting['cmd']}');
    });
    await socket.connect();
    isConnectedToServer = true;
    return socket;
  }

  @override
  Widget build(BuildContext context) {
    if (!isConnectedToServer) {
      //TODO: debug waiter
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[CircularProgressIndicator()],
        ),
      );
    } else {
      final _kTabPages = <Widget>[
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              PlayPauseWidget(
                channel: socket,
              ),
              Text(
                'Choisis la durée :',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
              ),
              SliderWidget(
                channel: socket,
              ),
              Text(
                'Sens de défilement',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
              ),
              OrderWidget(
                channel: socket,
              ),
              Text(
                'Autre',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
              ),
              ButtonBar(
                alignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  RaisedButton(
                    onPressed: () {
                      toServer("UP");
                    },
                    color: Colors.pink,
                    child: Text('Accélère'),
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                  ),
                  RaisedButton(
                      onPressed: () {
                        toServer("DOWN");
                      },
                      child: Text('Ralenti'),
                      padding: EdgeInsets.only(left: 10.0, right: 10.0)),
                ],
              ),
            ],
          ),
        ),
        StateLedsWidget(channel: socket),
        Center(child: Builder(
            // Create an inner BuildContext so that the onPressed methods
            // can refer to the Scaffold with Scaffold.of().
            builder: (BuildContext context) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Icon(
                Icons.videogame_asset,
                size: 64.0,
                color: Colors.pink,
              ),
              RaisedButton(
                  onPressed: () {
                    initMastermind();
                    Navigator.of(context)
                        .push(_Mastermind(socket))
                        .then<String>((returnVal) {
                      quitMastermind();
                      Scaffold.of(context).showSnackBar(SnackBar(
                        content: Text('$returnVal'),
                        action: SnackBarAction(label: 'OK', onPressed: () {}),
                      ));
                    });
                  },
                  child: Text("Mastermind"),
                  padding: EdgeInsets.only(left: 10.0, right: 10.0)),
              RaisedButton(
                  onPressed: () {
                    initSimon();
                    Navigator.of(context)
                        .push(_Simon())
                        .then<String>((returnVal) {
                      quitSimon();
                      Scaffold.of(context).showSnackBar(SnackBar(
                        content: Text('$returnVal'),
                        action: SnackBarAction(label: 'OK', onPressed: () {}),
                      ));
                    });
                  },
                  child: Text("Simon"),
                  padding: EdgeInsets.only(left: 10.0, right: 10.0)),
            ],
          );
        })),
        Center(
          child: _IPInput(),
        ),
      ];

      final _kTabs = <Tab>[
        Tab(
          icon: Icon(Icons.home),
          text: "Chenillard",
        ),
        Tab(
          icon: Icon(Icons.lightbulb_outline),
          text: "Ampoules",
        ),
        Tab(
          icon: Icon(Icons.videogame_asset),
          text: "Jeux",
        ),
        Tab(
          icon: Icon(Icons.settings),
          text: "Réglages",
        ),
      ];

      return Builder(
        builder: (ctx) => DefaultTabController(
              length: _kTabs.length,
              child: Scaffold(
                  appBar: AppBar(
                    backgroundColor: Colors.pink,
                    title: Text("Chenillard App"),
                    actions: <Widget>[
                      ConnectionWidget(
                        channel: socket,
                      ),
                    ],
                    bottom: TabBar(tabs: _kTabs),
                  ),
                  body: TabBarView(children: _kTabPages)),
            ),
      );
    }
  }

  toServer(String mStr) async {
    print("Setting speed...");
    await socket.emit("events", [
      {'data': "{\"cmd\":\"" + mStr + "\"}"},
    ]);
  }

  initMastermind() async {
    await socket.emit("mastermind", [
      {'data': "{\"cmd\": \"INIT\"}"},
    ]);
  }

  quitMastermind() async {
    await socket.emit("mastermind", [
      {'data': "{\"cmd\": \"STOP\"}"},
    ]);
  }

  initSimon() async {
    await socket.emit("simon", [
      {'data': "{\"cmd\": \"INIT\"}"},
    ]);
  }

  quitSimon() async {
    await socket.emit("simon", [
      {'data': "{\"cmd\": \"STOP\"}"},
    ]);
  }
}

class ConnectionWidget extends StatefulWidget {
  final channel;

  ConnectionWidget({Key key, @required this.channel}) : super(key: key);
  @override
  _ConnectionWidgetState createState() => _ConnectionWidgetState();
}

class _ConnectionWidgetState extends State<ConnectionWidget> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: EdgeInsets.all(0),
          child: IconButton(
            icon: (isConnected ? Icon(Icons.link) : Icon(Icons.link_off)),
            color: Colors.white,
            onPressed: _toggleConnection,
          ),
        ),
      ],
    );
  }

  void _toggleConnection() {
    print(isConnected);
    setState(() {
      isConnected = !isConnected;
    });
    //TODO: Initialise or kill connexion
    toServer(isConnected ? "CONNECT" : "DISCONNECT");
  }

  toServer(String mStr) async {
    print("Setting speed...");
    await widget.channel.emit("events", [
      {'data': "{\"cmd\":\"" + mStr + "\"}"},
    ]);
  }
}

class SliderWidget extends StatefulWidget {
  final channel;

  SliderWidget({Key key, @required this.channel}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _SliderWidgetState();
}

class _SliderWidgetState extends State<SliderWidget> {
  double _value = 500.0;
  @override
  Widget build(BuildContext context) {
    return Slider(
      activeColor: Colors.pink,
      value: _value,
      min: 0.0,
      max: 5000.0,
      divisions: 10,
      label: '${_value.round() / 1000}',
      onChanged: (double value) {
        setState(() => _value = value);
        //TODO: send _value to server
        toServer("SETSPEED", _value.toString());
      },
    );
  }

  toServer(String mStr, String value) async {
    print("Setting speed...");
    await widget.channel.emit("events", [
      {'data': "{\"cmd\":\"" + mStr + "\",\"data\":\"" + value + "\"}"},
    ]);
  }
}

class OrderWidget extends StatefulWidget {
  final channel;

  OrderWidget({Key key, @required this.channel}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _OrderWidgetState();
}

class _OrderWidgetState extends State<OrderWidget> {
  var _defaultArray = <int>[1, 2, 3, 4];
  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
      Text(
        "$_defaultArray",
        style: TextStyle(fontSize: 24, color: Colors.pink),
      ),
      IconButton(
        onPressed: () {
          setState(() {
            _defaultArray = _defaultArray.reversed.toList();
          });
          //TODO: Send new array to server --verify
          toServer("REVERSE");
          //or send defaultArray.toString() to send the model
        },
        color: Colors.pink,
        icon: Icon(Icons.autorenew),
        tooltip: "Inverser le tableau",
        //padding: EdgeInsets.only(left: 10.0, right: 10.0),
      ),
    ]);
  }

  toServer(String mStr) async {
    print("Reversing...");
    await widget.channel.emit("events", [
      {'data': "{\"cmd\":\"" + mStr + "\"}"},
    ]);
  }
}

class PlayPauseWidget extends StatefulWidget {
  final channel;

  PlayPauseWidget({Key key, @required this.channel}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _PlayPauseWidgetState();
}

class _PlayPauseWidgetState extends State<PlayPauseWidget> {
  bool _isPlaying = false;
  @override
  Widget build(BuildContext context) {
    return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
            "Le chenillard est en route : $_isPlaying",
            style: TextStyle(fontSize: 24, color: Colors.pink),
          ),
          IconButton(
            iconSize: 64.0,
            onPressed: () {
              setState(() {
                _isPlaying = !_isPlaying;
              });
              //TODO: Launch chenillard
              toServer('ONOFF');
              //toServer('sayHello');
            },
            color: Colors.pink,
            icon: Icon(_isPlaying
                ? Icons.pause_circle_filled
                : Icons.play_circle_filled),
          ),
        ]);
  }

  toServer(String mStr) async {
    print("Play pause !");
    await widget.channel.emit("events", [
      //{'cmd': 'world!'},
      {'data': "{\"cmd\":\"" + mStr + "\"}"},
    ]);
  }
}

class _IPInput extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _IPInputState();
}

class _IPInputState extends State<_IPInput> {
  bool _isInputValid = true;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: TextField(
        keyboardType: TextInputType.number,
        style: Theme.of(context).textTheme.display1,
        decoration: InputDecoration(
            labelText: 'Enter IP Address :',
            errorText: _isInputValid ? null : 'Please enter an IP address',
            border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(10.0)))),
        onSubmitted: (String val) {
          Scaffold.of(context).showSnackBar(
            SnackBar(content: Text(val)),
          );
          //TODO change socket for this new ipAddress
        },
        onChanged: (String val) {
          //TODO: verify if val is an IP address
          int.parse(val, onError: (val) {
            setState(() => _isInputValid = false);
          });
        },
      ),
    );
  }
}

class _Mastermind extends MaterialPageRoute<String> {
  final channel;
  _Mastermind(this.channel)
      : super(builder: (BuildContext context) {
          return Scaffold(
              appBar: AppBar(
                title: Text("Mastermind"),
                elevation: 1.0,
                actions: <Widget>[
                  IconButton(
                    icon: Icon(Icons.close),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  )
                ],
              ),
              body: Container(
                  child: MastermindSenderWidget(
                    channel: channel,
                  )));
        });
}

class _Simon extends MaterialPageRoute<String> {
  _Simon()
      : super(builder: (BuildContext context) {
          return Scaffold(
              appBar: AppBar(
                title: Text("Simon"),
                actions: <Widget>[
                  IconButton(
                    icon: Icon(Icons.close),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  )
                ],
              ),
              body: Center(
                  //TODO: Why does it isn't centered???
                  child: Column(children: <Widget>[
                Text("Nous aurons ici notre jeu"),
                ButtonBar(
                  children: <Widget>[
                    IconButton(
                        icon: Icon(Icons.lightbulb_outline), onPressed: null),
                    IconButton(
                        icon: Icon(Icons.lightbulb_outline), onPressed: null),
                    IconButton(
                        icon: Icon(Icons.lightbulb_outline), onPressed: null),
                    IconButton(
                        icon: Icon(Icons.lightbulb_outline), onPressed: null)
                  ],
                ),
                ButtonBar(
                  children: <Widget>[
                    RaisedButton(
                      child: Row(
                        children: <Widget>[
                          Icon(Icons.cancel),
                          Text("Annuler"),
                        ],
                      ),
                      onPressed: () {
                        //Navigator.pop(context, "Gagné !");
                      },
                    ),
                    RaisedButton(
                      child: Row(
                        children: <Widget>[
                          Icon(Icons.send),
                          Text("Envoyer"),
                        ],
                      ),
                      onPressed: () {
                        //Navigator.pop(context, "Gagné !");
                      },
                    ),
                  ],
                )
              ])));
        });
}

class StateLedsWidget extends StatefulWidget {
  final channel;

  StateLedsWidget({Key key, @required this.channel}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _StateLedsWidgetState();
}

class _StateLedsWidgetState extends State<StateLedsWidget> {
  bool _led1 = false;
  bool _led2 = false;
  bool _led3 = false;
  bool _led4 = false;

  @override
  Widget build(BuildContext context) {
    listen();
    return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
              child: Column(
            children: <Widget>[
              Icon(
                _led1 ? Icons.highlight : Icons.lightbulb_outline,
                size: 64.0,
                color: Colors.pink,
              ),
              Icon(
                _led2 ? Icons.highlight : Icons.lightbulb_outline,
                size: 64.0,
                color: Colors.pink,
              ),
              Icon(
                _led3 ? Icons.highlight : Icons.lightbulb_outline,
                size: 64.0,
                color: Colors.pink,
              ),
              Icon(
                _led4 ? Icons.highlight : Icons.lightbulb_outline,
                size: 64.0,
                color: Colors.pink,
              ),
            ],
          )),
        ]);
  }

  listen() async {
    print("listening");
    await widget.channel.on('state_led', (mData) {
      print(mData);
      setState(() {
        if (mData['cmd'] == "state_led_1") {
          _led1 = mData['data'] == 1 ? true : false;
        }
        if (mData['cmd'] == "state_led_2") {
          _led2 = mData['data'] == 1 ? true : false;
        }
        if (mData['cmd'] == "state_led_3") {
          _led3 = mData['data'] == 1 ? true : false;
        }
        if (mData['cmd'] == "state_led_4") {
          _led4 = mData['data'] == 1 ? true : false;
        }
      });
      print("${mData['cmd']}");
      print("${mData['data']}");
    });
  }
}

class MastermindSenderWidget extends StatefulWidget {
  final channel;

  MastermindSenderWidget({Key key, @required this.channel}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _MastermindSenderWidgetState();
}

class _MastermindSenderWidgetState extends State<MastermindSenderWidget> {
  var _myArray = [false, false, false, false];
  var _ServerArray = [];
  var _history = <Widget>[];

  @override
  void initState() {
    // This is the proper place to make the async calls
    // This way they only get called once

    // During development, if you change this code,
    // you will need to do a full restart instead of just a hot reload

    // You can't use async/await here,
    // We can't mark this method as async because of the @override
    listen().then((result) {
      // If we need to rebuild the widget with the resulting data,
      // make sure to use `setState`
      print("Result : " + result.toString());
      setState(() {
        _ServerArray = result;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    //listen();
    return Column(
      children: <Widget>[
        ListView(children: _history,),
        Row(
          children: <Widget>[
            IconButton(
                icon: Icon(
                    _myArray[0] ? Icons.highlight : Icons.lightbulb_outline),
                onPressed: () {
                  setState(() {
                    _myArray[0] = !_myArray[0];
                  });
                }),
            IconButton(
                icon: Icon(
                    _myArray[1] ? Icons.highlight : Icons.lightbulb_outline),
                onPressed: () {
                  setState(() {
                    _myArray[1] = !_myArray[1];
                  });
                }),
            IconButton(
                icon: Icon(
                    _myArray[2] ? Icons.highlight : Icons.lightbulb_outline),
                onPressed: () {
                  setState(() {
                    _myArray[2] = !_myArray[2];
                  });
                }),
            IconButton(
                icon: Icon(
                    _myArray[3] ? Icons.highlight : Icons.lightbulb_outline),
                onPressed: () {
                  setState(() {
                    _myArray[3] = !_myArray[3];
                  });
                }),
            ButtonBar(children: <Widget>[
              IconButton(
                icon: Icon(Icons.autorenew),
                onPressed: () {
                  setState(() {
                    _myArray = [false, false, false, false];
                  });
                },
              ),
              IconButton(
                icon: Icon(Icons.send),
                onPressed: () {
                  print("Server Array :" + _ServerArray.toString());
                  print("My Array : " + _myArray.toString());
                  if ((_ServerArray != null) && (_myArray == _ServerArray)) {
                    toServerWithData("VERIFIY", _myArray);
                  } else {
                    setState(() {
                      _history.add(ListTile(title: Text(_myArray.toString()),));
                    });
                    Scaffold.of(context).showSnackBar(SnackBar(
                      content: Text('FAUX'),
                      action: SnackBarAction(label: 'OK', onPressed: () {}),
                    ));
                  }
                },
              )
            ])
          ],
        ),
      ],
    );
  }

  toServer(String mStr) async {
    print("Sending to Server");
    await widget.channel.emit("mastermind", [
      //{'cmd': 'world!'},
      {'data': "{\"cmd\":\"" + mStr + "\"}"},
    ]);
  }

  toServerWithData(String mStr, mArr) async {
    print("Sending to Server");
    await widget.channel.emit("mastermind", [
      //{'cmd': 'world!'},
      {'data': "{\"cmd\":\"" + mStr + "\", \"data\":" + mArr.toString() + "}"},
    ]);
  }

  Future<List<bool>> listen() async {
    print("listening mastermind");
    await widget.channel.on('mastermind', (mData) {
      print(mData);
      if (mData['cmd'] == "init_mastermind") {
        print("J'y suis !!!");
        var _temp = [];
        mData['data']
            .toString()
            .replaceAll('[', '')
            .replaceAll(']', '')
            .split(', ')
            .forEach((element) =>
                (element == "true") ? _temp.add(true) : _temp.add(false));
        print("temp : " + _temp.toString());
        //return _temp;
      }
      if (mData['cmd'] == "default_message") {
        print(mData['data']);
      }
    });
  }
}
