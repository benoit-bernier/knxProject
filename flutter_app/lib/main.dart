import 'package:flutter/material.dart';

import 'package:flutter/rendering.dart';
import 'package:socket_io/socket_io.dart';

void main() {
  runApp(MaterialApp(
      title: 'Flutter layout demo',
      theme: new ThemeData(
        primarySwatch: Colors.pink,
      ),
      //color: Colors.pink,
      home: MyApp()
  )
  );
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
        this.isConnectedToServer=isConnectedToServer;
      });
    });
  }

  Future initialize() async {
    const uri = 'http://10.0.2.2:3000';
    socket = await SocketIO.createNewInstance(uri);
    /*
    await socket.on(SocketIOEvent.connecting, () async {
      print('connecting');
    });
    */
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
    isConnectedToServer=true;
    return socket;
  }

  @override
  Widget build(BuildContext context) {
    if (!isConnectedToServer) {
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
        Center(
          child: Icon(
            Icons.lightbulb_outline,
            size: 64.0,
            color: Colors.pink,
          ),
        ),
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Icon(
                Icons.videogame_asset,
                size: 64.0,
                color: Colors.pink,
              ),
              RaisedButton(
                  onPressed: () {
                    Navigator.of(context)
                        .push(_Mastermind())
                        .then<String>((returnVal) {
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
                      Navigator.of(context)
                          .push(_Simon())
                          .then<String>((returnVal) {
                        Scaffold.of(context).showSnackBar(SnackBar(
                          content: Text('$returnVal'),
                          action: SnackBarAction(label: 'OK', onPressed: () {}),
                        ));
                      });
                  },
                  child: Text("Simon"),
                  padding: EdgeInsets.only(left: 10.0, right: 10.0)),
            ],
          ),
        ),
        Center(
          child: Icon(
            Icons.settings,
            size: 64.0,
            color: Colors.pink,
          ),
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
      {'data': "{\"cmd\":\""+mStr+"\"}"},
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
      {'data': "{\"cmd\":\""+mStr+"\"}"},
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
      {'data': "{\"cmd\":\""+mStr+"\",\"data\":\""+value+"\"}"},
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
      {'data': "{\"cmd\":\""+mStr+"\"}"},
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
      {'data': "{\"cmd\":\""+mStr+"\"}"},
    ]);
  }
}

class _Mastermind extends MaterialPageRoute<String> {
  _Mastermind()
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
              body: Padding(
                  padding: EdgeInsets.all(32.0),
                  child: Column(children: <Widget>[
                    Text("Nous aurons ici notre jeu"),
                    RaisedButton(
                      child: Text("Jeu gagné"),
                      onPressed: () {
                        Navigator.pop(context, "Gagné !");
                      },
                    )
                  ])));
        });
}

class _Simon extends MaterialPageRoute<String> {
  _Simon()
      : super(builder: (BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Simon"),
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
        body: Padding(
            padding: EdgeInsets.all(32.0),
            child: Column(children: <Widget>[
              Text("Nous aurons ici notre jeu"),
              RaisedButton(
                child: Text("Jeu gagné"),
                onPressed: () {
                  Navigator.pop(context, "Gagné !");
                },
              )
            ])));
  });
}