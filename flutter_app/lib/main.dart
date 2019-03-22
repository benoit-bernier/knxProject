import 'package:flutter/material.dart';
// Uncomment lines 7 and 10 to view the visual layout at runtime.
// import 'package:flutter/rendering.dart' show debugPaintSizeEnabled;
import 'package:flutter/rendering.dart';

void main() {
  //debugPaintSizeEnabled = true;
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Color color = Theme.of(context).primaryColor;

    return MaterialApp(
      title: 'Flutter layout demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text("Chenillard App"),
          actions: <Widget>[
            FavoriteWidget(),
          ],
        ),
        body: Center(child:
        Column(
          children: <Widget>[
            Text('Deliver features faster'),
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
                    padding: EdgeInsets.only(left: 10.0, right: 10.0)
                ),
              ],
            ),

            Text('Craft beautiful UIs'),
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
                    padding: EdgeInsets.only(left: 10.0, right: 10.0)
                ),
              ],
            ),
          ],
        ),
        ),
        ),
      );
  }
}

class FavoriteWidget extends StatefulWidget{
  @override
  _FavoriteWidgetState createState() => _FavoriteWidgetState();
}

class _FavoriteWidgetState extends State<FavoriteWidget>{
  bool _isConnected = true;
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: EdgeInsets.all(0),
          child: IconButton(
            icon: (_isConnected ? Icon(Icons.file_upload) : Icon(Icons.file_download)),
            color: Colors.red[500],
            onPressed: _toggleFavorite,
          ),
        ),
      ],
    );
  }

  void _toggleFavorite() {
    setState(() {
      if (_isConnected) {
        _isConnected = false;
      } else {
        _isConnected = true;
      }
    });
  }
}
