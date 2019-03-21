// This sample shows adding an action to an [AppBar] that opens a shopping cart.

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Code Sample for material.AppBar.actions',
      theme: ThemeData(
        primarySwatch: Colors.pink,
      ),
      home: MyStatelessWidget(),
    );
  }
}

class MyStatelessWidget extends StatelessWidget {
  MyStatelessWidget({Key key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    /*
    final showSnack = () => FlutterToast.showToast(
      msg:"Bouton cliqué",
      toastLength:Toast.LENGTH_SHORT
    );
    */

    return Scaffold(
      appBar: AppBar(
        title: Text('Hello World'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.file_download),
            tooltip: 'Open shopping cart',
            onPressed: () {
              // ...
            },
          ),
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
    );
  }
}
