import 'package:flutter/material.dart';
// Uncomment lines 7 and 10 to view the visual layout at runtime.
// import 'package:flutter/rendering.dart' show debugPaintSizeEnabled;
import 'package:flutter/rendering.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';

void main() {
  runApp(MyApp());
}

bool isConnected = true;

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //Color color = Theme.of(context).primaryColor;
    var channel = IOWebSocketChannel.connect('ws://echo.websocket.org');
    channel.sink.add('Hello!');

    final _kTabPages = <Widget>[
      Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            PlayPauseWidget(channel :channel,),
            Text(
              'Choisis la durée :',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            SliderWidget(channel: channel,),
            Text(
              'Sens de défilement',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            OrderWidget(channel: channel,),
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
            // ignore: unnecessary_brace_in_string_interps
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
        child: Icon(
          Icons.videogame_asset,
          size: 64.0,
          color: Colors.pink,
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
      home: DefaultTabController(
        length: _kTabs.length,
        child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.pink,
              title: Text("Chenillard App"),
              actions: <Widget>[
                ConnectionWidget(),
              ],
              bottom: TabBar(tabs: _kTabs),
            ),
            body: TabBarView(children: _kTabPages)),
      ),
    );
  }
}

class ConnectionWidget extends StatefulWidget {
  final WebSocketChannel channel;

  ConnectionWidget({Key key, @required this.channel})
      : super(key: key);
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
    widget.channel.sink.add(isConnected?"Connect":"Disconnect");
    //TODO: Initialiser ou tuer la connexion
  }
}

class SliderWidget extends StatefulWidget {
  final WebSocketChannel channel;

  SliderWidget({Key key, @required this.channel})
      : super(key: key);
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
  final WebSocketChannel channel;

  OrderWidget({Key key, @required this.channel})
      : super(key: key);
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
  final WebSocketChannel channel;

  PlayPauseWidget({Key key, @required this.channel})
      : super(key: key);
  @override
  State<StatefulWidget> createState() => _PlayPauseWidgetState();
}

class _PlayPauseWidgetState extends State<PlayPauseWidget> {
  bool _isPlaying = false;
  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
      StreamBuilder(
        stream: widget.channel.stream,
        builder: (context, snapshot) {
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 24.0),
            child: Text(snapshot.hasData ? '${snapshot.data}' : ''),
          );
        },
      ),
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
          widget.channel.sink.add(_isPlaying?"Play":"Pause");
        },
        color: Colors.pink,
        icon: Icon(_isPlaying?Icons.play_circle_filled:Icons.pause_circle_filled),
      ),
    ]);
  }
}

