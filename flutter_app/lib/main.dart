import 'package:flutter/material.dart';

import 'package:flutter/rendering.dart';
import 'package:socket_io/socket_io.dart';

void main() {
  runApp(MyApp());
}

bool isConnected = true;
bool isListening = false;

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  var socket;
  @override
  void initState() {
    super.initState();
    initialize().then((socket) {
      setState(() {
        this.socket = socket;
      });
    });
  }

  Future initialize() async {
    const uri = 'http://10.0.2.2:3000';
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
      print('Hello, ${greeting['Hello']}');
    });
    await socket.connect();
    await socket.emit('sayHello', [
      {'Hello': 'world!'},
    ]);
    return socket;
  }

  @override
  Widget build(BuildContext context) {
    if (socket == null) {
      return MaterialApp(
          title: 'Flutter layout demo',
          theme: new ThemeData(
            primarySwatch: Colors.pink,
          ),
          //color: Colors.pink,
          home: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[CircularProgressIndicator()],
            ),
          ));
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
                    onPressed: () {},
                    color: Colors.pink,
                    child: Text('Accélère'),
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                  ),
                  RaisedButton(
                      onPressed: () {},
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
                    Navigator.of(context).push(_Mastermind())
                        .then<String>((returnVal){
                      Scaffold.of(context).showSnackBar(
                          SnackBar(
                            content: Text('$returnVal'),
                            action: SnackBarAction(
                                label: 'OK',
                                onPressed: (){}),
                          ));
                    });
                  },
                  child: Text("Mastermind"),
                  padding: EdgeInsets.only(left: 10.0, right: 10.0)),
              RaisedButton(
                  onPressed: () {},
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

      return MaterialApp(
        title: 'Flutter layout demo',
        theme: new ThemeData(
          primarySwatch: Colors.pink,
        ),
        //color: Colors.pink,
        home: Builder(
          builder: (context) => DefaultTabController(
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
        )

      );
    }
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
    widget.channel.sink.add(isConnected ? "Connect" : "Disconnect");
    //TODO: Initialise or kill connexion
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
        widget.channel.sink.add(_value.toString());
        //TODO: send _value to server
      },
    );
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
          //TODO: Send new array to server
          widget.channel.sink.add(_defaultArray.toString());
        },
        color: Colors.pink,
        icon: Icon(Icons.autorenew),
        tooltip: "Inverser le tableau",
        //padding: EdgeInsets.only(left: 10.0, right: 10.0),
      ),
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
              toServer('sayHello');
            },
            color: Colors.pink,
            icon: Icon(_isPlaying
                ? Icons.play_circle_filled
                : Icons.pause_circle_filled),
          ),
        ]);
  }

  toServer(String mStr) async {
    print("Hello dear !");
    await widget.channel.emit(mStr, [
      {'Hello': 'world!'},
    ]);
  }
}

class  _Mastermind extends MaterialPageRoute<String> {
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
                      onPressed: (){
                        Navigator.pop(context, "Gagné !");
                      },
                    )
                  ])));
        });
}
