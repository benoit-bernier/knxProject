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
            Text('Deliver features faster',
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

class _ReorderableList extends StatefulWidget{
  @override
  State<StatefulWidget> createState(){
    return __ReorderableListState();
  }
}
class _ListItem{
  _ListItem(this.value, this.checked);
  final int value;
  bool checked;
}

class __ReorderableListState extends State<_ReorderableList>{
  bool _reverseSort = false;
  static final _items = <int>[1,2,3,4].map((item) => _ListItem(item, false)).toList();

  void _onReorder (int oldIndex, int newIndex){
    setState((){
      if (newIndex>oldIndex){
        newIndex--;
      }
      final _ListItem item = _items.removeAt(oldIndex);
      _items.insert(newIndex, item);
    });
  }

  void _onSort(){
    setState(() {
      _reverseSort = !_reverseSort;
      _items.sort((_ListItem a, _ListItem b) => _reverseSort
          ? b.value.compareTo(a.value)
          : a.value.compareTo(b.value));
    });
  }

  @override
  Widget build(BuildContext context) {
    final _listTiles = _items
        .map((item) => CheckboxListTile(
      key:Key(item.value.toString()),
      value:item.checked ?? false,
      onChanged: (bool newValue) {
        setState(() => item.checked = newValue);
        },
      title:Text("Ampoule numéro ${item.value}"),
      isThreeLine: true,
      subtitle: Text("Item ${item.value}, checked=${item.checked}"),
      secondary: Icon(Icons.drag_handle),
    )
    //TODO: resolve problem on ReordeableListView
    );
    return ReordeableListView(
      onReorder: _onReorder,
      children: _listTiles,
    );
  }

  Widget ReordeableListView({void Function(int oldIndex, int newIndex) onReorder, Iterable<CheckboxListTile> children}) {}
}